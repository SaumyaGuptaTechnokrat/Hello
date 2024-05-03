import './App.css';
import Registration from './Components/Registration';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Login';
import Contact from './Components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Components/About';
import MyForm from './Form';
import Shop from './Components/Shop';


function App() {
  return (
    <div className="App">
        {/* <Registration/> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='Contact' element={<Contact/>}/>
              <Route path='About' element={<About/>}/>
              <Route path='Login' element={<Login/>}/>
              <Route path='Registration' element={<Registration/>}/>
              <Route path='Shop' element={<Shop/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <MyForm/> */}
    </div>
  );
}

export default App;
