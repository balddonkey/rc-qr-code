
import { Routes, Route } from 'react-router-dom';


import logo from './logo.svg';
import styles from "./App.module.scss";

// Pages
import Home from './pages/Home';
import Preview from './pages/Preview';
import QRCodePreview from './pages/QRCodePreview';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/qrcode-preview/:url' element={<QRCodePreview />}/>
      <Route path='/preview/:url' element={<Preview />} />
    </Routes>
  );
}

export default App;
