import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import CarList from "./components/Carlist";
import CarDetails from "./components/Cardetails";
import Order from "./components/Order";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Fotter";


function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartCount, setCartCount] = useState(
    cart.reduce((total, item) => total + item.quantity, 0)
  );

  const addToCart = (car) => {
    // Check if the car already exists in the cart
    const existingCar = cart.find((item) => item.id === car.id);

    let updatedCart;

    if (existingCar) {
      // If the car already exists, update the quantity
      updatedCart = cart.map((item) =>
        item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If the car does not exist, add it with quantity 1
      updatedCart = [...cart, { ...car, quantity: 1 }];
    }

    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <NavBar cartCount={cartCount} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<CarList addToCart={addToCart} />} />
        <Route path="/car/:id" element={<CarDetails addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              count={cartCount}
              setCount={setCartCount}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer/>
      
    </>
  );
}

export default App;
