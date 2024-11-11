// ListingCard.js

import React from 'react';
import '../App.css';
import axios from 'axios';

// Define the ListingCard component
const ListingCard = ({ listing }) => {
  const {
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    square_feet,
    description,
    url,
  } = listing;

  return (
    <div className="listing-card">
      <h2>{title}</h2>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Bedrooms:</strong> {bedrooms}</p>
      <p><strong>Bathrooms:</strong> {bathrooms}</p>
      <p><strong>Square Feet:</strong> {square_feet} sq ft</p>
      <p><strong>Description:</strong> {description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        View Listing
      </a>
    </div>
  );
};

// Export the ListingCard component
export default ListingCard;