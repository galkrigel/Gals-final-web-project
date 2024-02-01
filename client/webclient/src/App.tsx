
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Properties from './pages/Properties';
import { Route, Routes } from 'react-router-dom';
import { Routers } from './enums/routers';
import AddProperty from './pages/AddProperty';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path={Routers.Properties} element={<Properties />} />
        <Route path={Routers.Login} element={<Login />} />
        <Route path={Routers.AddProperty} element={<AddProperty />} />
        <Route path={Routers.EditProfile} element={<EditProfile />} />
        <Route path={Routers.Register} element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
