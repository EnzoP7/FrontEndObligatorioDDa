"use client";

import PRODUCTOS from "@/data/productos";
import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbShoppingCartCog } from "react-icons/tb";
import { TbShoppingBagX } from "react-icons/tb";
import { TbShoppingCartCheck } from "react-icons/tb";
import VENTAS from "@/data/ventas";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Productpage = ({ params }) => {
  const elId = params.id;
  const [selectedProducto, setSelectedProducto] = useState(null);

  const router = useRouter();

  const productoFiltrado = PRODUCTOS.filter(
    (elProducto) => elProducto.id == elId
  );
  const producto = productoFiltrado[0] || null;

  const ventasConElProducto = VENTAS.filter((laVenta) =>
    laVenta.productos.some((producto) => producto.productoId == elId)
  );

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

  const eliminarProducto = () => {
    //! aca hacemos la peticion a la api pa borrar

    console.log(
      "id de Producto eliminado: ",
      selectedProducto ? selectedProducto.id : null
    );
  };

  const handleDeleteConfirmation = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Estás seguro?\nEliminar a  ${
          selectedProducto ? selectedProducto.nombre : ""
        }`,
        text: "Se cambiará el estado del mismo, podrás volverlo a dar de alta",
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
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Aquí colocas la lógica para eliminar el cliente
          eliminarProducto();
          setSelectedProducto(null);
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: `El Producto ${
              selectedProducto ? selectedProducto.nombre : ""
            } ha sido eliminado.`,
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSelectedProducto(null);
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El Producto está a salvo :)",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (selectedProducto != null) {
      handleDeleteConfirmation();
    }
  }, [selectedProducto]);

  return (
    <>
      <div>
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-6xl">Informacion del Producto</h1>
        </div>
        {!producto.estado ? (
          <div className="flex justify-center items-center pt-2">
            <h1 className="text-red-600">Este Producto esta dado de BAJA </h1>
          </div>
        ) : (
          ""
        )}

        <div className="mt-20 mb-10 flex justify-center gap-40 text-black">
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <FaBagShopping size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold "> {producto.nombre} </span>
            </h1>
          </div>
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <RiMoneyDollarCircleFill size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">
                {" "}
                Precio: ${producto.precio}{" "}
              </span>
            </h1>
          </div>
          <div className="bg-base-content p-5 rounded-lg">
            <p className="flex justify-center items-center mb-5">
              <MdOutlineProductionQuantityLimits size={50} />
            </p>
            <h1 className="text-3xl">
              <span className="font-semibold ">
                {" "}
                Stock {producto.cantidadEnStock}u{" "}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex justify-between text-center">
          <div className="p-10">
            <h3 className="text-4xl pb-3">Descripcción</h3>
            <p className="text-lg">{producto.descripcion}</p>
          </div>
        </div>

        {producto.estado ? (
          <>
            <div className="m-20 flex items-center justify-center gap-60 text-black">
              <div
                className="bg-orange-300 p-5 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/products/editProduct/${elId}`)}
              >
                <p className="flex justify-center items-center mb-5">
                  <TbShoppingCartCog size={50} />
                </p>
                <h1 className="text-3xl">
                  <span className="font-semibold ">Modificar</span>
                </h1>
              </div>

              <div
                className="bg-red-600 p-5 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => {
                  setSelectedProducto(producto);
                }}
              >
                <p className="flex justify-center items-center mb-5">
                  <TbShoppingBagX size={50} />
                </p>
                <h1 className="text-3xl">
                  <span className="font-semibold ">Eliminar</span>
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="m-20 flex items-center justify-center gap-60 text-black">
              <div className="bg-green-600 p-5 rounded-lg hover:scale-105 cursor-pointer">
                <p className="flex justify-center items-center mb-5">
                  <TbShoppingCartCheck size={50} />
                </p>
                <h1 className="text-3xl">
                  <span className="font-semibold ">Dar de Alta</span>
                </h1>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-center">
          <h1 className="text-6xl">Historial de Ventas</h1>
        </div>

        {ventasConElProducto.length > 0 ? (
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
                  {ventasConElProducto.map((venta) => (
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
          <div className="flex items-center justify-center py-10 text-2xl font-bold">
            <h1>No se Encontraron Ventas</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Productpage;
