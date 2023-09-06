import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [email, setEmail] = useState('');

  return (

    <AuthContext.Provider value={{
      currentUser, setCurrentUser,
      isLoggedIn, setIsLoggedIn,
      email, setEmail
    }}>

        {children}

    </AuthContext.Provider>

  )
}

export default AuthContext;