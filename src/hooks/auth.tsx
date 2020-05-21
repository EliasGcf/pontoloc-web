import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IAuthState {
  token: string;
  user: object;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: object;
  signIn(credential: ISignInCredentials): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = sessionStorage.getItem('@PontoLoc:token');
    const user = sessionStorage.getItem('@PontoLoc:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });
  // const [data, setData] = useState<IAuthState>({} as IAuthState);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('sessions', { email, password });

      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      sessionStorage.setItem('@PontoLoc:token', token);
      sessionStorage.setItem('@PontoLoc:user', JSON.stringify(user));

      setData({ token, user });
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
