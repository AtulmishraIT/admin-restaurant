import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from '../context/DarkModeContext';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetchUsers");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`ml-20 max-sm:ml-0 h-screen py-5 flex flex-col items-center ${darkMode ? '*:bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`bg-white ${darkMode ? 'bg-gray-700 text-gray-700' : 'bg-white text-gray-900'} py-5 h-full px-10 w-full max-w-7xl`}>
        <h1 className={`font-bold text-2xl mb-5 ${darkMode && 'text-gray-50'}`}>Users</h1>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 w-full max-w-md"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((item, index) => (
            <div key={index} className="border p-5 rounded-lg shadow-lg bg-white">
              <div className="flex items-center gap-2 mb-3">
                <box-icon type="solid" name="user" color="gray"></box-icon>
                <p className="font-bold text-lg">{item.name}</p>
              </div>
              <p className="text-gray-700 mb-1"><strong>Email:</strong> {item.email}</p>
              <p className="text-gray-700"><strong>Mobile:</strong> {item.mobno}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;