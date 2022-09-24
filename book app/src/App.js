import './App.css';
import Home from './components/Home/Home';
import More from './components/More/More';
import {Routes,Route} from 'react-router-dom'
import Favorite from './components/Favorite/Favorite';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {BrowserRouter} from 'react-router-dom'
import Verify from './components/Verify/Verify';
import Headers from './components/Navbars/Header'
import Forget_password from './components/Forgot/Forgot';
import Reset_password from './components/Reset/Reset';
import User from './components/User/User';
import Footer from './components/Footer/Footer';
import ChangePassword from './components/ChangePassword/ChangePassword';
import BookDetails from './components/BookDetail/BookDetails';
// import BookDetails from './components/DetailBook/BookDetail';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Headers/>
     <Routes>
      <Route path='/api/v1/auth/verify/:id' element={<Verify/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/explore/:name" element={<More/>}></Route>
      <Route path='/favorite' element={<Favorite/>}></Route>
      <Route path='/forgot-password' element={<Forget_password/>}></Route>
      <Route path='/api/v1/auth/reset-password/:token' element={<Reset_password/>}></Route>
      <Route path='/user/:email' element={<User/>}></Route>
      <Route path='changePassword/:id' element={<ChangePassword/>}></Route>
      <Route path='details/:key' element={<BookDetails/>}></Route>
     </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;
