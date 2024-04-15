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
import MainModal from "./Components/MainModal";
import { ProductNameTypes } from "./types";
import AlertComp from "./Components/ui/Alert";


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
  const [openDelete, setOpenDelete] = useState(false);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [showAlertAdd, setShowAlertAdd] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);

  // Open modal handler
  const handleOpen = () => setOpen(true);
  // Close modal handler
  const handleClose = () => setOpen(false);

  // OpenEdit modal handler
  const handleOpenEdit = () => setOpenEdit(true);
  // CloseEdit modal handler
  const handleCloseEdit = () => setOpenEdit(false);

  // OpenDelete modal handler
  const handleOpenDelete = () => setOpenDelete(true);
  // CloseDelete modal handler
  const handleCloseDelete = () => setOpenDelete(false);

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
      <ProductCard 
      product={product} 
      setProductToEdit={setProductToEdit} 
      openEditModal={handleOpenEdit} 
      idx={idx} 
      setProductToEditIdx={setProductToEditIdx}
      openDeleteModal={handleOpenDelete}
      />
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

    // Set a state to show the alert
    setShowAlertAdd(true);
    
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
  const hasErrorMsg =
    Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

  if (!hasErrorMsg) {
    // Update errors state with new errors
    setErrors(errors);
    return;
  }

  // Add new product to the products list
  const updatedList = [...products];
  updatedList[productToEditIdx] = productToEdit;
  setProducts(updatedList);
  // Reset product state to default
  setProductToEdit(DefaultProductObject);
  // Set a state to show the alert
  setShowAlertEdit(true);
  // Close the modal
  handleCloseEdit();
  }

  const handleDelete = ()=>{
    const filteredProducts = products.filter(product => product.id !== productToEdit.id);
    setProducts(filteredProducts);
    setShowAlertDelete(true);

    // Close the Delete modal
    handleCloseDelete();
  }



  // Cancel button click handler
  const onCancel = () => {
    // Reset product state to default
    setProduct(DefaultProductObject);
    // Close the main modal
    handleClose();
    // Close the edit modal
    handleCloseEdit();
    // Close the Delete modal
    handleCloseDelete();

  }

  return (
    // Return JSX
    
    <Container >
      {showAlertEdit && (
      <AlertComp variant='filled' severity="info" description="item was updated" open={showAlertEdit} onClick={()=>{
        setShowAlertEdit(false)
      }}/>
        )}
      {showAlertAdd && (
      <AlertComp variant='filled' severity="success" description="item was added" open={showAlertAdd} onClick={()=>{
        setShowAlertAdd(false) 
      }}/>
        )}
      {showAlertDelete && (
      <AlertComp variant='filled' severity="error" description="item was Deleted" open={showAlertDelete} onClick={()=>{
        setShowAlertDelete(false);
      }}/>
        )}
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
        <MainModal IsOpen={open} handleClose={handleClose} title="new">
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
        </MainModal>

        {/* Edit product modal */}
        <MainModal IsOpen={openEdit} handleClose={handleCloseEdit} title="Edit modal">
        <form onSubmit={submitEditHandler}>
          <div style={{ display: 'flex',flexDirection: 'column', width: '100%'}}>
            {renderProductEditWithErrorMsg("title", "Product Title", "title")}
            {renderProductEditWithErrorMsg("description", "Product Description", "description")}
            {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
            {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Menu selected={productToEdit.category}
           setSelected={(value)=>setProductToEdit({...productToEdit,category:value})}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
              <Button variant="contained" color="error" sx={{ flex: '1', marginRight: '2px' }} onClick={onCancel}>Cancel</Button>
              <Button variant="contained" color="primary" sx={{ flex: '1', marginLeft: '2px' }} type="submit">Submit</Button>
            </div>
          </div>
        </form>
        </MainModal>

        {/* Delete product modal */}
        <MainModal 
        IsOpen={openDelete} 
        handleClose={handleCloseDelete} 
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '15px' }}>
              <Button variant="contained" 
              color="inherit" 
              sx={{ flex: '1', marginRight: '2px' }} 
              onClick={onCancel}>Cancel</Button>
              <Button variant="contained" 
              color="error" 
              sx={{ flex: '1', marginLeft: '2px' }} 
              type="submit" 
              onClick={handleDelete}>Delete</Button>
            </div>
        </MainModal>


        
        
      </Grid>
    </Container>
  )
}

export default App
