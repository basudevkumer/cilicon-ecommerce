import { FaArrowRightLong } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FaRedditAlien } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { FiHeadphones } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { FaPhoneVolume } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { GrTrophy } from "react-icons/gr";
import { BsWalletFill } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { IoStarHalfOutline } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { FaRegWindowRestore } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";

import {
  RiShieldCheckLine,
  RiTruckLine,
  RiMoneyDollarCircleLine,
  RiCustomerService2Line,
  RiSecurePaymentLine,
} from "react-icons/ri";

export const allIcons = {
  rightArrow: <FaArrowRightLong />,
  fellowIcon: [
    { id: 1, icon: <FaTwitter /> },
    { id: 2, icon: <FaFacebook /> },
    { id: 3, icon: <FaPinterestP /> },
    { id: 4, icon: <FaRedditAlien /> },
    { id: 5, icon: <IoLogoYoutube /> },
    { id: 6, icon: <FaSquareInstagram /> },
  ],
  searchIcon: <FiSearch />,
  navMiddleIcon: [
    {
      id: 1,
      icon: <MdOutlineShoppingCart />,
      to: "/shopCart",
      itemName: "shopCart",
    },
    { id: 2, icon: <FaRegHeart />, to: "/wishlist", itemName: "wishlist" },
    { id: 3, icon: <AiOutlineUser />, to: "/login", itemName: "account" },
  ],
  allItemsIcon: [
    { id: 1, icon: <IoLocationOutline /> },
    { id: 2, icon: <PiArrowsCounterClockwise /> },
    { id: 3, icon: <FiHeadphones /> },
    { id: 4, icon: <GoInfo /> },
    { id: 5, icon: <FaPhoneVolume /> },
  ],
  featureIcon: [
    { id: 1, icon: <BsBoxSeam /> },
    { id: 2, icon: <GrTrophy /> },
    { id: 3, icon: <BsWalletFill /> },
    { id: 4, icon: <FiHeadphones /> },
  ],
  arrowIcon: [
    { id: 1, icon: <FaArrowLeftLong /> },
    { id: 2, icon: <FaArrowRightLong /> },
  ],

  starIcon: [
    { id: 1, icon: <IoStar /> },
    { id: 2, icon: <IoStarHalfOutline /> },
    { id: 3, icon: <IoStarOutline /> },
  ],
  homeIcon: <IoHomeOutline />,
  greaterThan: <FaGreaterThan />,
  searchIcon: <IoSearchOutline />,

  productInfoActivites: [
    { id: 1, icon: <MdOutlineShoppingCart />, to: "/shopping-card" },
    { id: 2, icon: <FaRegHeart />, to: "/wishlist" },
    { id: 3, icon: <FaEye />, to: (id) => `/product-details/${id}` },
  ],
  compareIcon: <FaCodeCompare />,
  detailPageIcon: [
    { id: 1, icon: <FaRegWindowRestore /> },
    { id: 2, icon: <FaFacebook /> },
    { id: 3, icon: <FaTwitter /> },
    { id: 4, icon: <FaPinterestP /> },
  ],
  productFeatures: [
    {
      id: 1,
      icon: <RiShieldCheckLine />,
      title: "Free 1 Year Warranty",
    },
    {
      id: 2,
      icon: <RiTruckLine />,
      title: "Free Shipping & Fasted Delivery",
    },
    {
      id: 3,
      icon: <RiMoneyDollarCircleLine />,
      title: "100% Money-back guarantee",
    },
    {
      id: 4,
      icon: <RiCustomerService2Line />,
      title: "24/7 Customer support",
    },
    {
      id: 5,
      icon: <RiSecurePaymentLine />,
      title: "Secure payment method",
    },
  ],
  appleIcon: <FaApple />,
  close: <IoMdCloseCircleOutline />,
  plainClose: <IoClose />,
  chevron: [
    { id: 1, icon: <FaChevronDown /> },
    { id: 2, icon: <FaChevronUp /> },
    { id: 3, icon: <FaChevronRight /> },
  ],
  checkmark: <FaRegCheckCircle />,
  layer: <FiLayers />,
};
