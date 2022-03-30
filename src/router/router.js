
import { Routes, Route, useRoutes } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Preview from '../pages/Preview';
import QRCodePreview from '../pages/QRCodePreview';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Browser from '../pages/Browser';
import Catalogue from '../pages/Browser/SubPages/Catalogue';

const Test = () => {
  return (
    <div>12333333</div>
  )
}

const Router = () => {
{/* <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/browser' element={<Browser />} />
      <Route path='/qrcode-preview/:url' element={<QRCodePreview />}/>
      <Route path='/preview/:url' element={<Preview />} />
    </Routes> */}
  let routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: '/preview/:id/:userId', 
      element: <Preview />,
    },
    {
      path: "/browser",
      element: <Browser />,
      children: [
        { index: true, element: <Catalogue /> },
        { index: true, path: '/browser/catalogue/:id/:level', element: <Catalogue /> },
        { index: true, path: '/browser/preview/:id/:userId', element: <Preview /> },
        // { path: "*", element: <Test /> },
      ],
    },
  ];

  let element = useRoutes(routes);
  
  return (
    <>{element}</>
  );
}

export default Router;