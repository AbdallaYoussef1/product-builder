import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

interface Iprops {
  error?: boolean;
  errorMessage?: string;
  selected: ICategory;
  setSelected: (category: ICategory) => void;
}

const Menu = ({ error, errorMessage, selected, setSelected, ...rest }: Iprops) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(category => category.id === selectedCategoryId);
    if (selectedCategory) {
      setSelected(selectedCategory);
    }
  };

  return (
    <>
      <Select
        {...rest}
        style={{
          width: '100%',
          borderRadius: '8px',
          border: error ? '1px solid red' : '1px solid #ccc',
        }}
        error={error}
        value={selected.id} // Set the value of the selected category
        onChange={handleChange} // Handle the change event
      >
        {/* Render menu items for each category */}
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>
      {/* Render error message if error */}
      {error && errorMessage && <span style={{ color: 'red', marginTop: '5px', display: 'block' }}>{errorMessage}</span>}
    </>
  );
}
export default Menu;
