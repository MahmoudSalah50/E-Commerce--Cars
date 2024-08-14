import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CarsCss/cart.css"; 

const Cart = ({ count, setCount, removeFromCart }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  // Handle remove item from cart
  const handleRemove = (id) => {
    removeFromCart(id);
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updatedCart);
  };

  // Handle submit order
  const handleSubmitOrder = () => {
    Swal.fire({
      title: "Submitting Order...",
      html: '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate order submission delay
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Order Submitted",
        text: "Your order has been successfully submitted!",
        confirmButtonText: "OK",
      }).then(() => {
        // Store the order in localStorage (optional)
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("order", JSON.stringify(cart)); // Store the order

        // Clear cart
        localStorage.removeItem("cart");
        setCart([]);
        setCount(0); // Update cart count to 0

        navigate("/order"); 
      });
    }, 2000);
  };

  return (
    <div className="container cart-page p-5">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price} $</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Price: {calculateTotalPrice()} $</h3>
          <div className="text-center">
            <button onClick={handleSubmitOrder} className="btn btn-primary">
              Submit Order
            </button>
          </div>
        </>
      ) : (
        <h3>No items in the cart!</h3>
      )}
    </div>
  );
};

export default Cart;
