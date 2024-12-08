// import React from 'react';
// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
const Welcome = lazy(() => import('./pages/auth'))
const Home = lazy(() => import('./pages/home'))

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path='/' element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route 
          path='/auth' element={<Suspense fallback={<div>Loading...</div>}><Welcome /></Suspense>} />
          <Route 
          path='*' element={<Suspense fallback={<div>Loading...</div>}><div>Invalid Route</div></Suspense>} />
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