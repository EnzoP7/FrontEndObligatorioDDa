"use client";
import React from "react";
import { useForm } from "@/src/hooks/useForm";
import CLIENTES from "@/data/clientes";

const EditUserpage = ({ params }) => {
  const elID = params.id;

  const elusuarioFiltrado = CLIENTES.filter((elcli) => elcli.id == elID);
  const usuario = elusuarioFiltrado[0] || null;

  const initialFormState = {
    id: usuario.id,
    nombre: usuario.nombre,
    direccion: usuario.direccion,
    telefono: usuario.telefono,
    vip: usuario.vip,
    fechaVip: usuario.vip?.fechaMembresia,
    estado: true,
  };

  console.log("EL INICIAL STATE: ", initialFormState);
  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    nombre,
    direccion,
    telefono,
    estado,
    vip,
    fechaVip,
    onInputChange,
    onResetForm,
  } = useForm(initialFormState);

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Agregar lógica para manejar el envío del formulario aquí
    console.log("Formulario enviado:", {
      id,
      nombre,
      direccion,
      telefono,
      vip,
      fechaVip,

      estado,
    });
    // Puedes enviar los datos a tu backend, almacenar en el estado global, etc.
  };
  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Modificar Cliente
        </h1>

        <div className="flex items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            className="border-2 border-base-content p-5 rounded-2xl shadow-lg shadow-base-content "
          >
            <div
              className={`grid ${!vip ? "grid-cols-4" : "grid-cols-5"}  gap-5`}
            >
              <div>
                <label className="text-xl p-4 flex justify-center">
                  Nombre
                </label>
                <input
                  className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                  type="text"
                  placeholder="Ingresa Nombre del Cliente"
                  name="nombre"
                  value={nombre}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label className="text-xl p-4 flex justify-center">
                  Dirección
                </label>
                <input
                  className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                  type="text"
                  placeholder="Ingresa Direccion del Cliente"
                  name="direccion"
                  value={direccion}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label className="text-xl p-4 flex justify-center">
                  Telefono
                </label>
                <input
                  className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                  type="tel"
                  placeholder="Ingresa Telefono del Cliente"
                  name="telefono"
                  value={telefono}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label className="text-xl p-4 flex justify-center">VIP</label>
                <select
                  className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                  name="vip"
                  value={vip}
                  onChange={onInputChange}
                >
                  <option disabled>VIP</option>
                  <option value={true}>SI</option>
                  <option value={false} onClick={() => resetearVip()}>
                    NO
                  </option>
                </select>
              </div>

              {vip ? (
                <>
                  <div>
                    <label className="text-xl p-4 flex justify-center">
                      Fecha VIP
                    </label>
                    <input
                      className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center   "
                      type="date"
                      name="fechaVip" // Corregido de fechaVeip a fechaVip
                      value={fechaVip}
                      onChange={onInputChange}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {/* <div className={` ${!vip ? "hidden" : ""}  ml-5`}>
                <label className="text-xl p-4">Fecha VIP</label>
                <input
                  className="bg-base-100  w-3/4 p-1  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                  type="date"
                  placeholder="Ingresa FECHA VIP del Cliente"
                  name="fechaVip"
                  value={fechaVip}
                  onChange={onInputChange}
                />
              </div> */}
            </div>

            <div className="flex items-center justify-center py-10 gap-5">
              <button className="btn  p-3 text-2xl" type="submit">
                Guardar Cliente
              </button>
              <button
                className="btn w-fit p-3 text-2xl"
                type="button"
                onClick={onResetForm}
              >
                Resetear Formulario
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserpage;
