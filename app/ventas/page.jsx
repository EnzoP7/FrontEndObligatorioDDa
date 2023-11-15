"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VENTAS from "@/data/ventas";
import PRODUCTOS from "@/data/productos";

const Ventaspage = () => {
  const router = useRouter();

  const [Filtro, setFiltro] = useState("todos");
  const [busquedaFecha, setBusquedaFecha] = useState("");

  const filtrarVentas = () => {
    switch (Filtro) {
      case "todos":
        return VENTAS;

      case "fecha":
        return VENTAS.filter((venta) => {
          const ventaFechaString = venta.fecha.toString().toLowerCase();
          console.log("VENTAS FECHA: ", ventaFechaString);
          const busquedaFechaString = busquedaFecha.toLowerCase();
          console.log("EL FILTRO: ", busquedaFechaString);
          return ventaFechaString === busquedaFechaString;
        });

      default:
        return VENTAS;
    }
  };

  const ventasFiltradas = filtrarVentas();

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
        <h1 className="text-7xl font-semibold m-10">Ventas</h1>
        <div className="flex pb-5 gap-5 px-10">
          {/* ... (botones de filtro existentes) ... */}
          <input
            type="date"
            placeholder="Buscar por fecha"
            value={busquedaFecha}
            onChange={(e) => setBusquedaFecha(e.target.value)}
            className="p-3 rounded-xl border-2 border-white bg-base-content  text-black placeholder:text-gray-800"
          />
          <button
            className="p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("fecha")}
          >
            Buscar
          </button>

          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("todos")}
          >
            Ver Todas
          </button>
        </div>

        <div className="p-3">
          <table className="min-w-full border border-gray-300">
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
              {ventasFiltradas.map((venta) => (
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
                  <td className="border p-4">
                    <div className="flex justify-between">
                      <button
                        className="bg-base-300 text-white p-3 rounded-lg"
                        onClick={() =>
                          router.push(`/ventas/ventaPage/${venta.id}`)
                        }
                      >
                        Ver Venta
                      </button>

                      <button className="bg-orange-700 text-white p-3 rounded-lg">
                        Editar
                      </button>
                      <button className="bg-red-700 text-white p-3 rounded-lg">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ventaspage;
