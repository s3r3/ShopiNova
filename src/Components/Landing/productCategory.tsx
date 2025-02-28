import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import IMAGE from "../../assets/landing/IMAGE";

export default function Categories() {
  const categories = [
    { id: "Shoe", src: IMAGE.pc8 },
    { id: "Wear", src: IMAGE.pc2, whiteText: true },
    { id: "Bag", src: IMAGE.pc3, whiteText: true },
    { id: "SkinCare", src: IMAGE.pc4, whiteText: true },
    { id: "Furniture", src: IMAGE.pc9, whiteText: true },
  ];

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex flex-col items-center justify-center border-gray-200 rounded-lg hover:shadow-lg w-full h-full"
            >
              <img
                src={category.src}
                alt={category.id}
                className="w-full h-object-cover h-[25rem]"
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
                <button className="w-[157px] h-[30px] bg-black rounded-full text-white mt-2">
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