"use client";
import React, { useState } from "react";
import CLIENTES from "@/data/clientes";

import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();

  const [Filtro, setFiltro] = useState("todos");
  const [busquedaNombre, setBusquedaNombre] = useState("");

  const filtrarClientes = () => {
    switch (Filtro) {
      case "todos":
        return CLIENTES.filter((cliente) => cliente.estado);
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
                      <button className="bg-orange-700 text-white p-3 rounded-lg">
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
    </>
  );
};

export default UsersPage;
