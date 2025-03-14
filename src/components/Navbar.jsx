import React, { useState } from 'react';
import 'boxicons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const [isManage, setIsManage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setIsManage(false);
  };

  const handleManage = () => {
    setIsOpen(true);
    setIsManage(!isManage);
  };

  return (
    <motion.div
      initial={{ width: '5rem' }}
      animate={{ width: isOpen ? '16rem' : '5rem' }}
      transition={{ duration: 0.3 }}
      className={`fixed bg-green-700 text-white p-4 h-full transition-width duration-300 ${isOpen ? 'max-sm:bg-green-700' : 'max-sm:bg-transparent'}`}
    >
      <div className={`${isOpen ? 'flex justify-end items-end' : 'flex justify-center items-center'}`}>
        <p className={`cursor-pointer ${isOpen ? "" : "max-sm:fixed right-5 top-3"}`} onClick={handleOpen}>
          {isOpen ? <div className="flex justify-end items-center text-xl"><p>Admin</p><box-icon size='30px' color='white' name='x'></box-icon></div> : <div className='max-sm:bg-gray-500 flex justify-center items-center px-1 py-1'><box-icon size='30px' color='white' name='menu'></box-icon></div>}
        </p>
      </div>
      {isOpen ? (
        <div className="py-10 max-sm:absolute ">
          <h1 className="text-2xl flex justify-start items-center gap-1 mb-5">
            <box-icon type="solid" color="white" size="35px" name="dashboard"></box-icon>
            Dashboard
          </h1>
          <hr />
          <div className="flex justify-start items-start py-2">
            <ul className="flex flex-col justify-start items-start px-2 w-full">
              <li className="w-full">
                <Link
                  to="/"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name="home"></box-icon>Home
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={handleManage}
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='food-menu'></box-icon>Manage
                </button>
                {isManage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="pl-3"
                  >
                    <li className="w-full">
                      <Link
                        to="/add"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='plus-circle'></box-icon>Add Foods
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/delete"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='minus-circle'></box-icon>Delete Foods
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/update"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='right-arrow-circle'></box-icon>Update Foods
                      </Link>
                    </li>
                  </motion.div>
                )}
              </li>
              <li className="w-full">
                <Link
                  to="/users"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" type='solid' name='user'></box-icon>Users
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/orders"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='package'></box-icon>Orders
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/setting"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='cog' type='solid'></box-icon>Settings
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/logout"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='log-out'></box-icon>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="py-10 max-sm:hidden">
          <h1 className="text-2xl flex justify-start items-center gap-1 mb-5 px-3 w-fit">
            <box-icon color="white" type="solid" size="35px" name="dashboard"></box-icon>
          </h1>
          <hr />
          <div className="flex justify-start items-start py-2 w-fit">
            <ul className="flex flex-col justify-start items-start w-fit">
              <li className="w-full">
                <Link
                  to="/"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-fit"
                >
                  <box-icon color="white" name="home"></box-icon>
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={handleManage}
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='food-menu'></box-icon>
                </button>
                {isManage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="pl-3"
                  >
                    <li className="w-full">
                      <Link
                        to="/add"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='plus-circle'></box-icon>
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/delete"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='minus-circle'></box-icon>
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/update"
                        className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                      >
                        <box-icon color="white" name='right-arrow-circle'></box-icon>
                      </Link>
                    </li>
                  </motion.div>
                )}
              </li>
              <li className="w-full">
                <Link
                  to="/users"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" type='solid' name='user'></box-icon>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/orders"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='package'></box-icon>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/setting"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='cog' type='solid'></box-icon>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/logout"
                  className="flex items-center justify-start gap-1 py-5 pr-5 pl-5 hover:bg-green-600 w-full"
                >
                  <box-icon color="white" name='log-out'></box-icon>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;