"use client";
import React, { useEffect, useState } from "react";
import CLIENTES from "@/data/clientes";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();

  const [Filtro, setFiltro] = useState("todos");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    console.log(selectedClient);
  }, [selectedClient]);

  const filtrarClientes = () => {
    switch (Filtro) {
      case "todos":
        return CLIENTES;
      case "VIP":
        return CLIENTES.filter((cliente) => cliente.vip && cliente.estado);
      case "regulares":
        return CLIENTES.filter((cliente) => !cliente.vip && cliente.estado);
      case "debaja":
        return CLIENTES.filter((cliente) => !cliente.estado);

      case "nombre":
        return CLIENTES.filter((cliente) => {
          console.log(busquedaNombre);
          return cliente.nombre
            .toLowerCase()
            .includes(busquedaNombre.toLowerCase());
        });
      default:
        return CLIENTES;
    }
  };

  const clientesFiltrados = filtrarClientes();

  const eliminarCliente = () => {
    //! aca hacemos la peticion a la api pa borrar

    console.log(
      "id de cliente eliminado: ",
      selectedClient ? selectedClient.id : null
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
          selectedClient ? selectedClient.nombre : ""
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
          setSelectedClient(null);
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Aquí colocas la lógica para eliminar el cliente
          eliminarCliente();
          setSelectedClient(null);
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: `El usuario ${
              selectedClient ? selectedClient.nombre : ""
            } ha sido eliminado.`,
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSelectedClient(null);
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El usuario está a salvo :)",
            icon: "error",
          });
        }
      });
  };

  {
    useEffect(() => {
      if (selectedClient != null) {
        handleDeleteConfirmation();
      }
    }, [selectedClient]);
  }
  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10">Clientes</h1>

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
            onClick={() => setFiltro("VIP")}
          >
            Usuarios VIP
          </button>
          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("regulares")}
          >
            Usuarios Regulares
          </button>

          <button
            className=" p-3 rounded-xl border-2 border-white bg-base-content text-base-100 hover:scale-105 hover:bg-base-100 hover:text-base-content text-2xl"
            onClick={() => setFiltro("debaja")}
          >
            Usuarios de Baja
          </button>
        </div>
      </div>
      <div className="p-5">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-4">ID</th>
              <th className="border p-4">Nombre</th>
              <th className="border p-4">Dirección</th>
              <th className="border p-4">Teléfono</th>
              <th className="border p-4">Membresía VIP</th>
              <th className="border p-4">Fecha de Membresía</th>
              <th className="border p-4">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border p-4">{cliente.id}</td>
                <td className="border p-4">{cliente.nombre}</td>
                <td className="border p-4">{cliente.direccion}</td>
                <td className="border p-4">{cliente.telefono}</td>
                <td className="border p-4">{cliente.vip ? "Sí" : "No"}</td>
                <td className="border p-4">
                  {cliente.vip?.fechaMembresia || "-"}
                </td>
                <td className="border p-4">
                  <div className="flex justify-between">
                    {
                      <button
                        className="bg-base-300 text-white p-3 rounded-lg"
                        onClick={() =>
                          router.push(`/users/userPage/${cliente.id}`)
                        }
                      >
                        Ver Perfil
                      </button>
                    }
                    {cliente.estado ? (
                      <button
                        className="bg-orange-700 text-white p-3 rounded-lg"
                        onClick={() =>
                          router.push(`/users/editUser/${cliente.id}`)
                        }
                      >
                        {" "}
                        Editar{" "}
                      </button>
                    ) : (
                      ""
                    )}
                    {!cliente.estado ? (
                      <button className="bg-green-700 text-white p-3 rounded-lg">
                        {" "}
                        Dar de Alta{" "}
                      </button>
                    ) : (
                      ""
                    )}
                    {cliente.estado ? (
                      <button
                        className="bg-red-700 text-white p-3 rounded-lg"
                        onClick={() => {
                          setSelectedClient(cliente);
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
    </>
  );
};

export default UsersPage;
