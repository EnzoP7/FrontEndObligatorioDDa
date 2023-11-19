"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@/src/hooks/useForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateUserpage = () => {
  const router = useRouter();

  // Estado inicial del formulario
  const initialFormState = {
    id: "1",
    nombre: "",
    direccion: "",
    telefono: "",
    vip: false,
    fechaMembresia: "",
    estado: true,
  };

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    nombre,
    direccion,
    telefono,
    estado,
    fechaMembresia,
    vip,
    onInputChange,
    onResetForm,
  } = useForm(initialFormState);

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Formulario enviado:", {
      id,
      nombre,
      direccion,
      telefono,
      vip,
      fechaMembresia,

      estado,
    });

    const URL = vip
      ? "http://localhost:5000/clients/vip"
      : "http://localhost:5000/clients";

    let response;

    try {
      if (vip) {
        response = await axios.post(URL, {
          nombre,
          direccion,
          telefono,
          fechaMembresia,
        });
      } else {
        response = await axios.post(URL, {
          nombre,
          direccion,
          telefono,
        });
      }
      const taTodoBien = response.status === 201 ? true : false;

      taTodoBien
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente Ingresado Con Éxito",
            showConfirmButton: false,
            timer: 2000,
            color: "info",
            background: "#fff",
            backdrop: `
        rgba(0,0,123,0.4)
        url("/cat.gif")
        left top
        no-repeat
      `,
          })
        : Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salió Mal",
            showConfirmButton: false,
            timer: 2000,
            color: "info",
            background: "#fff",
            backdrop: `
        rgba(0,0,123,0.4)
        url("/cat.gif")
        left top
        no-repeat
      `,
          });

      redireccion;
      setTimeout(() => {
        router.push("/users");
      }, 2000);

      // 2000 milisegundos = 2 segundos
    } catch (error) {
      // Manejar errores de la petición
      console.error("Error en la petición:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo salió mal en la petición",
        showConfirmButton: false,
        timer: 2000,
        color: "info",
        background: "#fff",
        backdrop: `
      rgba(0,0,123,0.4)
      url("/cat.gif")
      left top
      no-repeat
    `,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Ingresar Cliente
        </h1>

        <div className="flex items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            className="border-2 border-base-content p-5 rounded-2xl shadow-lg shadow-base-content "
          >
            <div
              className={`grid ${
                vip === false ? "grid-cols-4" : "grid-cols-5"
              }  gap-5`}
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
                  <option value={false} selected>
                    NO
                  </option>
                </select>
              </div>

              {vip === "true" && (
                <>
                  <div>
                    <label className="text-xl p-4 flex justify-center">
                      Fecha VIP
                    </label>
                    <input
                      className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center   "
                      type="date"
                      name="fechaMembresia" // Corregido de fechaVeip a fechaVip
                      value={"fechaMembresia"}
                      onChange={onInputChange}
                    />
                  </div>
                </>
              )}
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

export default CreateUserpage;
