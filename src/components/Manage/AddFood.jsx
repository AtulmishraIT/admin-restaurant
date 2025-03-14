import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddFood() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [foodData, setFoodData] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const GetFoodData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFoodData");
        setFoodData(Array.isArray(response.data.foodItems) ? response.data.foodItems : []);
      } catch (error) {
        console.log(error);
      }
    };
    GetFoodData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foodItem = { id, name, price, image, category, status };
    console.log(foodItem);
    try {
      const response = await axios.post('http://localhost:5000/fooditems', foodItem);
      if (response.status === 201) {
        setMessage("Food item added successfully");
        alert('Food item added successfully!');
        setId('');
        setName('');
        setImage('');
        setCategory('');
        setPrice('');
        setStatus('available');
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('There was an error adding the food item.');
    }
  };

  const handleImageSearch = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=j8QYluUh_tHKfUPYR1JXB5ZAH4qRM-nh0YpwOvKFOT4`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching images:', error);
    }
  };

  const handleImageSelect = (url) => {
    setImage(url);
    setSearchResults([]);
  };

  return (
    <div className="ml-20 h-full p-6 bg-gray-50 min-h-screen max-sm:-ml-0">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Food Item</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ID Field */}
          <div>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Name Field */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image URL Field */}
          <div className="md:col-span-2">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Category Field */}
          <div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Price Field */}
          <div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Status Field */}
          <div className="md:col-span-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* Image Search */}
        <div className="mt-4">
          <label className="text-sm ml-1">You can also search for food Images and click to add url</label>
          <div className='flex justify-center items-center border'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleImageSearch}
            placeholder="Search for images"
            className="w-full p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleImageSearch}
            className="bg-green-600 flex justify-center items-center text-white px-2 py-2 hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <box-icon color='white' name='search'></box-icon>
          </button>
          </div>
        </div>

        {/* Image Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((result) => (
              <img
                key={result.id}
                src={result.urls.thumb}
                alt={result.alt_description}
                className="cursor-pointer rounded-lg border border-gray-300"
                onClick={() => handleImageSelect(result.urls.full)}
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Food Item
          </button>
        </div>
        {message && <div className="text-green-500 text-center">{message}</div>}
      </form>
    </div>
  );
}

export default AddFood;