// src/pages/text.tsx
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../Redux/slice/menuSlice";
import { IoClose, IoSearch, IoHomeOutline } from "react-icons/io5";
import { TbBrandAirtable } from "react-icons/tb";
import { SiSalesforce } from "react-icons/si";
import { RiTShirtLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { RootState } from "../Redux/store";

const menuItems = [
  { icon: <IoHomeOutline />, label: "Home" },
  { icon: <TbBrandAirtable />, label: "Brand" },
  { icon: <SiSalesforce />, label: "Sales" },
  { icon: <RiTShirtLine />, label: "Shirt" },
];

const Tata = () => {
  const showMenu = useSelector((state:RootState) => state.menu.showMenu);
  const dispatch = useDispatch();

  const handleToggleMenu = () => dispatch(toggleMenu());

  return (
    <div className="p-2">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleToggleMenu}
      >
        Toggle Menu
      </button>
      {showMenu && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[245px] h-fit bg-white shadow-md rounded-lg"
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
    </div>
  );
};

export default Tata;