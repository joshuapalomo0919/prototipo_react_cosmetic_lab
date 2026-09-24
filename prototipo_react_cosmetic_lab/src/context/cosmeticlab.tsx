import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CosmeticContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  language: 'es' | 'en';
  toggleLanguage: () => void;
}

const CosmeticContext = createContext<CosmeticContextType | undefined>(undefined);

export const CosmeticProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex((product) => product.id === productId);
      return itemIndex === -1
        ? currentCart
        : currentCart.filter((_, index) => index !== itemIndex);
    });
  };

  const clearCart = () => setCart([]);
  const toggleLanguage = () => setLanguage((current) => current === 'es' ? 'en' : 'es');

  return (
    <CosmeticContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, language, toggleLanguage }}>
      {children}
    </CosmeticContext.Provider>
  );
};

export const useCosmetic = () => {
  const context = useContext(CosmeticContext);
  if (!context) {
    throw new Error('useCosmetic debe usarse dentro de un CosmeticProvider');
  }
  return context;
};