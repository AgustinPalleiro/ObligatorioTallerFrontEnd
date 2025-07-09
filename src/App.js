import './estilos.css';
import './bootstrap.min.css';
import Login from './componentes/Login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './componentes/Registro';
import Navbar from './componentes/Navbar';
import Principal from './componentes/Ventas/Principal';


const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Navbar />}>
              <Route path='/dashboard' element={<Principal />} />
            </Route>
            <Route path='/registro' element={<Registro />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}


export default App;
