"use client";

import CLIENTES from "@/data/clientes";
import PRODUCTOS from "@/data/productos";
import { useForm } from "@/src/hooks/useForm";
import React, { useState, useEffect } from "react";
import VENTAS from "@/data/ventas";

const editVentaPage = ({ params }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const elId = params.id;
  const ventaFiltrada = VENTAS.filter((laVenta) => laVenta.id == elId);
  const venta = ventaFiltrada[0];
  console.log("LA FECHA: ", venta.fecha);

  const splitDate = venta.fecha.split("-");
  const elAño = parseInt(splitDate[0], 10);
  const mes = parseInt(splitDate[1], 10) - 1; // Restar 1 porque los meses en JavaScript van de 0 a 11
  const dia = parseInt(splitDate[2], 10);

  const fechaObj = new Date(elAño, mes, dia);
  console.log("LA FORMATEADA: ", fechaObj);

  const haciendolafiltracion = () => {
    const productosFiltrados = venta.productos.map((prod) => {
      const producto = PRODUCTOS.find((elPro) => elPro.id === prod.productoId);
      return { ...producto, cantidad: prod.cantidad || 1 };
    });
    setProductosSeleccionados(productosFiltrados);
  };
  useEffect(() => {
    haciendolafiltracion();

    if (venta.clienteId) {
      onInputChange({ target: { name: "clienteId", value: venta.clienteId } });
    }

    const formattedDate =
      fechaObj.getFullYear() +
      "-" +
      ("0" + (fechaObj.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fechaObj.getDate()).slice(-2);

    // Actualizar el estado con la fecha formateada
    onInputChange({ target: { name: "fecha", value: formattedDate } });
  }, []);

  const initialFormState = {
    id: venta.id,
    productos: venta.productos,
    fecha: "",
    clienteId: venta.clienteId,
    total: venta.total,
  };

  const { id, productos, fecha, clienteId, total, onInputChange, onResetForm } =
    useForm(initialFormState);

  const buscarCliente = (id) => {
    const elCli = CLIENTES.filter((elCli) => elCli.id == id);
    const cliente = elCli[0] || null;
    return cliente;
  };

  const handleProductoSeleccionado = (event) => {
    const productoId = event.target.value;
    const productoSeleccionado = PRODUCTOS.find(
      (producto) => producto.id === productoId
    );

    // Verificar si el producto ya está en la lista
    if (
      productoSeleccionado &&
      !productosSeleccionados.some((prod) => prod.id === productoId)
    ) {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { ...productoSeleccionado, cantidad: 1 }, // Agregar cantidad inicial
      ]);
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

  const ProductosFiltrados = PRODUCTOS.filter(
    (elProducto) => elProducto.estado
  );

  const usuariosFiltrados = CLIENTES.filter((elCli) => elCli.estado);

  const totalConDescuentoPorVIP = () => {
    const eltotal = calcularTotal();
    const descuento = eltotal * 0.3;
    const montoFinal = eltotal - descuento;
    return montoFinal;
  };

  const clienteDeLaCompra = buscarCliente(clienteId);
  const tiene3Compras =
    clienteDeLaCompra &&
    clienteDeLaCompra.vip &&
    clienteDeLaCompra.vip.contadorCompras === 3;

  const totalFinal = tiene3Compras
    ? totalConDescuentoPorVIP()
    : calcularTotal();
  console.log(totalFinal);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agregar lógica para manejar el envío del formulario aquí
    console.log("Formulario enviado:", {
      id: "1",

      fecha, // Puedes utilizar un formato de fecha adecuado para tu aplicación
      clienteId,

      productosSeleccionados,
      totalFinal,
    });
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-semibold m-10 text-center">
          Modificar Venta
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
                      className="w-14 text-center py-2 border rounded"
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
                {usuariosFiltrados.map((cliente) => (
                  <option
                    value={cliente.id}
                    key={cliente.id}
                    selected={cliente.id === venta.clienteId}
                  >
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
              Guardar VENTA
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

export default editVentaPage;
