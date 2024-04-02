import { Button, Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import CustomCard from "./Components/ProductCard"
import { productList } from "./data"

function App() {
    const theme = useTheme(); // Access theme using useTheme hook
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

    const cardsData = productList.map(product => (
        <Grid key={product.id} item xs={12} sm={6} md={6} lg={4} minHeight={"100px"} minWidth={"100px"}>
          <CustomCard product={product} />
        </Grid>
      ));
    

  return (
    <Container >
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <Button variant="contained" color="error">Delete</Button>
    </div>

    <Grid
      container
      spacing={1}
      justifyContent={isSmallScreen ? 'center' : 'flex-start'} // Center the content on small screens
      alignItems="center"
      style={{ minHeight: '20vh' }} // Adjusted minHeight for better visibility
    >
      {cardsData}
    </Grid>
  </Container>
  )
}

export default App
