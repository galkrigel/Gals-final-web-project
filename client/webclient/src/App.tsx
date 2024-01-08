
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './pages/Login/Login';
import Properties from './pages/Properties/Properties';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

const App = () => {
  return (

    <div>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/login">About</Link>
      </nav> */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Properties />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
