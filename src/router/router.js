
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Preview from '../pages/Preview';
import QRCodePreview from '../pages/QRCodePreview';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Browser from '../pages/Browser';

const Router = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/browser' element={<Browser />} />
      <Route path='/qrcode-preview/:url' element={<QRCodePreview />}/>
      <Route path='/preview/:url' element={<Preview />} />
    </Routes>
  );
}

export default Router;