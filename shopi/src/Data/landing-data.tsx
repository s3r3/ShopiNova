import { IoHomeOutline } from "react-icons/io5";
import { TbBrandAirtable } from "react-icons/tb";
import { SiSalesforce } from "react-icons/si";
import { RiTShirtLine } from "react-icons/ri";
import IMAGE from "../assets/landing/IMAGE";
import { CartItem } from "../Redux/slice/cartSlice";
export const menuItems = [
  { icon: <IoHomeOutline />, label: "Home" },
  { icon: <TbBrandAirtable />, label: "Brand" },
  { icon: <SiSalesforce />, label: "Sales" },
  { icon: <RiTShirtLine />, label: "Shirt" },
];
export const BestSeller: CartItem[] = [
  {
    id: 1,
    brand: "Nike",
    src: IMAGE.pc5,
    tittle: "Nike Air Force ",
    price: "$155",
    type: "cart",
    quantity: 1,
  },
  {
    id: 2,
    brand: "Louis Vuitton",
    src: IMAGE.pc6,
    tittle: "Speedy P9",
    price: "$1000",
    type: "cart",
    quantity: 1,
  },
  {
    id: 3,
    brand: "Hanasui",
    src: IMAGE.pc7,
    tittle: "Hanasui Ceramide",
    price: "$70",
    type: "cart",
    quantity: 1,
  },
];
