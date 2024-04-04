import { Button, Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import CustomCard from "./Components/ProductCard"
import { formInputsList, productList } from "./data"

import { useState } from "react";
import CreateProduct from "./Components/CreateProduct";
import Input from "./Components/ui/input";


function App() {
    const theme = useTheme(); // Access theme using useTheme hook
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const cardsData = productList.map(product => (
        <Grid key={product.id} item xs={12} sm={6} md={6} lg={4} minHeight={"100px"} minWidth={"100px"}>
          <CustomCard product={product} />
        </Grid>
      ));
      const renderFormInputList = formInputsList.map(input => (
        <div key={input.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor={input.id}>
            {input.label}
          </label>
          <Input placeholder={input.name} />
        </div>
      ));
    

  return (
    <Container >
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <Button variant="contained" color="error" onClick={handleOpen}>Delete</Button>
    </div>

    <Grid
      container
      spacing={1}
      justifyContent={isSmallScreen ? 'center' : 'flex-start'} // Center the content on small screens
      alignItems="center"
      style={{ minHeight: '20vh' }} // Adjusted minHeight for better visibility
    >
      {cardsData}
      <CreateProduct open={open} handleClose={handleClose} title="first modal">
        <div style={{ display: 'flex',flexDirection: 'column', width: '100%'}}>
        {renderFormInputList}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
            <Button variant="contained" color="error" sx={{ flex: '1', marginRight: '2px' }}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ flex: '1', marginLeft: '2px' }}>Submit</Button>
          </div>
        </div>
        
      </CreateProduct>
      
    </Grid>
  </Container>
  )
}

export default App
