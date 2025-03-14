import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDarkMode } from '../../context/DarkModeContext';

function DeleteFood() {
  const [foodData, setFoodData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/fooditems/${id}`);
      alert('Food item deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert('There was an error deleting the food item.');
    }
  };

  const filteredFoodItems = foodData.length > 0 && foodData[0].foodItems
    ? foodData[0].foodItems.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.id.toString().includes(searchQuery)
      )
    : [];

  return (
    <div className={`ml-20 max-sm:ml-0 h-full py-5 flex flex-col items-center ${darkMode ? '*:bg-gray-800 *:text-gray-500' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`bg-white ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 shadow-lg rounded-lg max-w-4xl w-full`}>
        <h1 className="text-2xl font-semibold mb-6">Delete Food Item</h1>
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
              setIsDelete={setIsDelete}
              setDeleteItemId={setDeleteItemId}
            />
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
      {isDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white py-4 px-6 shadow-lg rounded-lg flex flex-col gap-3 justify-center items-center">
            <h1 className="text-xl font-semibold">Are you sure?</h1>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setIsDelete(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  handleDelete(deleteItemId);
                  setIsDelete(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                DELETE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const FoodCard = ({ item, setIsDelete, setDeleteItemId }) => {
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
        onClick={() => {
          setIsDelete(true);
          setDeleteItemId(item.id);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default DeleteFood;