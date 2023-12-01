"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "@/src/hooks/useForm";
import traerClientes from "@/data/clientes";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditUserpage = ({ params }) => {
  const elID = params.id;
  const CLIENTES = traerClientes();
  const router = useRouter();

  const elusuarioFiltrado = CLIENTES.filter((elcli) => elcli.id == elID);
  const usuario = elusuarioFiltrado[0] || 1;

  const initialFormState = {
    id: usuario.id,
    nombre: usuario.nombre,
    direccion: usuario.direccion,
    telefono: usuario.telefono,
    contadorCompras: usuario.contadorCompras,
    fechaMembresia: usuario.fechaMembresia,
    estado: true,
    vip: usuario.fechaMembresia ? true : false,
  };

  // console.log("EL INICIAL STATE: ", initialFormState);
  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    nombre,
    direccion,
    telefono,
    estado,
    vip,
    fechaMembresia,
    contadorCompras,
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
      contadorCompras,

      estado,
    });

    let response;
    let response2xd;
    let funco;

    //! CASO 1 ERA VIP Y SIGUE SIENDO VIP

    if (vip === true && usuario.fechaMembresia) {
      console.log("EL VIP DEL CASO 1 : ", vip);
      try {
        response = await axios.put("http://localhost:5000/clients/vip", {
          id,
          nombre,
          direccion,
          telefono,
          estado,
          contadorCompras,
          fechaMembresia,
        });
        console.log("CASO 1");
        console.log("LA RESPONSE: ", response);
        response.status === 201 ? (funco = true) : (funco = false);
      } catch (error) {
        console.log(error);
      }
    }

    //! CASO 2 ES REGULAR Y SIGUE REGULAR
    else if (!vip && !usuario.fechaMembresia) {
      try {
        response = await axios.put("http://localhost:5000/clients", {
          id,
          nombre,
          direccion,
          telefono,
          estado,
          contadorCompras,
        });
        console.log("CASO 2");
        console.log("LA RESPONSE: ", response);
        response.status === 201 ? (funco = true) : (funco = false);
      } catch (error) {
        console.log(error);
      }
    }

    //! CASO 3 ERA REGULAR Y AHORA ES VIP
    else if (vip && !usuario.fechaMembresia) {
      try {
        response = await axios.delete(
          `http://localhost:5000/clients/eliminarCliente?id=${id}`
        );
        console.log("CASO 3");
        console.log("LA RESPONSE: ", response);
        if (response.status === 200) {
          response2xd = await axios.post("http://localhost:5000/clients/vip", {
            id,
            nombre,
            direccion,
            telefono,
            estado,
            contadorCompras,
            fechaMembresia,
          });
          response2xd.status === 201 ? (funco = true) : (funco = false);
          console.log("LA RESPONSE2XD: ", response2xd);
        }
      } catch (error) {
        console.log(error);
      }
    }

    //! CASO 4 ERA VIP Y AHORA ES REGULAR
    else if (vip === "false" && usuario.fechaMembresia) {
      try {
        response = await axios.delete(
          `http://localhost:5000/clients/eliminarCliente?id=${id}`
        );
        console.log("CASO 4");
        console.log("LA RESPONSE: ", response);
        if (response.status === 200) {
          response2xd = await axios.post("http://localhost:5000/clients", {
            id,
            nombre,
            direccion,
            telefono,
            estado,
            contadorCompras,
          });

          response2xd.status === 201 ? (funco = true) : (funco = false);
          console.log("LA RESPONSE2XD: ", response2xd);
        } else funco = false;
      } catch (error) {
        console.log("EL ERROR: ", error.message);
      }
    }

    funco
      ? Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente Modificado Con Exito",
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
          title: "Algo salio Mal",
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

    // redireccion
    setTimeout(() => {
      router.push("/users");
    }, 2000);

    // 2000 milisegundos = 2 segundos
  };

  const resetButtonRef = useRef(null); // Crear una referencia
  useEffect(() => {
    onResetForm(); // Llamada a onResetForm cuando el componente se monta
    const timeoutId = setTimeout(() => {
      resetButtonRef.current.click();
    }, 100);

    // Limpiar el timeout en la fase de limpieza del efecto para evitar fugas de memoria
    return () => clearTimeout(timeoutId);
  }, []);
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
                  <option value={false} selected>
                    NO
                  </option>
                </select>
              </div>

              {vip && (
                <>
                  <div>
                    <label className="text-xl p-4 flex justify-center">
                      Fecha VIP
                    </label>
                    <input
                      className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center   "
                      type="date"
                      name="fechaMembresia" // Corregido de fechaVeip a fechaVip
                      value={fechaMembresia}
                      onChange={onInputChange}
                    />
                  </div>
                </>
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
                Modificar Cliente
              </button>
              <button
                ref={resetButtonRef}
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
