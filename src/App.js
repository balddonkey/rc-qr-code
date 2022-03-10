
import { Routes, Route } from 'react-router-dom';


import logo from './logo.svg';
import styles from "./App.module.scss";

// Pages
import Home from './pages/Home';
import Preview from './pages/Preview';
import QRCodePreview from './pages/QRCodePreview';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/qrcode-preview/:url' element={<QRCodePreview />}/>
      <Route path='/preview/:url' element={<Preview />} />
    </Routes>
  );
}

export default App;
