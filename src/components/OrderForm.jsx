import React, { useContext, useState } from 'react';
import SelectionContext from '../context/Context';
import axios from 'axios';
import './OrderForm.scss';
import OrderItem from './OrderItem';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const OrderForm = () => {
  const { selected, setSelected } = useContext(SelectionContext);
  const [table, setTable] = useState('');
  const [customer, setCustomer] = useState('');
  const [order, setOrder] = useState([]);

  const { headers } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);

  const newOrder = (arr) => {
    const obj = {
      table: table,
      customer: customer,
      items: [],
    };
    for (let i = 0; i < arr.length; i++) {
      const itemObj = {};
      itemObj.menuItemId = arr[i].id;
      itemObj.count = arr[i].count;
      obj.items.push(itemObj);
    }
    setOrder(obj);
    sendOrder(obj);
    clearOrder();
  };

  const sendOrder = async (order) => {
    try {
      const resp = await axios.post(
        'https://burgerqueen.barrenechea.cl/orders', 
        order, { headers }
      );
      MySwal.fire({
        title: <strong>Your order was successfully submitted!</strong>,
        icon: 'success',
      });
    } catch (err) {
      console.error(err);
      MySwal.fire({
        title: <strong>Your order was successfully submitted!</strong>,
        icon: 'error',
      });
    }
  };

  const clearOrder = () => {
    setSelected([]);
    setCustomer('');
    setTable('');
    setOrder([]);
  };

  let tip;
  let subTotal;
  const priceOrder = () => {
    let count = 0;
    if (selected) {
      selected.map((item) => {
        count += item.price * item.count;
      });
      return count;
    }
  };

  return (
    <form className="orderform">
      <h2>Order</h2>
      <select
        onChange={(e) => setTable(e.target.value)}
        value={table}
        className="orderform-tables"
      >
        <option value="table-1">Table 1</option>
        <option value="table-2">Table 2</option>
        <option value="table-3">Table 3</option>
        <option value="table-4">Table 4</option>
        <option value="table-5">Table 5</option>
        <option value="table-6">Table 6</option>
        <option value="table-7">Table 7</option>
        <option value="table-8">Table 8</option>
        <option value="table-9">Table 9</option>
        <option value="table-10">Table 10</option>
      </select>
      <input
        onChange={(e) => setCustomer(e.target.value)}
        value={customer}
        type="text"
        className="orderform-client"
        placeholder="Client Name"
      ></input>
      <div className="orderform-details">
        <p className="orderform-details1">Item</p>
        <p className="orderform-details2">Qty</p>
        <p className="orderform-details3">Total</p>
      </div>
      <div className="oderform-orderitem-container">
        {selected &&
          selected.map((item) => <OrderItem selection={item} key={item.id} />)}
      </div>
      <div className="orderform-payment-details">
        <p>Sub Total:</p>
        <p>${(subTotal = priceOrder()).toFixed(2)}</p>
        <p>Tip:</p>
        <p>${(tip = (subTotal * 0.1).toFixed(2))}</p>
        <p>Total:</p>
        <p>${(parseFloat(tip) + parseFloat(subTotal)).toFixed(2)}</p>
      </div>
      <button
        onClick={() => {
          newOrder(selected);
        }}
        className="orderform-btn"
        type="button"
      >
        Send
      </button>
    </form>
  );
};

export default OrderForm;
