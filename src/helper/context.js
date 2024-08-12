import React, { createContext, useState } from 'react';

// Create a context with an initial value of an empty object
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {

  const [globalData, setGlobalData] = useState();
  const [coor, setCoor] = useState({});


  const saveData = (newData) => {
    setGlobalData(newData);
  };

  const savecoor = (newData) => {
     setCoor(newData);
  };

  return (
    <GlobalStateContext.Provider value={{ globalData, saveData , coor, savecoor}}>
      {children}
    </GlobalStateContext.Provider>
  );
};
