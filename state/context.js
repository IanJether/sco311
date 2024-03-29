'use client'

import { createContext, useContext, useState } from 'react';

export const MyContext = createContext();


export function MyContextProvider({ children }) {

  const [cartItems,setCartItems] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [sectionOnDisplay,setSectionOnDisplay] = useState('Details')
  const [resetValues, setResetValues] = useState(false);
  

  return (
    <MyContext.Provider value={{ cartItems,setCartItems,globalLoading,setGlobalLoading,sectionOnDisplay, setSectionOnDisplay, resetValues, setResetValues }}>
      {children}
    </MyContext.Provider>
  );
}