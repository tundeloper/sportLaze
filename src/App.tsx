// import React from 'react';
// import logo from './logo.svg';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/loadings/loading';
import Protect from './utils/ProtectedRoute';
import SportlazeProvider from './store/context';
import LoungeId from './pages/selectedLounge';
import UserProfile from './pages/userProfile';
import EditProfile from './pages/edit-profile';
const Welcome = lazy(() => import('./pages/auth'))
const Home = lazy(() => import('./pages/home'))
const Lounge = lazy(() => import('./pages/lounge'))

function App() {
  return (
    <SportlazeProvider>
      <GoogleOAuthProvider clientId='292887638276-kk8gmqfsjivcnjujhsiqiu5d62rkocqt.apps.googleusercontent.com'>
      <div className="App">
        <Routes>
          <Route
            path='/' element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
          <Route
            path='/auth' element={<Suspense fallback={<div>Loading...</div>}><Welcome /></Suspense>} />
            <Route
            path='/user' element={<Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>} />
            <Route
            path='/edit-Profile' element={<Suspense fallback={<div>Loading...</div>}><EditProfile /> </Suspense>} />
          <Route
            path='/lounge' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><Lounge /></Protect></Suspense>} />
          <Route
            path='/videos' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><div>Videos Route</div></ Protect></Suspense>} />
          <Route
            path='/lounge/:lounge' element={<Suspense fallback={<div>Loading...</div>}><Protect redirectPath='auth'><LoungeId /></Protect></Suspense>} />
          <Route
            path='*' element={<Suspense fallback={<div>Loading...</div>}><div>Invalid Route</div></Suspense>} />
        </Routes>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
      </GoogleOAuthProvider>
    </SportlazeProvider>
  );
}

export default App;
