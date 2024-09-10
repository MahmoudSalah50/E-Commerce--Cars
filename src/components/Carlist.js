import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarsCss/carlist.css";

const CarList = ({ addToCart }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("cars.json")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="container  mt-5">
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-3" key={car.id}>
            <div className="card">
              <img src={car.image} className="card-img-top" alt={car.name} />
              <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">Price:{car.price} $</p>
                <Link to={`/car/${car.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(car)}
                  className="btn btn-secondary mt-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
