import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd, AiOutlineShoppingCart, } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    // eslint-disable-next-line no-unused-vars
    const [showSidebar, setShowSidebar] = useState(false);

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"
                } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-3 text-white bg-gray-900 w-[4%] hover:w-[15%] h-[100vh]  fixed `}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>

                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>

                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                    </div>

                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>


                <Link to="/favorite" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                        <FaRegHeart className="mt-[3rem] mr-2 ml-1" size={20} />
                        <span className="hidden nav-item-name mt-[3rem]">
                            Favorites
                        </span>{" "}
                        <FavoritesCount />
                    </div>
                </Link>
            </div>

            <div className="relative">

                {userInfo && userInfo.isAdmin && (
                    <ul className="mr-2">
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <MdOutlineSpaceDashboard className="mr-2 mt-[4px]" size={26} />
                                <span className="hidden nav-item-name">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/productlist"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <CiViewList size={26} />
                                <span className="hidden ml-2 nav-item-name">Add Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/categorylist"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <BiCategory size={26} />
                                <span className="hidden ml-2 nav-item-name">Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/orderlist"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <GrCart size={26} />
                                <span className="hidden ml-2 nav-item-name">Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/userlist"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <FiUsers size={26} />
                                <span className="hidden ml-2 nav-item-name">Users</span>
                            </Link>
                        </li>
                    </ul>
                )}


                {userInfo ? (
                    <ul className="mt-4">
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <CgProfile size={26} />
                                <span className="hidden ml-2 text-lg font-semibold nav-item-name">{userInfo.username}</span>
                            </Link>
                        </li>

                        <li>
                            <button
                                onClick={logoutHandler}
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <AiOutlineLogout className="mr-2 mt-[4px]" size={26} />
                                <span className="hidden mt-1 nav-item-name">Log out</span>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <></>
                )}


                {!userInfo && (
                    <ul>
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                                <span className="hidden nav-item-name">LOGIN</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                            >
                                <AiOutlineUserAdd size={26} />
                                <span className="hidden nav-item-name">REGISTER</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Navigation;
