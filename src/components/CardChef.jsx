import React, { useState, useEffect, useContext } from 'react';
import Timer from './Timer';
import axios from 'axios';
import './CardChef.scss';
import AuthContext from '../context/AuthContext';

const ChefCard = ({ status }) => {
  const [orderApi, setOrderApi] = useState(null);

  const { headers } = useContext(AuthContext);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderFromApi = await fetchOrder();
        setOrderApi(orderFromApi);
      } catch (err) {
        alert(err, 'Error getting data');
      }
    };
    getOrder();
    const timer = setInterval(() => {
      getOrder();
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchOrder = async () => {
    const config = {
      params: { status: status, includeItems: true },
      headers: headers,
    };
    try {
      let res = await axios.get(
        'https://burgerqueen.barrenechea.cl/orders',
        config
      );
      let data = await res.data;
      return data;
    } catch (err) {
      if (err.response) {
        alert(err.response.status);
        alert(err.response.data);
      }
    }
  };

  const UpdateOrderStatus = async id => {
    try {
      const res = await axios.put(
        'https://burgerqueen.barrenechea.cl/orders/' + id,
        {
          status: 'completed',
        },
        { headers }
      );
    } catch (err) {
      alert(err);
    }
  };

  const UpdateOrderHidden = async id => {
    try {
      const res = await axios.put(
        'https://burgerqueen.barrenechea.cl/orders/' + id,
        {
          status: 'completed',
          visible: false,
        },
        { headers }
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="cardchef-container">
      {orderApi ? (
        orderApi.orders.map(item => (
          <div className="cardchef-items" key={item.id}>
            <h2>Order # {item.id}</h2>
            <p>Table: {item.table}</p>
            <p>Client: {item.customer}</p>
            <ul className="cardchef-order-container">
              {item.items.map(el => (
                <li key={el.menuItemId}>
                  <p>{el.count}</p>
                  <p>{el.menuItem.title}</p>
                </li>
              ))}
            </ul>
            {status === 'pending' ? (
              <Timer onClick={() => UpdateOrderStatus(item.id)} />
            ) : (
              <button
                onClick={() => UpdateOrderHidden(item.id)}
                className="btn-ready"
                style={{ backgroundColor: '#41ABB5' }}
              >
                Ready
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Data is loading...</p>
      )}
    </div>
  );
};

export default ChefCard;
