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

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavTitle, setShowNavTitle] = useState(false);
  const [showScrollText, setShowScrollText] = useState(true);

  const BestSeller = [
    {
      id: 1,
      brand: "Nike",
      src: IMAGE.pc5,
      tittle: "Nike Air Force ",
      price: "$155",
    },
    {
      id: 2,
      brand: "Louis Vuitton",
      src: IMAGE.pc6,
      tittle: "Speedy P9",
      price: "$1000",
    },
    {
      id: 3,
      brand: "Hanasui",
      src: IMAGE.pc7,
      tittle: "Hanasui Ceramide",
      price: "$70",
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
      <nav className="flex items-center justify-between  py-3 px-4 fixed top-0 left-0 w-full bg-white z-10  sm:w-full ">
        <ReactSVG src={bar} className="text-white" />
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
          <ReactSVG src={cart} className="w-5 h-5" />
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex items-center justify-between  ">
        <img src={IMAGE.pc1} alt="" className="sm:w-full sm:h-[] " />
        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={
            showNavTitle ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-[7rem] w-full h-fit flex items-center justify-center sm:text-[2rem] font-bold text-white absolute "
        >
          SN
        </motion.h1>
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={
            showScrollText ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2, repeat: 1 }}
          className=" absolute w-full h-fit flex items-center flex-col justify-center text-white bottom-3 animate-bounce sm:top-[10rem]"
        >
          <h1 className="text-xl sm:text-[8px] font-bold underline  ">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
