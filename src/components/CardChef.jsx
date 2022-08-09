import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import axios from 'axios';
import './CardChef.scss';

const ChefCard = ({status}) => {
  const [orderApi, setOrderApi] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderFromApi = await fetchOrder();
        setOrderApi(orderFromApi);
      } catch (err) {
        console.log(err, 'error getting data');
      }
    };
    getOrder();
    setInterval(() => {
      getOrder()
    }, 30*1000)
  }, []);

  //FETCHING ORDERS
  const fetchOrder = async () => {
    try {
      let res = await axios.get('https://burgerqueen.barrenechea.cl/orders', {
        params: { status: 'pending', includeItems: true },
      });
      let data = await res.data;

      return data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  };

  //const dataApi = orderApi ? console.log(orderApi.orders[0].id) : console.log("error")

  //FILTERING STATUS (COOKING & READY)
  const filteredStatus = orderApi ? orderApi.orders.filter((item) => item.status === status) : console.log("error loading order")

  return (
    <div className="cardchef-container">
      {orderApi ? (
        filteredStatus.map((item) => (
          <div className="cardchef-items" key={item.id}>
            <h2>Order # {item.id}</h2>
            <p>Table: {item.table}</p>
            <p>Client: {item.customer}</p>
            <ul className="cardchef-order-container">
              {item.items.map((el) => (
                <li key={el.status}>
                  <p>{el.count}</p>
                  <p>{el.menuItem.title}</p>
                </li>
              ))}
            </ul>
          <Timer /> 
          </div>
        ))
      ) : (
        <p>Data is loading...</p>
      )}
    </div>
  );
};

export default ChefCard;
