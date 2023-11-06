import './App.css';
import Nav from './Components/nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import PrivateComponent from './Components/PrivateComponent';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct1';
import UpdateProduct from './Components/UpdateProduct';
import Profile from './Components/Profile';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
          <Nav/>
          <Routes>  
            
            <Route element = {<PrivateComponent />}>
            <Route path="/List" element={<ProductList />}/>
            <Route path="/add" element={<AddProduct />}/>
            <Route path="/update/:id" element={<UpdateProduct />}/>
            <Route path="/logout" element={<h1>Logout Component</h1>}/>
            <Route path="/profile" element={<Profile />}/>

            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          </BrowserRouter>
          <Footer />
      </div> 
      

  );
}

export default App;