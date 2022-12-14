import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';
import Home from './views/Home.jsx';
import Waiter from './views/Waiter.jsx';
import Chef from './views/Chef.jsx';
import ChefReady from './views/ChefReady.jsx';
import { SelectionProvider } from './context/Context.jsx';
import { AuthProvider } from "./context/AuthContext.jsx"
import ProtectedRoutes from './context/ProtectedRoutes.jsx';

function App() {
  return (
    <AuthProvider>
      <SelectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Waiter" element= { <ProtectedRoutes> <Waiter />  </ProtectedRoutes>  } />
            <Route path="/Chef" element= { <ProtectedRoutes> <Chef />  </ProtectedRoutes>   }  />
            <Route path="/ChefReady" element= { <ProtectedRoutes> <ChefReady />  </ProtectedRoutes> }/>
          </Routes>
        </Router>
      </SelectionProvider>
    </AuthProvider>
  );
}

export default App;
