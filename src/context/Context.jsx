import React, { createContext, useState } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);

  const addDish = product => {
    const isDishPresent = selected.some(item => item.id === product.id);
    if (isDishPresent) {
      const updatedSelected = selected.map(item => {
        if (item.id === product.id) {
          return { ...item, count: ++item.count };
        }
        return item;
      });
      setSelected(updatedSelected);
    } else {
      setSelected([...selected, { ...product, count: 1 }]);
    }
  };

  const removeDish = product => {
    const isDishPresent = selected.some(item => item.id === product.id);
    if (isDishPresent) {
      const updatedSelected = selected.map(item => {
        if (item.id === product.id) {
          return { ...item, count: --item.count };
        }  
        return item;
      });
      setSelected(updatedSelected);
    } else {
      setSelected([...selected, { ...product, count: 1 }]);
    } 
  };

  const deleteDish = id => {
    setSelected(selected.filter(item => item.id !== id));
  };

  return (
    <SelectionContext.Provider
      value={{ selected, setSelected, addDish, deleteDish, count, setCount, removeDish }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionContext;
