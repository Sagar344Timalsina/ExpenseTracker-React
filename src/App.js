
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import InvoicePage from './pages/InvoicePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} ></Route>
      <Route path='/invoice' element={<InvoicePage/>} ></Route>
    </Routes>
    
    
    </BrowserRouter>
    
  );
}

export default App;
