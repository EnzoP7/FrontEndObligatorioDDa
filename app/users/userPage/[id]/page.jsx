"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserClock,
  FaUserCog,
  FaUserMinus,
} from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import ventas from "@/data/ventas";
import useCliente from "@/data/traerCliente";
import losProductos from "@/data/productos";

const UsuarioPage = ({ params }) => {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedVIP, setSelectedVIP] = useState(null);
  // const [cliente, setcliente] = useState("");

  const elId = params.id;
  const VENTAS = ventas();
  const PRODUCTOS = losProductos();
  const cliente = useCliente(elId);

  console.log("QUE VIENE EN CLIENTE: ", cliente);

  const ventasAlCliente = VENTAS.filter((laVenta) => laVenta.cli.id == elId);

  const buscarProducto = (productoId) => {
    const elProductoFiltrado = PRODUCTOS.find(
      (elProducto) => elProducto.id === productoId
    );
    const elProducto = elProductoFiltrado?.nombre || "no se encontró";
    return elProducto;
  };

  const eliminarCliente = async () => {
    //! aca hacemos la peticion a la api pa borrar
    if (selectedClient) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/clients/eliminarCliente?id=${selectedClient.id}`
        );
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
      "id de cliente eliminado: ",
      selectedClient ? selectedClient.id : null
    );
  };

  // const handleDeleteConfirmation = () => {
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
  //         selectedClient ? selectedClient.nombre : ""
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
  //         setSelectedClient(null);
  //       },
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         // Aquí colocas la lógica para eliminar el cliente
  //         const Resultado = eliminarCliente();
  //         setSelectedClient(null);

  //         Resultado
  //           ? swalWithBootstrapButtons.fire({
  //               title: "¡Eliminado!",
  //               text: `El usuario ${
  //                 selectedClient ? selectedClient.nombre : ""
  //               } ha sido eliminado.`,
  //               icon: "success",
  //             })
  //           : swalWithBootstrapButtons.fire({
  //               title: "Algo salio mal",
  //               text: `El servidor ha fallado`,
  //               icon: "error",
  //             });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         setSelectedClient(null);
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelado",
  //           text: "El usuario está a salvo :)",
  //           icon: "error",
  //         });
  //       }

  //       const redireccion = setTimeout(() => {
  //         router.push("/users");
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
          selectedClient ? selectedClient.nombre : ""
        }`,
        text: "Se Eliminara al Cliente",
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
          setSelectedClient(null);
        },
      });

      if (result.isConfirmed) {
        // Aquí colocas la lógica para eliminar el cliente
        const resultado = await eliminarCliente();
        console.log("el resultado: ", resultado);
        setSelectedClient(null);
        if (resultado === 200) {
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: `El usuario ${
              selectedClient ? selectedClient.nombre : ""
            } ha sido eliminado.`,
            icon: "success",
          });
        } else if (resultado === 405) {
          swalWithBootstrapButtons.fire({
            title: "DATOS EN DB ",
            text: `Existen Registros de este usuario en Ventas, No es posible eliminar.`,
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
        setSelectedClient(null);
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El usuario está a salvo :)",
          icon: "error",
        });
      }

      const redireccion = setTimeout(() => {
        router.push("/users");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVIPConfirmation = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Estás seguro?\nTansformar en VIP a  ${
          selectedVIP ? selectedVIP.nombre : ""
        }`,
        text: "Se Pasara a USUARIO VIP",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, pasar a VIP",
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
          setSelectedVIP(null);
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Aquí colocas la lógica para eliminar el cliente
          const Resultado = convertirVIP();
          setSelectedVIP(null);

          Resultado
            ? swalWithBootstrapButtons.fire({
                title: "Ahora es VIP :)",
                text: `El usuario ${
                  selectedVIP ? selectedVIP.nombre : ""
                } ha sido VIPEADO.`,
                icon: "success",
              })
            : swalWithBootstrapButtons.fire({
                title: "Algo salio mal",
                text: `El servidor Fallo`,
                icon: "error",
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSelectedVIP(null);
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El usuario está a salvo :)",
            icon: "error",
          });
        }

        const redireccion = setTimeout(() => {
          router.push("/users");
        }, 2000);
      });
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();

    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0
    const dia = fecha.getDate().toString().padStart(2, "0");

    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
  };

  const convertirVIP = async () => {
    let response;
    let response2xd;
    let funco;
    if (selectedVIP) {
      try {
        response = await axios.delete(
          `http://localhost:5000/clients/eliminarCliente?id=${elId}`
        );
        console.log("LA RESPONSE: ", response);
        if (response.status === 200) {
          response2xd = await axios.post("http://localhost:5000/clients/vip", {
            elId,
            nombre: cliente.nombre,
            telefono: cliente.telefono,
            estado: cliente.estado,
            contadorCompras: cliente.contadorCompras,
            fechaMembresia: obtenerFechaActual(),
          });
          response2xd.status === 201 ? (funco = true) : (funco = false);
          console.log("LA RESPONSE2XD: ", response2xd);
          return funco;
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log("ID CLIENTE A VIP: ", selectedVIP ? selectedVIP.id : null);
  };

  useEffect(() => {
    if (selectedClient === cliente) {
      handleDeleteConfirmation();
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedVIP === cliente) {
      handleVIPConfirmation();
    }
  }, [selectedVIP]);

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
              <span className="font-semibold "> {cliente.nombre}</span>
            </h1>
          </div>

          {cliente.fechaMembresia ? (
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
              {!cliente.fechaMembresia ? (
                <div
                  className="bg-yellow-400 p-5 rounded-lg hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedVIP(cliente);
                  }}
                >
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
              <div
                className="bg-red-600 p-5 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => {
                  setSelectedClient(cliente);
                  handleDeleteConfirmation();
                }}
              >
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
                          {venta.lista.map((lista) => (
                            <li key={lista.producto.id}>
                              {`Producto: ${buscarProducto(
                                lista.producto.id
                              )} Cantidad: ${lista.cantidad}`}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border p-4">{venta.fecha}</td>
                      <td className="border p-4">{venta.cli.id}</td>
                      <td className="border p-4">${venta.total}</td>
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
