import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDarkMode } from '../../context/DarkModeContext';

function UpdateFood() {
  const [foodData, setFoodData] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useDarkMode();

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

  const handleUpdate = async (id) => {
    try {
      const updatedFood = { price, status, image };
      await axios.put(`http://localhost:5000/fooditems/${id}`, updatedFood);
      alert('Food item updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('There was an error updating the food item.');
    }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setPrice(food.price);
    setStatus(food.status);
    setImage(food.image);
  };

  const filteredFoodItems = foodData.length > 0 && foodData[0].foodItems
    ? foodData[0].foodItems.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.id.toString().includes(searchQuery)
      )
    : [];

  return (
    <div className={`ml-20 max-sm:ml-0 h-full py-5 flex flex-col items-center ${darkMode ? '*:bg-gray-800 *:text-gray-400' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`bg-white ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 shadow-lg rounded-lg max-w-4xl w-full`}>
        <h1 className="text-2xl font-semibold mb-6">Update Food Item</h1>
        <div className="w-full flex justify-end items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg outline-none"
          />
          <button className="ml-2 p-2 bg-green-500 hover:bg-green-600 rounded-lg">
            <p className="flex content-center"><box-icon name='search' color="white"></box-icon></p>
          </button>
        </div>
        <hr className="mb-4" />
        {filteredFoodItems.length > 0 ? (
          filteredFoodItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              handleSelectFood={handleSelectFood}
            />
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white py-4 px-6 shadow-lg rounded-lg flex flex-col gap-3 justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Edit Food Item</h2>
            <div className="mb-4">
              <label className="block text-lg font-medium">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedFood(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(selectedFood.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const FoodCard = ({ item, handleSelectFood }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
      className="w-full mb-4 p-4 border rounded-lg flex justify-between items-center bg-white hover:shadow-lg transition duration-200"
    >
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
        <div>
          <p className="font-bold">{item.name}</p>
          <p>Price: {item.price}</p>
          <p>Category: {item.category}</p>
          <p>Status: {item.status}</p>
        </div>
      </div>
      <button
        onClick={() => handleSelectFood(item)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
      >
        Edit
      </button>
    </motion.div>
  );
};

export default UpdateFood;