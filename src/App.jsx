import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import RegistationPage from "./page/RegistationPage"
import LoginPage from "./page/LoginPage"
import VerifyEmailPage from "./page/VerifyEmailPage"
import ProfilePage from "./page/ProfilePage"
import ProductPage from "./page/ProductPage"
import UserProductPage from "./page/UserProductPage"
import UpadateProductPage from "./page/UpadateProductPage"
import CreateProductPage from "./page/CreateProductPage"
import ProductListPage from "./page/ProductListPage"

import SessionHelper from "./component/helper/SessionHelper"

function App() {

  if(SessionHelper.getToken()){
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
  
          {/* User Router */}
          <Route path="/registration" element={<Navigate to='/' replace/>} />
          <Route path="/login" element={<Navigate to='/' replace/>} />
          <Route path="/VerifyEmail" element={<VerifyEmailPage/>} />
          <Route path="/my-profile" element={<ProfilePage/>} />
          <Route path="/All-product" element={<ProductPage/>} />
          <Route path="/user-product" element={<UserProductPage/>} />
          <Route path="/create-product" element={<CreateProductPage/>} />
          <Route path="/update-product/:id" element={<UpadateProductPage/>} />
          
          <Route path="/search-by-keyword/:keyword" element={<ProductListPage/>} />
        </Routes>
      </BrowserRouter>
       
      </>
    )
  }else{
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
  
          {/* User Router */}
          <Route path="/registration" element={<RegistationPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/VerifyEmail" element={<VerifyEmailPage/>} />
          <Route path="/my-profile" element={<Navigate to='/registration' replace/>} />
          <Route path="/All-product" element={<ProductPage/>} />
          <Route path="/user-product" element={<Navigate to='/login' replace/>} />
          <Route path="/create-product" element={<Navigate to='/login' replace/>} />
          <Route path="/update-product/:id" element={<Navigate to='/login' replace/>} />
          
          <Route path="/search-by-keyword/:keyword" element={<Navigate to='/login' replace/>} />
        </Routes>
      </BrowserRouter>
       
      </>
    )
  }
}

export default App
