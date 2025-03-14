import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { motion } from 'framer-motion';

function Home() {
  const [orders, setOrders] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [yearlyEarnings, setYearlyEarnings] = useState(0);
  const [mostFavorableItems, setMostFavorableItems] = useState([]);
  const [chartData, setChartData] = useState({});
  const [favorableItemsChartData, setFavorableItemsChartData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        console.log(response.data.orders);
        setOrders(response.data.orders);
        calculateEarnings(response.data.orders);
        calculateMostFavorableItems(response.data.orders);
        generateChartData(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const calculateEarnings = (orders) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let monthlyTotal = 0;
    let yearlyTotal = 0;

    orders.forEach((order) => {
      const orderDate = new Date(order.date);
      if (orderDate.getMonth() === currentMonth) {
        monthlyTotal += order.total;
      }
      if (orderDate.getFullYear() === currentYear) {
        yearlyTotal += order.total;
      }
    });

    setMonthlyEarnings(monthlyTotal);
    setYearlyEarnings(yearlyTotal);
  };

  const calculateMostFavorableItems = (orders) => {
    const itemCounts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (itemCounts[item.name]) {
          itemCounts[item.name] += item.quantity;
        } else {
          itemCounts[item.name] = item.quantity;
        }
      });
    });

    const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
    setMostFavorableItems(sortedItems.slice(0, 5));

    setFavorableItemsChartData({
      labels: sortedItems.slice(0, 5).map(item => item[0]),
      datasets: [
        {
          label: 'Quantity',
          data: sortedItems.slice(0, 5).map(item => item[1]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const generateChartData = (orders) => {
    const monthlyData = Array(12).fill(0);
    orders.forEach((order) => {
      const orderDate = new Date(order.date);
      monthlyData[orderDate.getMonth()] += order.total;
    });

    setChartData({
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      datasets: [
        {
          label: 'Monthly Earnings',
          data: monthlyData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="ml-20 max-sm:ml-0 bg-gray-100 h-full p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4"
      >
        Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 shadow rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Monthly Earnings</h2>
          <p className="text-2xl"><box-icon name='rupee'></box-icon>{monthlyEarnings.toFixed(2)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 shadow rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Yearly Earnings</h2>
          <p className="text-2xl"><box-icon name='rupee'></box-icon>{yearlyEarnings.toFixed(2)}</p>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 shadow rounded-lg mt-4 h-fit"
      >
        <h2 className="text-xl font-semibold mb-2">Monthly Earnings Chart</h2>
        {chartData && chartData.labels && chartData.datasets ? (
          <Bar data={chartData} className="" />
        ) : (
          <p>Loading chart...</p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 shadow rounded-lg mt-4 h-fit-content"
      >
        <h2 className="text-xl font-semibold mb-2">Most Favorable Food Items</h2>
        {favorableItemsChartData && favorableItemsChartData.labels && favorableItemsChartData.datasets ? (
          <Pie data={favorableItemsChartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </motion.div>
      </div>
    </div>
  );
}

export default Home;