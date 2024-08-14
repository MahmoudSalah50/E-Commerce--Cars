import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CarsCss/cardetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CarDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [rating, setRating] = useState(0); // For star rating

  useEffect(() => {
    fetch(`http://localhost:9000/cars/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container car-details p-5">
      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Name:  {car.name}</h1>
          <img src={car.image} className="card-img-top my-4" alt={car.name} />
          <p className="card-text">Description:   {car.description}</p>
          <p className="card-text"><strong>Price: </strong>{car.price} $</p>

          {/* Star Rating */}
          <div className="rating mb-3">
            {Array.from({ length: 5 }, (v, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                onClick={() => handleRating(i + 1)}
                className={i < rating ? "star filled" : "star"}
              />
            ))}
          </div>

          <button onClick={() => addToCart(car)} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
