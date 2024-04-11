import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import { IProduct } from '../interfaces';
import { titleSlicer } from '../utils/functions';
interface Iprops{
product:IProduct
setProductToEdit: (product: IProduct) => void;
openEditModal: () => void;
}

const ProductCard = ({product, setProductToEdit, openEditModal}:Iprops) => {
    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
      };

    return (
        <Card variant="outlined" >
                    <CardMedia sx={{ height: 140 }} image={product.imageURL} title="Product Image" />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                        {titleSlicer(product.title)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                        {product.description}
                        
                        </Typography>
                        {product.price}$
                        {product.category.name}
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={onEdit}>
                        Edit
                        </Button>
                        <Button variant="contained" color="error" fullWidth>
                        Delete
                        </Button>
                    </CardActions>
        </Card>
    );
}

export default ProductCard;