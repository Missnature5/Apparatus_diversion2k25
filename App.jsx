//nimport React from 'react'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path = '/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </Router>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
     />
    </>
  );
};

export default App;
