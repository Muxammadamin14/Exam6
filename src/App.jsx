import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Add from './Components/AddProducts/Add';
import Details from './Components/Details/Details';
import Registration from './Components/Registration/Registration';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
