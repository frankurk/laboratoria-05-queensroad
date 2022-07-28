import React, { useState } from 'react';
import menu from '../data/menu.js';
import './CardMenu.scss';
 
const CardMenu = ({ category, selectedDish }) => {

  //const [item, setItem] = useState('');

//console.log(category, "im category in CardMenu")

  return (
    <div className='cardmenu-container'>
      {menu[category].map((item, index) => (
        <div className="cardmenu-items" key={index} onClick={() => selectedDish(item)}>
          <img className='cardmenu-img'  src={item.img} alt="dish img" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.size}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CardMenu;
