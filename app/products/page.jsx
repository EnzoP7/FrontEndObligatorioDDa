"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Swal from "sweetalert2";
import losProductos from "@/data/productos";
const Productspage = () => {
  const router = useRouter();
  const PRODUCTOS = losProductos();

  const [Filtro, setFiltro] = useState("todos");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaCantidad, setBusquedaCantidad] = useState("");
  const [selectedProducto, setSelectedProducto] = useState(null);

  const filtrarProductos = () => {
    switch (Filtro) {
      case "todos":
        return PRODUCTOS;
      case "hay":
        return PRODUCTOS.filter(
          (producto) => producto.stock > 0 && producto.estado
        );
      case "nohay":
        return PRODUCTOS.filter((producto) => producto.stock === 0);
      // case "debaja":
      //   return PRODUCTOS.filter((producto) => !producto.estado);

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
          return producto.stock < busquedaCantidad;
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

  const eliminarProducto = async () => {
    if (selectedProducto) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/products/eliminarProducto?id=${selectedProducto.id}`
        );
        let funco;
        console.log("LA RESPONSE: ", response);
        console.log(
          "LA RESPONSE statusCodeValue: ",
          response.data.statusCodeValue
        );

        return response.data.statusCodeValue;
      } catch (error) {
        console.log(error);
      }
    }

    console.log(
      "id de Producto eliminado: ",
      selectedProducto ? selectedProducto.id : null
    );
  };

  // const handleDeleteConfirmation = async () => {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "btn btn-success",
  //       cancelButton: "btn btn-danger",
  //     },
  //     buttonsStyling: false,
  //   });

  //   swalWithBootstrapButtons
  //     .fire({
  //       title: `¿Estás seguro?\nEliminar a  ${
  //         selectedProducto ? selectedProducto.nombre : ""
  //       }`,
  //       text: "Se cambiará el estado del mismo, podrás volverlo a dar de alta",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Sí, eliminarlo",
  //       cancelButtonText: "No, cancelar",
  //       confirmButtonColor: "#fff",
  //       cancelButtonColor: "#fff",
  //       reverseButtons: true,
  //       backdrop: `
  //         rgba(0,0,123,0.4)
  //         url("/cat.gif")
  //         left top
  //         no-repeat
  //       `,
  //       onClose: () => {
  //         // Restablecer selectedClient al cerrar el modal
  //         setSelectedProducto(null);
  //       },
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         // Aquí colocas la lógica para eliminar el cliente
  //         const resultado = await eliminarProducto();
  //         console.log("el resultado: ", resultado);
  //         setSelectedProducto(null);
  //         if (resultado === 200) {
  //           swalWithBootstrapButtons.fire({
  //             title: "¡Eliminado!",
  //             text: `El Producto ${
  //               selectedProducto ? selectedProducto.nombre : ""
  //             } ha sido eliminado.`,
  //             icon: "success",
  //           });
  //         } else if (resultado === 405) {
  //           swalWithBootstrapButtons.fire({
  //             title: "DATOS EN DB ",
  //             text: `Existen Registros de este producto en Ventas, No es posible eliminar.`,
  //             icon: "error",
  //           });
  //         } else
  //           swalWithBootstrapButtons.fire({
  //             title: "ALGO SALIO MAL ",
  //             text: `El servidor fallo.`,
  //             icon: "error",
  //           });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         setSelectedProducto(null);
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelado",
  //           text: "El Producto está a salvo :)",
  //           icon: "error",
  //         });
  //       }
  //       const redireccion = setTimeout(() => {
  //         router.push("/products");
  //       }, 2000);
  //     });
  // };

  const handleDeleteConfirmation = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    try {
      const result = await swalWithBootstrapButtons.fire({
        title: `¿Estás seguro?\nEliminar a  ${
          selectedProducto ? selectedProducto.nombre : ""
        }`,
        text: "Se eliminara el Producto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "No, cancelar",
        confirmButtonColor: "#fff",
        cancelButtonColor: "#fff",
        reverseButtons: true,
        backdrop: `
            rgba(0,0,123,0.4)
            url("/cat.gif")
            left top
            no-repeat
          `,
        onClose: () => {
          // Restablecer selectedClient al cerrar el modal
          setSelectedProducto(null);
        },
      });

      if (result.isConfirmed) {
        // Aquí colocas la lógica para eliminar el cliente
        const resultado = await eliminarProducto();
        console.log("el resultado: ", resultado);
        setSelectedProducto(null);
        if (resultado === 200) {
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: `El Producto ${
              selectedProducto ? selectedProducto.nombre : ""
            } ha sido eliminado.`,
            icon: "success",
          });
        } else if (resultado === 405) {
          swalWithBootstrapButtons.fire({
            title: "DATOS EN DB ",
            text: `Existen Registros de este producto en Ventas, No es posible eliminar.`,
            icon: "error",
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "ALGO SALIO MAL ",
            text: `El servidor fallo.`,
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setSelectedProducto(null);
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El Producto está a salvo :)",
          icon: "error",
        });
      }

      const redireccion = setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  {
    useEffect(() => {
      if (selectedProducto != null) {
        handleDeleteConfirmation();
      }
    }, [selectedProducto]);
  }
  return (
    <>
      <div className="p-3">
        <div className="flex items-center">
          <h1 className="text-7xl font-semibold m-10">Productos</h1>
          <button
            className="p-4 rounded-xl border-2 h-fit border-white bg-green-600 text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-xl"
            onClick={() => router.push("products/createProduct")}
          >
            Ingresar Producto
          </button>
        </div>
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

          {/* <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("debaja")}
          >
            Productos dados de Baja
          </button> */}
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
                <tr key={producto.id}>
                  <td className="border p-4">{producto.id} </td>
                  <td className="border p-4">{producto.nombre} </td>
                  <td className="border p-4">
                    {limitarPalabras(producto.descripcion, 15)}{" "}
                  </td>
                  <td className="border p-4">{producto.precio} </td>
                  <td className="border p-4">{producto.stock} </td>
                  <td className="border p-4">
                    {producto.estado && producto.stock > 0 ? (
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
                        <button
                          className="bg-red-700 text-white p-3 rounded-lg"
                          onClick={() => {
                            setSelectedProducto(producto);
                          }}
                        >
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
