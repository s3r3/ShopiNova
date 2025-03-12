import { useDispatch } from "react-redux";
import { BestSeller } from "../../Data/landing-data";
import { addToCart,CartItem } from "../../Redux/slice/cartSlice";
import { motion } from "motion/react";

export const BestSellerD = () => {
    const dispatch = useDispatch()
    const handleAddToCart = (product: CartItem) => {
        dispatch(addToCart(product));
      };
  return (
    <div className="flex justify-end sm:justify-center sm:flex-wrap gap-4">
      {BestSeller.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-md w-[250px]   flex flex-col justify-center items-center"
        >
          <img
            src={item.src}
            alt=""
            className="w-full h-64 object-cover rounded-lg"
          />
          <h1 className="text-lg font-bold text-gray-700 mt-4">{item.brand}</h1>
          <h1 className="text-lg font-bold text-gray-700">{item.tittle}</h1>
          <h1 className="text-lg font-bold text-gray-700">{item.price}</h1>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mt-4 mb-3"
          >
            Shop Now
          </button>
        </motion.div>
      ))}
    </div>
  );
};
