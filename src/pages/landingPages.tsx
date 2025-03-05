import { ReactSVG } from "react-svg";
import { motion } from "framer-motion";
import bar from "../assets/landing/3bar.svg";
import search from "../assets/landing/search.svg";
import profile from "../assets/landing/profile.svg";
import cart from "../assets/landing/cart.svg";
import IMAGE from "../assets/landing/IMAGE";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import LogoSlide from "../Components/Landing/slide";
import Categories from "../Components/Landing/productCategory";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../Redux/slice/menuSlice";
import { IoClose, IoSearch, IoHomeOutline } from "react-icons/io5";
import { TbBrandAirtable } from "react-icons/tb";
import { SiSalesforce } from "react-icons/si";
import { RiTShirtLine } from "react-icons/ri";
import { RootState } from "../Redux/store";
import {
  toggleCart,
  removeFromCart,
  CartItem,
  addToCart,
} from "../Redux/slice/cartSlice";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavTitle, setShowNavTitle] = useState(false);
  const [showScrollText, setShowScrollText] = useState(true);

  const menuItems = [
    { icon: <IoHomeOutline />, label: "Home" },
    { icon: <TbBrandAirtable />, label: "Brand" },
    { icon: <SiSalesforce />, label: "Sales" },
    { icon: <RiTShirtLine />, label: "Shirt" },
  ];
  const showMenu = useSelector(
    (state: RootState) => state.reducer.menu.showMenu
  );

  const showCart = useSelector(
    (state: RootState) => state.reducer.cart.cartToggle
  );
  const cartItems = useSelector(
    (state: RootState) => state.reducer.cart.cartItems
  );
  const dispatch = useDispatch();

  const handleToggleMenu = () => dispatch(toggleMenu());
  const handleToggleCart = () => dispatch(toggleCart());
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart(product));
  };

  const BestSeller: CartItem[] = [
    {
      id: 1,
      brand: "Nike",
      src: IMAGE.pc5,
      tittle: "Nike Air Force ",
      price: "$155",
      type: "cart",
    },
    {
      id: 2,
      brand: "Louis Vuitton",
      src: IMAGE.pc6,
      tittle: "Speedy P9",
      price: "$1000",
      type: "cart",
    },
    {
      id: 3,
      brand: "Hanasui",
      src: IMAGE.pc7,
      tittle: "Hanasui Ceramide",
      price: "$70",
      type: "cart",
    },
  ];

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
    <div className="">
      {/* Navigarion bar */}
      <nav className="flex items-center justify-between  py-3 px-4 fixed top-0 left-0 w-full bg-white z-10  sm:w-full ">
        {/* handle bar */}
        <ReactSVG src={bar} className="text-white" onClick={handleToggleMenu} />
        {showMenu && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[245px] h-fit bg-white shadow-md rounded-lg absolute top-[4.9rem]"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h1 className="text-lg font-bold">Menu</h1>
              <IoClose
                onClick={handleToggleMenu}
                className="cursor-pointer text-lg text-gray-500 hover:text-gray-700"
              />
            </div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-[240px] h-[33px] flex justify-between items-center bg-[#D9D9D9] rounded-full px-2 my-2"
            >
              <h1 className="text-lg font-bold">Search</h1>
              <IoSearch className="text-lg text-gray-500" />
            </motion.div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 pt-2"
            >
              {menuItems.map((item, index) => (
                <motion.li
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="flex gap-4 items-center p-4 border-b border-gray-200"
                >
                  {item.icon}
                  <h1 className="text-lg font-bold">{item.label}</h1>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
        <div className="flex gap-4 sm:hidden relative left-[-7rem]">
          <p>Home</p>
          <p>Brand</p>
          <p>Sale</p>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={showNavTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex relative left-[5rem] sm:mx-auto sm:text-center sm:text-sm sm:items-center sm:justify-center sm:relative sm:left-[1.2rem] font-medium text-lg  "
        >
          ShopiNova
        </motion.h1>
        <div className="w-[316px] h-[44px] bg-[#D9D9D9]  rounded-full flex items-center justify-between px-4 relative left-[6rem] sm:hidden">
          <p>Search ...</p>
          <ReactSVG src={search} className="w-5 h-5 " />
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
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 right-0 bg-white p-4 w-[300px] shadow-lg rounded-t-lg"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <IoClose
              onClick={handleToggleCart}
              className="cursor-pointer text-lg text-gray-500 hover:text-gray-700"
            />
          </div>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <motion.li
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                key={item.id}
                className="flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <img src={item.src} alt="" className="w-10 h-10" />
                  <h3 className="font-semibold">
                    {item.brand}
                    {item.id}
                  </h3>
                  <p className="text-gray-600 relative left-10">{item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id as number)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </ul>
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

        <div className="flex flex-wrap  justify-center">
          {BestSeller.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col justify-center  items-center w-[236px] h-[350px]"
            >
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src={item.src}
                alt={item.tittle}
                className="w-fit h-[236px]"
              />
              <div className="flex flex-col sm:relative sm:left-[-3rem] relative left-[-3rem] ">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  {item.brand}
                </motion.h1>
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                >
                  {item.tittle}
                </motion.h1>
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                >
                  {item.price}
                </motion.h1>
                <button onClick={() => handleAddToCart(item)}>Shop Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
