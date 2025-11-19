import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signin';
import ProductList from './components/homepage';
import Profile from './components/profile';
import Admin from './components/admin';
import ProductDetails from './components/view_product_details';
import GetCategory from './components/get_category';
import GetByCategory from './components/get_by_category';
//import { useNavigate } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className='Homepage-container'>
        <div className='Navigation-container'>
          <nav>
            <a href='/signup'>Sign-in</a>
            <a href='/login'>Login</a>
            <a href='/profile'>🛒My cart</a>
          </nav>
        </div>
        {/*Hero section*/}
      </div>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/display_by_category/:category" element={<GetByCategory/>} />
          <Route path="/get_category" element={<GetCategory/>} />
          <Route path="/view_product_details/:prod_id" element={<ProductDetails/>} />
          <Route path="/add_products" element={<Admin/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/" element={<ProductList/>} />
           <Route path="/profile" element={<Profile/>} />
           </Routes>
      </div>
    </Router>
  );
}

export default App;
