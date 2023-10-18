import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      const imageResponse = await axios.post('https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products', formData);
      const imageUrl = imageResponse.data.imageUrl;

      const newProduct = {
        name: name,
        price: price,
        discountedPrice: discountedPrice,
        brand: brand,
        description: description,
        image: imageUrl,
      };

      const response = await axios.post('https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products', newProduct);

      if (response.status === 201) {
        toast.success('Товар успешно добавлен');
      } else {
        toast.error('Ошибка при добавлении товара');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ошибка при добавлении товара');
    }
  };

  return (
    <div className="container">
      <h1>Добавить товар</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Имя</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Цена</label>
          <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="discountedPrice" className="form-label">Цена со скидкой</label>
          <input type="number" className="form-control" id="discountedPrice" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Бренд</label>
          <input type="text" className="form-control" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Описание</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Картинка</label>
          <input type="file" className="form-control" id="image" onChange={handleImageUpload} />
          {image && <img src={URL.createObjectURL(image)} alt="Выбранная картинка" />}
        </div>
        <button type="submit" className="btn btn-primary">Добавить</button>
        <Link to="/home"><button className='createNewProduct'>Назад</button></Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
