import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://6545dcc1fe036a2fa954e375.mockapi.io/api/v1/products/name/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>
      {loading ? (
        <Spinner className='load' animation="border" role="status"></Spinner>
      ) : product ? (
        <div className='details'>
          <h2>Имя :{product.name}</h2>
          <p>Описание : {product.description}</p>
          <p>Цена со скидкой : {product.discountedPrice} UZS</p>
          <h2>Цена : {product.price} UZS</h2>
          <Link to="/home"><button className='createNewProduct'>Назад</button></Link>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default Details;
