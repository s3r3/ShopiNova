import { ReactSVG } from "react-svg";
import { motion } from "framer-motion";
import bar from "../assets/landing/3bar.svg";
import profile from "../assets/landing/profile.svg";
import cart from "../assets/landing/cart.svg";
import IMAGE from "../assets/landing/IMAGE";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import LogoSlide from "../Components/Landing/slide";
import { FaRegTrashAlt } from "react-icons/fa";
import Categories from "../Components/Landing/productCategory";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../Redux/slice/menuSlice";
import { IoClose, IoSearch } from "react-icons/io5";
import { menuItems } from "../Data/landing-data";
import { RootState } from "../Redux/store";
import { BestSellerD } from "../Components/Landing/bestSeller";
import { Link } from "react-router-dom";
import {
  toggleCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../Redux/slice/cartSlice";
import useOutsideClick from "../hooks/useOutsideClick";
import ThemeSwitch from "../Components/themeSwitch";

const LandingPage = () => {
  //State
  const [scrollY, setScrollY] = useState(0);
  const [showNavTitle, setShowNavTitle] = useState(false);
  const [showScrollText, setShowScrollText] = useState(true);
  //Hook
  const ref = useOutsideClick(() => {
    handleToggleMenu();
  });
  const refCart = useOutsideClick(() => {
    handleToggleCart();
  });
  //Redux
  const showMenu = useSelector(
    (state: RootState) => state.reducer.menu.showMenu
  );

  const showCart = useSelector(
    (state: RootState) => state.reducer.cart.cartToggle
  );
  const cartItems = useSelector(
    (state: RootState) => state.reducer.cart.cartItems
  );
  //Redux Dispatch
  const dispatch = useDispatch();
  const handleToggleMenu = () => dispatch(toggleMenu());
  const handleToggleCart = () => dispatch(toggleCart());
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleDecrement = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };
  const handleIncrement = (itemId: number) => {
    dispatch(incrementQuantity(itemId));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 200) {
      setShowNavTitle(true);
      setShowScrollText(false);
    } else {
      setShowNavTitle(false);
      setShowScrollText(true);
    }
  }, [scrollY]);

  return (
    <div>
      {/* Navigarion bar */}

      <nav className="flex items-center justify-between  py-3 px-4 fixed top-0 left-0 w-full bg-white z-10  sm:w-full ">
        {/* handle bar */}
        <ReactSVG src={bar} className="text-white" onClick={handleToggleMenu} />

        {showMenu && (
          <motion.div
            ref={ref}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[245px] h-fit bg-white shadow-md rounded-lg absolute top-[4.9rem] flex flex-col justify-center"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
              <h1 className="text-lg font-bold">Menu</h1>
              <IoClose
                onClick={handleToggleMenu}
                className="cursor-pointer text-lg text-gray-500 hover:text-gray-700"
              />
            </div>
            <div className="w-full h-fit flex justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-[220px] h-[33px] flex justify-between items-center bg-[#D9D9D9] rounded-full p-3  mt-2"
              >
                <input
                  type="text"
                  className="text-sm border-none bg-transparent outline-none "
                  placeholder="Search..."
                />

                <IoSearch className="text-lg text-gray-500" />
              </motion.div>
            </div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 pt-2"
            >
              {menuItems.map((item, index) => (
                <motion.li
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="flex gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-100 hover:text-red-500 hover:shadow-md cursor-pointer"
                >
                  {item.icon}
                  <h1 className="text-lg font-bold">{item.label}</h1>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-4 sm:hidden relative left-[-7rem] cursor-pointer"
        >
          <motion.p
            whileHover={{ color: "#FF3737" }}
            transition={{ duration: 0.2 }}
            className="hover:scale-110"
          >
            Home
          </motion.p>
          <motion.p
            whileHover={{ color: "#FF3737" }}
            transition={{ duration: 0.2 }}
            className="hover:scale-110"
          >
            Brand
          </motion.p>
          <motion.p
            whileHover={{ color: "#FF3737" }}
            transition={{ duration: 0.2 }}
            className="hover:scale-110"
          >
            Sale
          </motion.p>
        </motion.div>

        <motion.img
          src={IMAGE.logo}
          alt=""
          initial={{ opacity: 0, y: 20 }}
          animate={showNavTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex relative left-[5rem] sm:mx-auto sm:text-center sm:w-[6rem] sm:items-center sm:justify-center sm:relative sm:left-[1.2rem] font-medium text-lg  w-[10rem] h-fit "
        />
        <div className="w-[316px] h-[44px] bg-[#D9D9D9]  rounded-full flex items-center justify-between px-4 relative left-[6rem] sm:hidden                               ">
          <input
            type="text"
            className="bg-transparent border-none outline-none"
            placeholder="Search..........."
          />

          <IoSearch />
        </div>
        <div className="flex gap-4">
          <ReactSVG src={profile} className="w-5 h-5" />
          <ReactSVG src={cart} className="w-5 h-5" onClick={handleToggleCart} />

          {cartItems.length > 0 && (
            <span className="relative bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] right-6 bottom-1">
              {cartItems.length}
            </span>
          )}
        </div>
      </nav>
      {/* tampilkan cart  */}

      {showCart && (
        <motion.div
          ref={refCart}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed z-[9999] top-20 right-10 bg-white p-4 w-[28rem] shadow-lg rounded-lg sm:w-full sm:right-0 flex flex-col " 
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <IoClose
              onClick={handleToggleCart}
              className="cursor-pointer text-lg text-gray-500 hover:text-gray-700 transition duration-200"
            />
          </div>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: -100, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                key={item.id}
                className="flex justify-between items-center py-2 px-4 border-b border-gray-200 "
              >
                <div className="flex items-center sm:w-full gap-4 ">
                  <img src={item.src} alt="" className="w-16 h-16 rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-md pr-4 pl-1 w-[9rem]">
                      {item.brand}
                    </h3>
                    <div className="flex items-center gap-4 w-[10rem] h-fit justify-start ">
                      <button
                        onClick={() => handleDecrement(Number(item.id))}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition duration-200 p-2 rounded-full w-2 h-2 flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <p className="text-md font-bold">{item.quantity}</p>
                      <button
                        onClick={() => handleIncrement(Number(item.id))}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition duration-200 p-2 rounded-full w-2 h-2 text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                      <FaRegTrashAlt
                        onClick={() => handleRemoveFromCart(item.id as number)}
                        className="hover:text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="w-full h-fit flex justify-end">{item.price}</h1>
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <div className="flex text-sm gap-4">
              <h1>Add Order Rate</h1>
              <h1>Shipping & Taxes</h1>
              <h1>Calculated at CheckOut</h1>
            </div>
            <div>l
              <h1>SubTotal</h1>
              
            </div>
          </div>
          <Link to="/checkout">
          <button className="w-[12rem] h-[2rem] rounded-full border bottom-1 border-black relative left-[7rem]">CheckOut </button></Link>
          
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="flex items-center justify-between  ">
        <img
          src={IMAGE.pc1}
          alt=""
          className="sm:w-full sm:h-svh sm:object-cover "
        />
        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={
            showNavTitle ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-[7rem] w-full h-fit flex items-center justify-center sm:text-[4rem] font-bold text-white absolute "
        >
          SN
        </motion.h1>
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={
            showScrollText ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2, repeat: 1 }}
          className=" absolute w-full h-fit flex items-center flex-col justify-center text-white bottom-3 animate-bounce sm:top-[23rem]"
        >
          <h1 className="text-xl sm:text-[12px] font-bold underline  ">
            Scroll For More Product
          </h1>
          <IoIosArrowDown />
        </motion.div>
      </section>

      {/* Logo slide Section */}
      <section className="pt-10">
        <LogoSlide />
      </section>

      {/* Product Section */}
      <div className="flex justify-center pb-5">
        <h1 className="text-xl font-bold uppercase sm:text-sm ">
          Product Categories
        </h1>
      </div>
      <div>
        <Categories />
      </div>

      {/* Best seller section */}
      <div className=" flex flex-col justify-center items-center gap-2 pt-10">
        <h1 className="text-xl font-bold uppercase">Best Seller</h1>
        <BestSellerD />
      </div>
      <ThemeSwitch />
    </div>
  );
};

export default LandingPage;
