import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import IMAGE from "../../assets/landing/IMAGE";
import { CartItem,addToCart } from "../../Redux/slice/cartSlice";
import { useDispatch } from "react-redux";

export default function Categories() {
  const categories:CartItem[] = [
    { id: "Shoe", src: IMAGE.pc8, type:'category' },
    { id: "Wear", src: IMAGE.pc2, whiteText: true,type:'category'  },
    { id: "Bag", src: IMAGE.pc3, whiteText: true,type:'category'  },
    { id: "SkinCare", src: IMAGE.pc4, whiteText: true, type:'category'  },
    { id: "Furniture", src: IMAGE.pc9, whiteText: true,type:'category'  },
  ] ;
  const dispatch = useDispatch();
  const handleAddToCart = (product:CartItem)=>{
      dispatch(addToCart(product))
    }

  return (
    <>
      <Swiper
        slidesPerView="auto"
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          100: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className=""
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center justify-center border-gray-200 rounded-lg hover:shadow-lg w-full h-full"
            >
              <img
                src={category.src}
                
                className="w-full h-object-cover h-[25rem] sm:h-[15rem]"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center justify-center relative top-[-4.9rem]"
              >
                <h2
                  className={`text-md font-bold mt-2 ${
                    category.whiteText ? "text-white" : "text-black"
                  }`}
                >
                  {category.id}
                </h2>
                <button className="w-[157px] h-[30px] bg-black rounded-full text-white mt-2" onClick={()=>handleAddToCart(category)}>
                  Shop Now
                </button>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}