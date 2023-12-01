"use client";

import traerClientes from "@/data/clientes";
import losProductos from "@/data/productos";
import { useForm } from "@/src/hooks/useForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const createVentaPAge = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const router = useRouter();

  const PRODUCTOS = losProductos();
  console.log("Productos cargados:", PRODUCTOS);
  const clientes = traerClientes();

  const handleProductoSeleccionado = (event) => {
    const productoId = parseInt(event.target.value);
    console.log("EL TIPO DE DATO: ", typeof productoId);
    console.log("Producto ID seleccionado:", productoId);
    const productoSeleccionado = PRODUCTOS.find(
      (producto) => producto.id === productoId
    );

    console.log("Producto seleccionado:", productoSeleccionado);

    // Verificar si el producto ya está en la lista
    if (
      productoSeleccionado &&
      !productosSeleccionados.some((prod) => prod.id === productoId)
    ) {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { ...productoSeleccionado, cantidad: 1 }, // Agregar cantidad inicial
      ]);

      console.log("Productos seleccionados:", productosSeleccionados);
    }
  };

  const handleEliminarProducto = (productoId) => {
    const nuevaLista = productosSeleccionados.filter(
      (producto) => producto.id !== productoId
    );
    setProductosSeleccionados(nuevaLista);
  };

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    const nuevaLista = productosSeleccionados.map((producto) =>
      producto.id === productoId
        ? { ...producto, cantidad: nuevaCantidad }
        : producto
    );
    setProductosSeleccionados(nuevaLista);
  };

  const handleResetForm = () => {
    // Lógica adicional para reiniciar el estado según tus necesidades
    setProductosSeleccionados([]);
    // Reinicia la página
    window.location.reload();
  };

  const calcularTotal = () => {
    let total = 0;

    productosSeleccionados.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });

    return total;
  };

  const initialFormState = {
    id: "1",
    productos: [],
    fecha: "", // Puedes utilizar un formato de fecha adecuado para tu aplicación
    clienteId: "",
    total: "",
  };
  const { id, productos, fecha, clienteId, total, onInputChange, onResetForm } =
    useForm();

  const ProductosFiltrados = PRODUCTOS.filter(
    (elProducto) => elProducto.estado
  );

  const usuariosFiltrados = clientes.filter((elCli) => elCli.estado);

  const buscarCliente = (id) => {
    const elCli = clientes.filter((elCli) => elCli.id == id);
    const cliente = elCli[0] || null;
    return cliente;
  };

  const totalConDescuentoPorVIP = () => {
    const eltotal = calcularTotal();
    const descuento = eltotal * 0.3;
    const montoFinal = eltotal - descuento;
    return montoFinal;
  };

  const clienteDeLaCompra = buscarCliente(clienteId);
  const tiene3Compras =
    clienteDeLaCompra &&
    clienteDeLaCompra.fechaMembresia &&
    clienteDeLaCompra.contadorCompras % 3 == 0;

  const totalFinal = tiene3Compras
    ? totalConDescuentoPorVIP()
    : calcularTotal();
  console.log(totalFinal);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productosParaEnviar = productosSeleccionados.map((producto) => ({
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        estado: producto.estado,
        stock: producto.stock,
      },
      cantidad: producto.cantidad,
    }));

    console.log("Formulario enviado:", {
      id: "1",

      fecha, // Puedes utilizar un formato de fecha adecuado para tu aplicación
      clienteId,
      cli: buscarCliente(clienteId),

      lista: productosParaEnviar,
      total: totalFinal,
    });

    let response;
    let funca;

    try {
      response = await axios.post("http://localhost:5000/venta", {
        lista: productosParaEnviar,
        fecha,
        total: totalFinal,
        cli: buscarCliente(clienteId),
      });
      response.status === 201 ? (funca = true) : (funca = false);
      console.log("LA RESOINSE: ", response);

      // ... rest of your code ...
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error (e.g., show an error message to the user)
    }

    funca
      ? Swal.fire({
          position: "center",
          icon: "success",
          title: "Venta Ingresada Con Exito",
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
      router.push("/ventas");
    }, 2000);

    // 2000 milisegundos = 2 segundos
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Ingresar Venta
        </h1>
        <form className="px-5 " onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-5">
            <div>
              <label className="text-xl p-4 flex justify-center">
                Selecciona Productos
              </label>
              <select
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="text"
                onChange={handleProductoSeleccionado}
                //   placeholder="Ingresa Nombre del Producto"
                //   name="nombre"
                //   value={nombre}
                //   onChange={onInputChange}
              >
                {ProductosFiltrados.map((producto) => (
                  <option value={producto.id} key={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xl p-4 flex justify-center">
                Productos Seleccionados
              </label>
              <ul className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex-col  justify-center items-center">
                {productosSeleccionados.map((producto) => (
                  <div key={producto.id} className="mb-2 w-full">
                    {producto.nombre} - Cantidad:
                    <input
                      max={producto.stock}
                      className="w-14 px-4 py-1 border rounded"
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) =>
                        handleCantidadChange(
                          producto.id,
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                    />
                    <button
                      onClick={() => handleEliminarProducto(producto.id)}
                      className="ml-5 text-white bg-red-600 p-3 rounded-xl"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </ul>
            </div>

            <div>
              <label className="text-xl p-4 flex justify-center">
                Fecha Venta
              </label>
              <input
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center   "
                type="date"
                name="fecha" // Corregido de fechaVeip a fechaVip
                value={fecha}
                onChange={onInputChange}
              />
            </div>

            <div>
              <label className="text-xl p-4 flex justify-center">
                Selecciona Cliente
              </label>
              <select
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                type="text"
                name="clienteId"
                value={clienteId}
                onChange={onInputChange}
              >
                <option>Seleccione Cliente</option>
                {usuariosFiltrados.map((cliente) => (
                  <option value={cliente.id} key={cliente.id}>
                    {cliente.id} {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xl p-4 flex justify-center">TOTAL</label>
              <div
                className="bg-base-100  w-full p-4  placeholder:text-base-content text-base-content border-2 border-base-content rounded-2xl text-center flex  justify-center items-center"
                onChange={onInputChange}
              >
                {totalFinal}
              </div>
              {totalFinal == totalConDescuentoPorVIP() ? (
                <div className="text-xl p4 flex justify-center">
                  (Descuento del 30%)
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex items-center justify-center py-10 gap-5">
            <button className="btn  p-3 text-2xl" type="submit">
              GENERAR VENTA
            </button>
            <button
              className="btn w-fit p-3 text-2xl"
              type="button"
              onClick={handleResetForm}
            >
              Resetear Formulario
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default createVentaPAge;
