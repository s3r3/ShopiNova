import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import IMAGE from "../../assets/landing/IMAGE";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";

const LogoSlide = () => {
  const breakpoints = {
    320: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 10,
      Autoplay,
    },
  };

  const logos = [
    { id: 1, src: IMAGE.lg1 },
    { id: 2, src: IMAGE.lg2 },
    { id: 3, src: IMAGE.lg3 },
    { id: 4, src: IMAGE.lg4 },
    { id: 5, src: IMAGE.lg5 },
    { id: 6, src: IMAGE.lg6 },
  ];

  return (
    <div className="w-full">
      <Swiper
        breakpoints={breakpoints}
        loop={false}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-32 sm:h-[80px]"
      >
        {logos.map((logo) => (
          <SwiperSlide
            key={logo.id}
            className="flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <img src={logo.src} className="h-16 sm:h-10 sm:w-10 w-16 object-cover" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoSlide;
