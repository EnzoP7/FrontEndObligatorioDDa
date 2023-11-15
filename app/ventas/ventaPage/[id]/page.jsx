import PRODUCTOS from "@/data/productos";
import VENTAS from "@/data/ventas";
import React from "react";

import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { TbShoppingCartCog } from "react-icons/tb";
import { TbShoppingBagX } from "react-icons/tb";

const Ventapage = ({ params }) => {
  const elId = params.id;

  const ventaFiltrada = VENTAS.filter((laVenta) => laVenta.id == elId);

  const venta = ventaFiltrada[0] || null;

  const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
      const precioProducto =
        PRODUCTOS.find((p) => p.id === producto.productoId)?.precio || 0;
      return total + precioProducto * producto.cantidad;
    }, 0);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-6xl">Informacion de la Venta</h1>
        </div>

        <div className="mt-20 mb-10 flex justify-center gap-40 text-black">
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaBasketShopping size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">ID: {venta.id} </span>
            </h1>
          </div>
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaBasketShopping size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">
                Productos:{" "}
                {venta.productos.map(
                  (producto) => ` ID: ${producto.productoId}`
                )}{" "}
              </span>
            </h1>
          </div>

          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaCalendarAlt size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold "> {venta.fecha} </span>
            </h1>
          </div>

          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaUser size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">
                {" "}
                Cliente ID: {venta.clienteId}{" "}
              </span>
            </h1>
          </div>
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaMoneyBillWave size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">
                {" "}
                TOTAL: $ {calcularTotal(venta.productos)}{" "}
              </span>
            </h1>
          </div>
        </div>

        <div className="m-20 flex items-center justify-center gap-60 text-black">
          <div className="bg-orange-300 p-5 rounded-lg hover:scale-105 cursor-pointer">
            <p className="flex justify-center items-center mb-5">
              <TbShoppingCartCog size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">Modificar</span>
            </h1>
          </div>

          <div className="bg-red-600 p-5 rounded-lg hover:scale-105 cursor-pointer">
            <p className="flex justify-center items-center mb-5">
              <TbShoppingBagX size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">Eliminar</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ventapage;
