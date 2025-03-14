import React, { useState, useEffect } from "react";
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext';
import axios from "axios";

function AppContent() {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showItems, setShowItems] = useState(false);
  const [items, setItems] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const handleOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        const orders = response.data.orders;
        setPendingOrder(orders.filter((order) => order.phase !== "delivered"));
        setDoneOrder(orders.filter((order) => order.phase === "delivered"));
      } catch (error) {
        console.log(error);
      }
    };
    handleOrders();
  }, []);

  const updateOrderPhase = async (orderId, newPhase) => {
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}`, {
        phase: newPhase,
      });
      setPendingOrder((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, phase: newPhase } : order
        )
      );
      if (newPhase === "delivered") {
        setDoneOrder((prevOrders) => [
          ...prevOrders,
          {
            ...pendingOrder.find((order) => order.id === orderId),
            phase: newPhase,
          },
        ]);
        setPendingOrder((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filterOrdersByDate = (orders) => {
    if (!selectedDate) return orders;
    return orders.filter((order) => {
      const orderDate = new Date(order.date).toISOString().split("T")[0];
      return orderDate === selectedDate;
    });
  };

  const handleShowItems = (orderItems) => {
    setItems(orderItems);
    setShowItems(true);
  };

  const handleCloseItems = () => {
    setShowItems(false);
    setItems([]);
  };

  return (
    <div className={`ml-20 max-sm:ml-0 h-full py-5 flex justify-center ${darkMode ? '*:bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="bg-white py-5 h-full px-10 flex flex-col gap-5 w-full max-w-7xl">
        <h1 className="font-bold text-2xl">Orders</h1>
        <hr />
        <div className="mb-5 flex justify-end items-center gap-2">
          <label htmlFor="order-date" className="font-bold">
            Search your previous orders by date:
          </label>
          <input
            type="date"
            id="order-date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2"
          />
        </div>
        <div className={`flex flex-col lg:flex-row gap-10 w-full ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className={`font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Pending Orders</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 `}>
              {filterOrdersByDate(pendingOrder).length > 0 ? (
                filterOrdersByDate(pendingOrder).map((order, index) => (
                  <div
                    key={index}
                    className="border p-5 rounded-lg shadow-lg bg-white"
                  >
                    <p className="font-bold text-lg mb-2">Order ID: {order.id}</p>
                    <p className="text-gray-700 mb-1">Phase: {order.phase}</p>
                    <button
                      onClick={() => handleShowItems(order.items)}
                      className="bg-blue-500 hover:bg-blue-600 p-1 text-white w-full mb-2"
                    >
                      Show Items
                    </button>
                    <h2 className="text-gray-900 mb-2">Change status:</h2>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => updateOrderPhase(order._id, "processing")}
                        className="bg-orange-200 hover:bg-orange-300 p-1 text-white w-full"
                      >
                        Processing
                      </button>
                      <button
                        onClick={() => updateOrderPhase(order._id, "cooking")}
                        className="bg-orange-300 hover:bg-orange-400 p-1 text-white w-full"
                      >
                        Cooking
                      </button>
                      <button
                        onClick={() => updateOrderPhase(order._id, "out for delivery")}
                        className="bg-orange-400 hover:bg-orange-500 p-1 text-white w-full"
                      >
                        Out for Delivery
                      </button>
                      <button
                        onClick={() => updateOrderPhase(order._id, "delivered")}
                        className="bg-green-600 hover:bg-green-700 p-1 text-white w-full"
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full text-center">
                  No Pending orders
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
          <h2 className={`font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Delivered Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filterOrdersByDate(doneOrder).map((order, index) => (
                <div key={index} className="border p-5 rounded-lg shadow-lg bg-white">
                  <p className="font-bold text-lg mb-2">Order ID: {order.id}</p>
                  <p className="text-gray-700 mb-1">Delivery: {order.date.split("T", 1)}</p>
                  <p className="text-gray-700 mb-1">Phase: {order.phase}</p>
                  <button
                    onClick={() => handleShowItems(order.items)}
                    className="bg-blue-500 hover:bg-blue-600 p-1 text-white w-full"
                  >
                    Show Items
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showItems && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseItems}
              className="bg-red-500 hover:bg-red-600 p-2 text-white mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Orders() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default Orders;