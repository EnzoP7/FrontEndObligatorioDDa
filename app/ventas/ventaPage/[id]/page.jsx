"use client";
import React, { useEffect, useState } from "react";

import laVenta from "@/data/getAVenta";

import { useRouter } from "next/navigation";

import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { TbShoppingCartCog } from "react-icons/tb";
import { TbShoppingBagX } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";

const Ventapage = ({ params }) => {
  const elId = params.id;

  const router = useRouter();
  const [selectedVenta, setSelectedVenta] = useState(null);
  const venta = laVenta(elId);

  const eliminarVenta = async () => {
    //! aca hacemos la peticion a la api pa borrar
    try {
      if (selectedVenta) {
        const response = await axios.delete(
          `http://localhost:5000/venta?id=${elId}`
        );

        console.log("la bella response xd", response);

        // Revisa el status de la respuesta, no la promesa directamente
        return response.status === 200;
      }
    } catch (error) {
      console.log(error);
      return false; // Si hay un error, asumimos que no se eliminó correctamente
    }

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
          const resultado = eliminarVenta();
          setSelectedVenta(null);

          resultado
            ? swalWithBootstrapButtons.fire({
                title: "¡Eliminado!",
                text: `La Venta ${
                  selectedVenta ? selectedVenta.id : ""
                } ha sido eliminada.`,
                icon: "success",
              })
            : swalWithBootstrapButtons.fire({
                title: "Algo salio Mal",
                text: "El servidor fallo",
                icon: "error",
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSelectedVenta(null);
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La Venta está a salvo :)",
            icon: "error",
          });
        }
        const redireccion = setTimeout(() => {
          router.push("/ventas");
        }, 2000);
      });
  };

  useEffect(() => {
    if (selectedVenta != null) {
      handleDeleteConfirmation();
    }
  }, [selectedVenta]);

  return (
    <>
      {venta && (
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
                <span className="font-semibold">
                  Productos:{" "}
                  {venta.lista
                    ? venta.lista.map(
                        (producto) => ` ID: ${producto.producto.id}`
                      )
                    : "No hay productos disponibles"}
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
                <span className="font-semibold">
                  Cliente ID: {venta.cli ? venta.cli.id : "-1"}
                </span>
              </h1>
            </div>
            <div className="bg-base-content p-5 rounded-lg">
              <p className="flex justify-center items-center mb-5">
                <FaMoneyBillWave size={50} />
              </p>
              <h1 className="text-3xl">
                <span className="font-semibold ">TOTAL: ${venta.total}</span>
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
      )}
    </>
  );
};

export default Ventapage;
