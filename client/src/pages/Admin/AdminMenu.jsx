import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuButtonVariants = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    };

    const menuVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "100%" },
    };

    const menuItemVariants = {
        open: { opacity: 1, x: 0, delay: 0.6 },
        closed: { opacity: 0, x: "100%", delay: 0.2 },
    };

    return (
        <>
            <motion.button
                className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"
                    } bg-gray-900 p-[0.3rem] fixed rounded-lg`}
                onClick={toggleMenu}
                variants={menuButtonVariants}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
            >
                {isMenuOpen ? (
                    <FaTimes color="white" />
                ) : (
                    <motion.div
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 },
                        }}
                        animate={isMenuOpen ? "open" : "closed"}
                        transition={{ duration: 0.3 }}
                    >
                        <IoMenu size={24} color="white" />
                    </motion.div>
                )}
            </motion.button>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.section
                        className="bg-gray-900 p-3 fixed right-7 top-5 rounded-md shadow-lg"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <motion.ul
                            className="list-none mt-2"
                            variants={menuItemVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/dashboard"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    Admin Dashboard
                                </NavLink>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/categorylist"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    Create Category
                                </NavLink>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/productlist"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    Create Product
                                </NavLink>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/allproductslist"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    All Products
                                </NavLink>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/userlist"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    Manage Users
                                </NavLink>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <NavLink
                                    className="block py-2 px-3 mb-5 hover:bg-[#272636] rounded-md transition-colors duration-300"
                                    to="/admin/orderlist"
                                    style={({ isActive }) => ({
                                        color: isActive ? "greenyellow" : "white",
                                    })}
                                >
                                    Manage Orders
                                </NavLink>
                            </motion.li>
                        </motion.ul>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminMenu;