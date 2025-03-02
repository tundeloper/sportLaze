import React from 'react';
// import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import { useSportlaze } from '../hooks/useContext';

const Protect: React.FC<{ children: React.ReactNode, redirectPath: string }> = ({ children, redirectPath }) => {
  const { isAuthenticated } = useSportlaze();
  // console.log(isAuthenticated)


  if (!isAuthenticated) {
    return <Navigate to={'/auth'} replace />;
  }

  return <>{children}</>;
};

export default Protect

