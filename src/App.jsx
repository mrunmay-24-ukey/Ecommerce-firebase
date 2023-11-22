import React from 'react'
import { BrowserRouter as Router  ,Routes , Route, Navigate} from 'react-router-dom'
import Nopage from './pages/nopage/Nopage'
import Cart from './pages/cart/Cart'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Dashboard from './pages/admin/dashboard/Dashboard'
import MyState from './context/data/MyState'
import Login from './pages/registration/login'
import SignUp from './pages/registration/SignUp'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import UpdateProduct from './pages/admin/page/UpdateProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
         <Route path='/' element={<Home/>}/>
          <Route path='/order' element={
            <ProtectedRoute>
              <Order/>
            </ProtectedRoute>
          }/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/productInfo' element={<ProductInfo/>}/>
         <Route path='/*' element={<Nopage/>}/>
         <Route path='/addproduct' element={
          <ProtectedRoute>
            <AddProduct/>
          </ProtectedRoute>
         }/>
         <Route path='/updateproduct' element={
          <ProtectedRoute>
            <UpdateProduct/>
          </ProtectedRoute>
         }/>
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default App


// protected route for user
export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user') // user is the name of localStorage
  if(user){
    return children;
  }
  else{
    return <Navigate to='/login' />
  }
}

// admin protected route

const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user')); // now data inside the admin is coming in object so i can easily access that data
  if(admin.user.email === 'pratham@gmail.com'){
    return children;
  }
  else{
    return <Navigate to='/login'/>
  }

}