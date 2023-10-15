import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <div className='details'>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.priceSale}</p>
          <h2>{product.price}</h2>
          <Link to="/home"><button className='createNewProduct'>Назад</button></Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
