import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ListingCard from './components/ListingCard';

const App = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
    });

    // Fetch listings when component mounts or when filters change
    useEffect(() => {
        const fetchListings = async () => {
            const response = await axios.get('http://localhost:5000/listings', { params: filters });
            setListings(response.data);
        };
        fetchListings();
    }, [filters]);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="App">
            <header>
                <h1>Rental Listings</h1>
                <form id="filter-form">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                    />
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                    />
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                    />
                    <label htmlFor="minBedrooms">Min Bedrooms:</label>
                    <input
                        type="number"
                        id="minBedrooms"
                        name="minBedrooms"
                        value={filters.minBedrooms}
                        onChange={handleFilterChange}
                    />
                    <button type="submit">Filter Listings</button>
                </form>
            </header>
            <main>
                <section id="listings-container">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default App;