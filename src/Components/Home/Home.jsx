import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logo, setting, profile, karzinka, notFount } from '/public/img/index.jsx';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://6545dcc1fe036a2fa954e375.mockapi.io/api/v1/products/name');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = ({ selected }) => setCurrentPage(selected + 1);

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить товар?')) {
      axios
        .delete(`https://6545dcc1fe036a2fa954e375.mockapi.io/api/v1/products/name/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
          toast.success('Товар успешно удален');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Ошибка при удалении товара');
        });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = Math.ceil(products.length / productsPerPage);

    return (
      <ul className="pagination">
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
            <button className='btn btn-info gap' onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
          </li>
        ))}
      </ul>
    );
  };

  const handleLogout = () => {
    window.location.reload(); // Обновляем страницу
    localStorage.removeItem('userData');
  };

  return (
    <div className="mainHome">
      <div className="Sections1">
        <div className="imgHeader1"><img src={logo} alt="logo" /></div>
        <div className="imgHeader2"><img src={setting} alt="setting" /></div>
        <div className="imgHeader3"><img src={profile} alt="profile" /></div>
        <div className="imgHeader4"><img src={karzinka} alt="karzinka" /></div>
      </div>
      <div className="Sections2">
        <div className="MinSections1">
          <div className="globalmenu">
            <h1>Пациенты</h1>
            <Link to="/profile"><button className='btn btn-info btnLogout'>Профиль</button></Link>
            <Link to="/add"><button className='createNewProduct'>Создать Новый Пациент</button></Link>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="globalmenu1">
            <p>Главная / Пациенты</p>
          </div>
        </div>
        <div className="MinSections2">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : currentProducts.length === 0 ? (
            <div>
              <div className="notProduct1"><h1>Вы пока не создали ни одного Пациента</h1></div>
              <div className="notProduct2"><img src={notFount} alt="notFound" /></div>
              <div className="notProduct3"><Link to="/add"><button className='createNewProduct'>Создать Новый Пациент</button></Link></div>
            </div>
          ) : (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <Link to={`/details/${product.id}`}>{product.name}</Link>
                      </td>
                      <td>{product.discountedPrice}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className="btn btn-primary">Edit</Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {renderPageNumbers()}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;