import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import SelectionContext from '../context/Context';
import './CardMenu.scss';
import AuthContext from '../context/AuthContext';

const CardMenu = ({ category }) => {
  const [menu, setMenu] = useState(null);

  const { addDish } = useContext(SelectionContext);
  const { headers } = useContext(AuthContext);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuFromApi = await fetchMenu();
        setMenu(menuFromApi);
      } catch (err) {
        alert(err, 'error getting data');
      }
    };
    getMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      let res = await axios.get('https://burgerqueen.barrenechea.cl/menu', {
        headers,
      });
      let data = await res.data;

      return data;
    } catch (err) {
      if (err.response) {
        alert(err.response.status);
        alert(err.response.data);
      }
    }
  };

  const filteredMenu = menu
    ? menu.menu.filter(item => item.type === category)
    : alert('Error fetching menu');

  return (
    <div className="cardmenu-container">
      {menu &&
        filteredMenu.map(item => (
          <div
            className="cardmenu-items"
            key={item.id}
            onClick={() => addDish(item)}
          >
            <img className="cardmenu-img" src={item.img} alt="dish img" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.size}</p>
            <p>${item.price}</p>
          </div>
        ))}
    </div>
  );
};

export default CardMenu;
