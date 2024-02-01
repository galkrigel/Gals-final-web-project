
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Properties from './pages/Properties/Properties';
import { Route, Routes } from 'react-router-dom';
import { Routers } from './enums/routers';
import AddProperty from './pages/AddProperty/AddProperty';
import Register from './pages/Register/Register';
import EditProfile from './pages/Login/EditProfile/EditProfile';

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
