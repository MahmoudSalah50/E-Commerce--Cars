import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './CarsCss/order.css';

const Order = () => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedOrder = JSON.parse(localStorage.getItem('order')) || [];
    setOrder(storedOrder);

    if (storedOrder.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Orders Found',
        text: 'Your order list is empty. Please make sure you have submitted an order.',
        confirmButtonText: 'OK'
      });
    }
  }, []);

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleGoHome = () => {
    Swal.fire({
      icon: 'success',
      title: 'Order Submitted!',
      text: 'Your order has been successfully submitted. Redirecting to home...',
      timer: 2000,
      timerProgressBar: true,
      didClose: () => {
        navigate('/'); 
      }
    });
  };

  return (
    <div className="container p-5">
      <h1 className="text-center my-4">Order Summary</h1>
      {order.length > 0 ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-center">Total Price: ${calculateTotal()}</h3>
          <div className="text-center mt-4">
            <button onClick={handleGoHome} className="btn btn-primary">
              Submit
            </button>
          </div>
        </>
      ) : (
        <h3 className="text-center">No items in your order!</h3>
      )}
    </div>
  );
};

export default Order;
