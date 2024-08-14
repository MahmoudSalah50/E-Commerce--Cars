import React from 'react';
import './CarsCss/about.css';


const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="text-section ">
          <h1>About Us</h1>
          <p >
            Welcome to CarStore! We provide a wide selection of the best cars in the market at competitive prices.
            Our mission is to make car buying easy and convenient.
          </p>
          <p>
            We take pride in offering excellent customer service, and our team is here to help you every step of the way.
            Whether you're looking for a new car, a used car, or just want to explore options, we've got you covered.
          </p>
        </div>
        <div className="image-section">
          <img src="https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=600" alt="About Us" />
        </div>
      </div>
    </div>
  );
};

export default About;
