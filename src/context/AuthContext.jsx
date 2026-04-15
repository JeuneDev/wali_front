import { createContext, useContext, useState } from 'react';
import { mockCandidat, mockRecruteur } from '../data/mockData';

const AuthContext = createContext(null);

// ── Mock credentials (demo) ─────────────────────
export const MOCK_CREDENTIALS = {
  candidat: {
    email: 'amadou.diallo@gmail.com',
    password: 'password123',
  },
  recruteur: {
    email: 'sarah.camara@techsolutions.gn',
    password: 'password123',
  },
};

function loadSession() {
  try {
    return {
      type: localStorage.getItem('wali_user_type') || null,
      data: JSON.parse(localStorage.getItem('wali_user_data') || 'null'),
    };
  } catch {
    return { type: null, data: null };
  }
}

export function AuthProvider({ children }) {
  const session = loadSession();
  const [userType, setUserType] = useState(session.type);
  const [user, setUser] = useState(session.data);

  const persist = (type, data) => {
    setUserType(type);
    setUser(data);
    localStorage.setItem('wali_user_type', type);
    localStorage.setItem('wali_user_data', JSON.stringify(data));
  };

  const login = (email, password, role) => {
    const creds = MOCK_CREDENTIALS[role];
    if (!creds) return { success: false, error: 'Rôle invalide.' };
    if (creds.email !== email.trim().toLowerCase()) {
      return { success: false, error: 'Email ou mot de passe incorrect.' };
    }
    if (creds.password !== password) {
      return { success: false, error: 'Email ou mot de passe incorrect.' };
    }
    const data = role === 'candidat' ? mockCandidat : mockRecruteur;
    persist(role, data);
    return { success: true };
  };

  const register = (_formData, role) => {
    // Mock: use default data for the selected role
    const data = role === 'candidat' ? mockCandidat : mockRecruteur;
    persist(role, data);
    return { success: true };
  };

  const logout = () => {
    setUserType(null);
    setUser(null);
    localStorage.removeItem('wali_user_type');
    localStorage.removeItem('wali_user_data');
  };

  // Backward-compat helpers (used in a few legacy spots)
  const loginAsCandidat  = () => persist('candidat',  mockCandidat);
  const loginAsRecruteur = () => persist('recruteur', mockRecruteur);

  return (
    <AuthContext.Provider value={{
      userType, user,
      login, register, logout,
      loginAsCandidat, loginAsRecruteur,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
