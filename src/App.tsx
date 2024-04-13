import { Button, Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import ProductCard from "./Components/ProductCard"
import { categories, formInputsList, productList } from "./data"
import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react"
import Input from "./Components/ui/input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./Components/ErrorMessage";
import Menu from "./Components/ui/menu";
import CreateProductModal from "./Components/CreateProduct";
import { ProductNameTypes } from "./types";


// Define the default product object
const DefaultProductObject = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: ""
  }
};
function App() {
  // Access theme using useTheme hook
  const theme = useTheme();
  // Check if the screen size is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // State variables
  const [product, setProduct] = useState<IProduct>(DefaultProductObject);
  const [productToEdit, setProductToEdit] = useState<IProduct>(DefaultProductObject);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Open modal handler
  const handleOpen = () => setOpen(true);
  // Close modal handler
  const handleClose = () => setOpen(false);

    // OpenEdit modal handler
    const handleOpenEdit = () => setOpenEdit(true);
    // CloseEdit modal handler
    const handleCloseEdit = () => setOpenEdit(false);

  // Input change handler
  const onChangehandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    // Update the product state with the new value
    setProduct({
      ...product,
      [name]: value,
    });
    // Clear any errors for the current input field
    setErrors({
      ...errors,
      [name]: ""
    });
  }

  // Input Edit change handler
  const onChangeEdithandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    // Update the product state with the new value
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    // Clear any errors for the current input field
    setErrors({
      ...errors,
      [name]: ""
    });
  }

  // Generate card data for rendering
  const cardsData = products.map((product,idx) => (
    <Grid key={product.id} item xs={12} sm={6} md={6} lg={4} minHeight={"100px"} minWidth={"100px"}>
      <ProductCard product={product} setProductToEdit={setProductToEdit} openEditModal={handleOpenEdit} idx={idx} setProductToEditIdx={setProductToEditIdx}/>
    </Grid>
  ));

  // Generate form inputs for rendering
  const renderFormInputList = formInputsList.map(input => (
    <div key={input.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <label htmlFor={input.id}>
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangehandler}
        error={!!errors[input.name]} // Check if there is an error message for this field
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  // Generate form inputs for Edit
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEdithandler} />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  // Form submit handler
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    // Check if there are any errors
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      // Update errors state with new errors
      setErrors(errors);
      return;
    }

    // Add new product to the products list
    setProducts(prev => [{ ...product, id: uuid(),category:selectedCategory }, ...prev]);
    // Reset product state to default
    setProduct(DefaultProductObject);
    // Close the modal
    handleClose();
  }

  /* Edit submit handler */
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    // Check if there are any errors
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      // Update errors state with new errors
      setErrors(errors);
      return;
    }

    // Add new product to the products list
    const updatedList = [...products]
    updatedList[productToEditIdx] = productToEdit
    setProducts(updatedList)
    // Reset product state to default
    setProductToEdit(DefaultProductObject);
    // Close the modal
    handleCloseEdit();
  }

  // Cancel button click handler
  const onCancel = () => {
    // Reset product state to default
    setProduct(DefaultProductObject);
    // Close the modal
    handleClose();
  }

  return (
    // Return JSX
    
    <Container >
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>Build a Product</Button>
    </div>

    <Grid
      container
      spacing={1}
      justifyContent={isSmallScreen ? 'center' : 'flex-start'} // Center the content on small screens
      alignItems="center"
      style={{ minHeight: '20vh' }} // Adjusted minHeight for better visibility
    >
      {cardsData}
      {/* Add Product modal */}
      <CreateProductModal open={open} handleClose={handleClose} title="new">
      <form onSubmit={submitHandler}>
        <div style={{ display: 'flex',flexDirection: 'column', width: '100%'}}>
        {renderFormInputList}
        <Menu selected={selectedCategory} setSelected={setSelectedCategory}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <Button variant="contained" color="error" sx={{ flex: '1', marginRight: '2px' }} onClick={onCancel}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ flex: '1', marginLeft: '2px' }} type="submit">Submit</Button>
          </div>
        </div>

        </form>
      </CreateProductModal>

      {/* Edit product modal */}
      <CreateProductModal open={openEdit} handleClose={handleCloseEdit} title="Edit modal">
      <form onSubmit={submitEditHandler}>
        <div style={{ display: 'flex',flexDirection: 'column', width: '100%'}}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product Description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
        {/* <Menu selected={selectedCategory} setSelected={setSelectedCategory}/> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <Button variant="contained" color="error" sx={{ flex: '1', marginRight: '2px' }} onClick={onCancel}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ flex: '1', marginLeft: '2px' }} type="submit">Submit</Button>
          </div>
        </div>

        </form>
      </CreateProductModal>
      
      
    </Grid>
  </Container>
  )
}

export default App
