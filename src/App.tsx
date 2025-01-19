// import React from 'react';
// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/loadings/loading';
import Protect from './utils/ProtectedRoute';
import SportlazeProvider from './store/context';
import LoungeId from './pages/selectedLounge';
const Welcome = lazy(() => import('./pages/auth'))
const Home = lazy(() => import('./pages/home'))
const Lounge = lazy(() => import('./pages/lounge'))

function App() {
  return (
    <SportlazeProvider>
      <div className="App">
        <Routes>
          <Route
            path='/' element={<Suspense fallback={<Loading />}><Protect redirectPath='auth'><Home /></Protect></Suspense>} />
          <Route
            path='/auth' element={<Suspense fallback={<div>Loading...</div>}><Welcome /></Suspense>} />
          <Route
            path='/lounge' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><Lounge /></Protect></Suspense>} />
          <Route
            path='/videos' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><div>Videos Route</div></ Protect></Suspense>} />
          <Route
            path='/lounge/:lounge' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><LoungeId /></Protect></Suspense>} />
          <Route
            path='*' element={<Suspense fallback={<div>Loading...</div>}><div>Invalid Route</div></Suspense>} />
        </Routes>
        
      </div>
    </SportlazeProvider>
  );
}

export default App;
