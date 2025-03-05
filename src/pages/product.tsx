import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../Redux/slice/cartSlice';

const products: CartItem[] = [
  { id: 1, name: 'Produk 1', price: 100 },
  { id: 2, name: 'Produk 2', price: 200 },
  { id: 3, name: 'Produk 3', price: 300 },
];

const ProductList = () => {
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const Product = ({ product }: { product: CartItem }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductList;