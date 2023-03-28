
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvoicePage from './pages/InvoicePage';
import LoginSingnUp from './components/LoginSingnUp';

function App() {

  const routers = [
    { id: 1, path: "/", element: <HomePage /> },
    { id: 2, path: "/invoice", element: <InvoicePage /> },
    { id: 3, path: "/login", element: <LoginSingnUp /> },
  ]

  return (
    <BrowserRouter>
      <Routes>
        {
          routers.map((rout) => (
            <Route key={rout.id} path={rout.path} element={rout.element}></Route>
          ))
        }
      </Routes>


    </BrowserRouter>

  );
}

export default App;
