"use client";
import PRODUCTOS from "@/data/productos";
import { useForm } from "@/src/hooks/useForm";
import React from "react";

const editProductPage = ({ params }) => {
  const elId = params.id;
  const productoFiltrado = PRODUCTOS.filter((elPro) => elPro.id == elId);
  const producto = productoFiltrado[0] || null;

  const initialFormState = {
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    cantidadEnStock: producto.cantidadEnStock,
    estado: producto.estado,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agregar lógica para manejar el envío del formulario aquí
    console.log("Formulario enviado:", {
      id,
      nombre,
      descripcion,
      precio,
      cantidadEnStock,
      estado,
    });
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Modificar Producto
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

export default editProductPage;
