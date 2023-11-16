"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PRODUCTOS from "@/data/productos";

const Productspage = () => {
  const router = useRouter();

  const [Filtro, setFiltro] = useState("todos");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaCantidad, setBusquedaCantidad] = useState("");

  const filtrarProductos = () => {
    switch (Filtro) {
      case "todos":
        return PRODUCTOS;
      case "hay":
        return PRODUCTOS.filter(
          (producto) => producto.cantidadEnStock > 0 && producto.estado
        );
      case "nohay":
        return PRODUCTOS.filter((producto) => producto.cantidadEnStock == 0);
      case "debaja":
        return PRODUCTOS.filter((producto) => !producto.estado);

      case "nombre":
        return PRODUCTOS.filter((producto) => {
          console.log(busquedaNombre);
          return producto.nombre
            .toLowerCase()
            .includes(busquedaNombre.toLowerCase());
        });

      case "cantidad":
        return PRODUCTOS.filter((producto) => {
          console.log(busquedaNombre);
          return producto.cantidadEnStock < busquedaCantidad;
        });
      default:
        return PRODUCTOS;
    }
  };

  const productosFiltrados = filtrarProductos();

  function limitarPalabras(texto, limite) {
    const palabras = texto.split(" ");
    const palabrasLimitadas = palabras.slice(0, limite);
    const resultado = palabrasLimitadas.join(" ");

    if (palabras.length > limite) {
      return resultado + "...";
    } else {
      return resultado;
    }
  }

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10">Productos</h1>
        <div className="flex pb-5 gap-5 px-10">
          {/* ... (botones de filtro existentes) ... */}
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busquedaNombre}
            onChange={(e) => setBusquedaNombre(e.target.value)}
            className="p-3 rounded-xl border-2 border-white bg-base-content  text-black placeholder:text-gray-800"
          />
          <button
            className="p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("nombre")}
          >
            Buscar
          </button>

          <input
            type="text"
            placeholder="Buscar por Cantidad de Stock"
            value={busquedaCantidad}
            onChange={(e) => setBusquedaCantidad(e.target.value)}
            className="p-3 rounded-xl border-2 border-white bg-base-content  text-black placeholder:text-gray-800"
          />
          <button
            className="p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("cantidad")}
          >
            Buscar
          </button>
        </div>
        <div className="flex pb-5 gap-5 px-10">
          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("todos")}
          >
            Ver Todos
          </button>
          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("hay")}
          >
            En Stock
          </button>
          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("nohay")}
          >
            Sin Stock
          </button>

          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("debaja")}
          >
            Productos dados de Baja
          </button>
        </div>
        <div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border p-4">ID</th>
                <th className="border p-4">Nombre</th>
                <th className="border p-4">Descripcción</th>
                <th className="border p-4">Precio</th>
                <th className="border p-4">Stock</th>
                <th className="border p-4">Estado</th>
                <th className="border p-4">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto._id}>
                  <td className="border p-4">{producto.id} </td>
                  <td className="border p-4">{producto.nombre} </td>
                  <td className="border p-4">
                    {limitarPalabras(producto.descripcion, 15)}{" "}
                  </td>
                  <td className="border p-4">{producto.precio} </td>
                  <td className="border p-4">{producto.cantidadEnStock} </td>
                  <td className="border p-4">
                    {producto.estado ? (
                      <span className="text-green-600">Disponible</span>
                    ) : (
                      <span className="text-red-600">No Disponible</span>
                    )}{" "}
                  </td>
                  <td className="border p-4">
                    <div className="flex justify-between">
                      {
                        <button
                          className="bg-base-300 text-white p-3 rounded-lg"
                          onClick={() =>
                            router.push(`/products/productPage/${producto.id}`)
                          }
                        >
                          Ver Producto
                        </button>
                      }
                      {producto.estado ? (
                        <button
                          className="bg-orange-700 text-white p-3 rounded-lg"
                          onClick={() =>
                            router.push(`/products/editProduct/${producto.id}`)
                          }
                        >
                          {" "}
                          Editar{" "}
                        </button>
                      ) : (
                        ""
                      )}
                      {!producto.estado ? (
                        <button className="bg-green-700 text-white p-3 rounded-lg">
                          {" "}
                          Dar de Alta{" "}
                        </button>
                      ) : (
                        ""
                      )}
                      {producto.estado ? (
                        <button className="bg-red-700 text-white p-3 rounded-lg">
                          Eliminar
                        </button>
                      ) : (
                        ""
                      )}
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

export default Productspage;
