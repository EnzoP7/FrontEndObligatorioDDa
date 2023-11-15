import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

const CajitasDash = ({ logo, numero, titulo, ruta }) => {
  let IconoLogo = null;

  switch (logo) {
    case "shoppingBag":
      IconoLogo = <FaShoppingBag size={50} />;
      break;
    case "user":
      IconoLogo = <FaUser size={50} />;
      break;
    case "vipCrown":
      IconoLogo = <RiVipCrown2Fill size={50} />;
      break;
    case "shoppingCart":
      IconoLogo = <FaShoppingCart size={50} />;
      break;
    case "buscar":
      IconoLogo = <FaSearch size={50} />;
      break;
    case "altausuario":
      IconoLogo = <FaUserPlus size={50} />;
      break;
    case "altaProducto":
      IconoLogo = <FaBasketShopping size={50} />;
      break;
    case "altaVenta":
      IconoLogo = <FaCartPlus size={50} />;
      break;
    // Agrega más casos según sea necesario
    default:
      IconoLogo = null; // Puedes proporcionar un valor predeterminado o manejarlo de otra manera
  }
  return (
    <Link
      href={`${ruta}`}
      className="bg-base-content w-2/3 text-base-100 text-center p-5 rounded-lg text-2xl hover:scale-105 border-2 border-white cursor-pointer"
    >
      <p className="flex justify-center items-center">{IconoLogo}</p>
      <p className="pt-5 text-4xl font-bold">{numero}</p>
      <p className="pt-2">{titulo}</p>
    </Link>
  );
};

export default CajitasDash;
