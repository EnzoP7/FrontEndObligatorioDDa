"use client";

import losProductos from "@/data/productos";
import ventas from "@/data/ventas";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { TbShoppingCartCog } from "react-icons/tb";
import { TbShoppingBagX } from "react-icons/tb";
import Swal from "sweetalert2";

const Ventapage = ({ params }) => {
  const elId = params.id;
  const router = useRouter();
  const [selectedVenta, setSelectedVenta] = useState(null);

  const PRODUCTOS = losProductos();
  console.log("LOS PRODUCTOS XD: ", PRODUCTOS);
  const VENTAS = ventas();
  console.log("LAS VENTAS QUE VIENEN: ", VENTAS);

  const ventaFiltrada = VENTAS.filter((laVenta) => laVenta.id == elId);

  const venta = ventaFiltrada[0] || null;
  console.log("LA VENTA FILTRADA: ", venta);

  const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
      const precioProducto =
        PRODUCTOS.find((p) => p.id === producto.productoId)?.precio || 0;
      return total + precioProducto * producto.cantidad;
    }, 0);
  };

  const eliminarVenta = () => {
    //! aca hacemos la peticion a la api pa borrar

    console.log(
      "id de VENTA eliminado: ",
      selectedVenta ? selectedVenta.id : null
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
        title: `¿Estás seguro?\nEliminar Venta ID:  ${
          selectedVenta ? selectedVenta.id : ""
        }`,
        text: "Se Eliminara Definitivamente",
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
          setSelectedVenta(null);
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Aquí colocas la lógica para eliminar el cliente
          eliminarVenta();
          setSelectedVenta(null);
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: `La Venta ${
              selectedVenta ? selectedVenta.id : ""
            } ha sido eliminada.`,
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSelectedVenta(null);
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La Venta está a salvo :)",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (selectedVenta != null) {
      handleDeleteConfirmation();
    }
  }, [selectedVenta]);

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
          <div
            className="bg-orange-300 p-5 rounded-lg hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/ventas/editVenta/${elId}`)}
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
              setSelectedVenta(venta);
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
      </div>
    </>
  );
};

export default Ventapage;
