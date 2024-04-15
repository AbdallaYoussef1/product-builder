import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import { IProduct } from '../interfaces';
import { titleSlicer } from '../utils/functions';
interface Iprops{
product:IProduct
setProductToEdit: (product: IProduct) => void;
openEditModal: () => void;
idx: number;
setProductToEditIdx: (value: number) => void;
openDeleteModal:()=>void;
}

const ProductCard = ({product, setProductToEdit, openEditModal,idx,setProductToEditIdx,openDeleteModal}:Iprops) => {
    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
        setProductToEditIdx(idx);
    };

    const onDelete = () => {
        setProductToEdit(product);
        openDeleteModal();
    };

    return (
        <Card variant="outlined" >
                    <CardMedia sx={{ height: 140 }} image={product.imageURL} title="Product Image" />
                    <CardContent style={{ position: 'relative', minHeight: '100px' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Typography gutterBottom variant="h5" component="div">
                            {titleSlicer(product.title)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                            {product.description}
                            </Typography>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" style={{ color: 'black', fontWeight: '600' }}>
                            ${product.price}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Typography variant="body1" style={{ fontWeight: '600' }}>
                            {product.category.name}
                            </Typography>
                        </div>
                        </div>


                    </CardContent>

                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={onEdit}>
                        Edit
                        </Button>
                        <Button variant="contained" color="error" fullWidth onClick={onDelete}>
                        Delete
                        </Button>
                    </CardActions>
        </Card>
    );
}

export default ProductCard;