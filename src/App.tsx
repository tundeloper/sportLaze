// import React from 'react';
// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
const Login = lazy(() => import('./components/login'))

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<div className='text-primary font-bold'>Home</div>} />
        <Route 
          path='/login' element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>}/>
        <Route path='/signup' element={<div>Signup</div>} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
