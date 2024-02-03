
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Properties from './pages/Properties';
import { Route, Routes } from 'react-router-dom';
import { Routers } from './enums/routers';
import AddProperty from './pages/AddProperty';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path={Routers.Properties}
          element={<ProtectedRoute>{<Properties />}</ProtectedRoute>}
        />
        <Route path={Routers.AddProperty}
          element={<ProtectedRoute>{<AddProperty />}</ProtectedRoute>}
        />
        <Route path={Routers.EditProfile}
          element={<ProtectedRoute>{<EditProfile />}</ProtectedRoute>}
        />
     
        <Route path={Routers.Login} element={<Login />} />
        <Route path={Routers.Register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
