"use client";
import { useForm } from "@/src/hooks/useForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const CreateProductPage = () => {
  const router = useRouter();
  const initialFormState = {
    id: "1",
    nombre: "",
    descripcion: "",
    precio: 0,
    cantidadEnStock: 0,
    estado: true,
  };

  const {
    id,
    nombre,
    descripcion,
    precio,
    cantidadEnStock,
    estado,
    onInputChange,
    onResetForm,
  } = useForm(initialFormState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Formulario enviado:", {
      id,
      nombre,
      descripcion,
      precio,
      cantidadEnStock,
      estado,
    });

    let response;

    try {
      response = await axios.post("http://localhost:5000/products", {
        nombre,
        descripcion,
        precio,

        estado: true,
        stock: cantidadEnStock,
      });
    } catch (error) {
      console.log(error);
    }

    const taTodoBien = response.status === 201 ? true : false;

    taTodoBien
      ? Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto Ingresado Con Exito",
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

    setTimeout(() => {
      router.push("/products");
    }, 2000);
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Ingresar Producto
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border-2 border-base-content p-5 rounded-2xl shadow-lg shadow-base-content mx-10"
        >
          <div className="grid grid-cols-4 gap-5">
            <div>
              <label className="text-xl p-4 flex justify-center">Nombre</label>
              <input
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="text"
                placeholder="Ingresa Nombre del Producto"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="text-xl p-4 flex justify-center">
                Descripción
              </label>
              <textarea
                className="bg-base-100 placeholder:pt-3  w-full p-1  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="text"
                placeholder="Ingresa Descripción del Producto"
                name="descripcion"
                value={descripcion}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="text-xl p-4 flex justify-center">Precio</label>
              <input
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="number"
                placeholder="Ingresa Precio del Producto"
                name="precio"
                value={precio}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="text-xl p-4 flex justify-center">
                CantidadEnStock
              </label>
              <input
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="number"
                placeholder="Ingresa CantidadEnStock del Producto"
                name="cantidadEnStock"
                value={cantidadEnStock}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-center py-10 gap-5">
            <button className="btn  p-3 text-2xl" type="submit">
              Guardar Producto
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
    </>
  );
};

export default CreateProductPage;
