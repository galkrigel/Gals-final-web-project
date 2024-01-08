
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './pages/Login/Login';
import Properties from './pages/Properties/Properties';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Routers } from './enums/routers';
import { Property } from './pages/Property/Property';
import { TProperty } from './types/TProperty';

const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
        <Route path={Routers.Properties} element={<Properties />} />
        <Route path={Routers.Login} element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
