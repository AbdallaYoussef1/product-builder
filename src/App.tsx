import { Button, Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import CustomCard from "./Components/ProductCard"
import { formInputsList, productList } from "./data"
import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react";
import CreateProduct from "./Components/CreateProduct";
import Input from "./Components/ui/input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./Components/ErrorMessage";


function App() {
    const theme = useTheme(); // Access theme using useTheme hook
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
    const DefaultProductObject = {
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors:[],
      category:{
        name:"",
        imageURL:""
      }
    };
    const [product, setProduct]= useState <IProduct>(DefaultProductObject)
    const [products, setProducts]= useState <IProduct[]>(productList)
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onChangehandler = (event:ChangeEvent<HTMLInputElement>)=>{
      const{value, name} = event.target;
      setProduct({
        ...product,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]:""
      })
    }


    const cardsData = products.map(product => (
        <Grid key={product.id} item xs={12} sm={6} md={6} lg={4} minHeight={"100px"} minWidth={"100px"}>
          <CustomCard product={product} />
        </Grid>
      ));

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

      const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        console.log(product)
        event.preventDefault();
        const { title, description, price, imageURL } = product;
        const errors = productValidation({
          title,
          description,
          price,
          imageURL,
        });

        const hasErrorMsg =
        Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

        if (!hasErrorMsg) {
          setErrors(errors);
          return;
        }
        setProducts(prev => [{...product, id: uuid()},...prev])
        setProduct(DefaultProductObject)
        handleClose()
      }
      const onCancle =()=>{
        setProduct(DefaultProductObject)
        handleClose()
      }
    

  return (
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
      
      <CreateProduct open={open} handleClose={handleClose} title="new">
      <form onSubmit={submitHandler}>
        <div style={{ display: 'flex',flexDirection: 'column', width: '100%'}}>
        {renderFormInputList}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <Button variant="contained" color="error" sx={{ flex: '1', marginRight: '2px' }} onClick={onCancle}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ flex: '1', marginLeft: '2px' }} type="submit">Submit</Button>
          </div>
        </div>

        </form>
      </CreateProduct>
      
      
    </Grid>
  </Container>
  )
}

export default App
