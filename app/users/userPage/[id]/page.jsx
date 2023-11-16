"use client";

import React from "react";
import CLIENTES from "@/data/clientes";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserClock,
  FaUserCog,
  FaUserMinus,
} from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import VENTAS from "@/data/ventas";
import PRODUCTOS from "@/data/productos";
import { useRouter } from "next/navigation";

const UsuarioPage = ({ params }) => {
  const router = useRouter();

  const elId = params.id;
  const clienteFiltrado = CLIENTES.filter((elCliente) => elCliente.id == elId);
  const cliente = clienteFiltrado[0] || null;
  const ventasAlCliente = VENTAS.filter((laVenta) => laVenta.clienteId == elId);

  const buscarProducto = (productoId) => {
    const elProductoFiltrado = PRODUCTOS.find(
      (elProducto) => elProducto.id === productoId
    );
    const elProducto = elProductoFiltrado?.nombre || "no se encontró";
    return elProducto;
  };

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
          <h1 className="text-6xl">Informacion del Cliente</h1>
        </div>

        {!cliente.estado ? (
          <div className="flex justify-center items-center pt-2">
            <h1 className="text-red-600">Este Usuario esta dado de BAJA </h1>
          </div>
        ) : (
          ""
        )}
        <div className="m-20 flex justify-between text-black">
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaUser size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold "> {cliente.nombre} </span>
            </h1>
          </div>

          {cliente.vip ? (
            <div className="bg-base-content p-5 rounded-lg">
              <p className="flex justify-center items-center mb-5">
                <RiVipCrown2Fill size={50} />
              </p>
              <h1 className="text-3xl">
                Cliente VIP
                <span className="font-semibold underline"></span>
              </h1>
            </div>
          ) : (
            <div className="bg-base-content p-5 rounded-lg">
              <p className="flex justify-center items-center mb-5">
                <FaUserClock size={60} />
              </p>
              <h1 className="text-3xl">
                Cliente Regular
                <span className="font-semibold "></span>
              </h1>
            </div>
          )}

          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaPhoneAlt size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold "> {cliente.telefono} </span>
            </h1>
          </div>
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaMapMarkerAlt size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold "> {cliente.direccion} </span>
            </h1>
          </div>
        </div>

        {cliente.estado ? (
          <>
            <div className="m-20 flex items-center justify-center gap-60 text-black">
              <div
                className="bg-orange-300 p-5 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/users/editUser/${cliente.id}`)}
              >
                <p className="flex justify-center items-center mb-5">
                  <FaUserCog size={50} />
                </p>
                <h1 className="text-3xl">
                  <span className="font-semibold ">Modificar</span>
                </h1>
              </div>
              {!cliente.vip ? (
                <div className="bg-yellow-400 p-5 rounded-lg hover:scale-105 cursor-pointer">
                  <p className="flex justify-center items-center mb-5">
                    <RiVipCrown2Fill size={50} />
                  </p>
                  <h1 className="text-3xl text-center">
                    <span className="font-semibold ">Transformar a VIP</span>
                  </h1>
                </div>
              ) : (
                ""
              )}
              <div className="bg-red-600 p-5 rounded-lg hover:scale-105 cursor-pointer">
                <p className="flex justify-center items-center mb-5">
                  <FaUserMinus size={50} />
                </p>
                <h1 className="text-3xl">
                  <span className="font-semibold ">Eliminar</span>
                </h1>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="flex items-center justify-center">
          <h1 className="text-6xl">Historial de Compras</h1>
        </div>

        {ventasAlCliente.length > 0 ? (
          <div className="flex items-center justify-center">
            <div className="pt-5 mb-16">
              <table>
                <thead>
                  <tr>
                    <th className="border p-4">ID</th>
                    <th className="border p-4">Productos</th>
                    <th className="border p-4">Fecha</th>
                    <th className="border p-4">Id Cliente</th>
                    <th className="border p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasAlCliente.map((venta) => (
                    <tr key={venta.id}>
                      <td className="border p-4">{venta.id}</td>
                      <td className="border p-4">
                        <ul>
                          {venta.productos.map((producto) => (
                            <li key={producto.productoId}>
                              {`Producto: ${buscarProducto(
                                producto.productoId
                              )} Cantidad: ${producto.cantidad}`}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border p-4">{venta.fecha}</td>
                      <td className="border p-4">{venta.clienteId}</td>
                      <td className="border p-4">
                        ${calcularTotal(venta.productos)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center pt-10 text-2xl font-bold">
            <h1>No se Encontraron Compras</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UsuarioPage;