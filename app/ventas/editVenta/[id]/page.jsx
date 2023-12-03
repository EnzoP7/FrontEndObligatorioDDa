"use client";

import traerClientes from "@/data/clientes";
import laVenta from "@/data/getAVenta";
import losProductos from "@/data/productos";

import { useForm } from "@/src/hooks/useForm";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import Swal from "sweetalert2";

const EditVentaPage = ({ params }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);

  const elId = params.id;
  const PRODUCTOS = losProductos();
  const venta = laVenta(elId);
  const losClientes = traerClientes();

  let fechaObj;

  if (venta && venta.fecha) {
    const splitDate = venta.fecha.split("-");

    // Verificar si splitDate tiene la longitud esperada
    if (splitDate.length === 3) {
      const elAño = parseInt(splitDate[0], 10);
      const mes = parseInt(splitDate[1], 10) - 1;
      const dia = parseInt(splitDate[2], 10);

      fechaObj = new Date(elAño, mes, dia);
      console.log("LA FORMATEADA: ", fechaObj);
    } else {
      console.error("Fecha no válida:", venta.fecha);
    }
  } else {
    console.error("Venta no válida:", venta);
  }

  const haciendolafiltracion = () => {
    try {
      const productosFiltrados =
        venta &&
        venta.lista.map((laLista) => {
          const producto = PRODUCTOS.find(
            (elPro) => elPro.id === laLista.producto.id
          );
          return { ...producto, cantidad: laLista.cantidad || 1 };
        });
      setProductosSeleccionados(productosFiltrados);
    } catch (error) {
      console.log("el error: ", error);
    }
  };

  useEffect(() => {
    haciendolafiltracion();

    if (venta.clienteId) {
      onInputChange({ target: { name: "clienteId", value: venta.clienteId } });
    }
    if (fechaObj) {
      const formattedDate =
        fechaObj.getFullYear() +
        "-" +
        ("0" + (fechaObj.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + fechaObj.getDate()).slice(-2);

      // Actualizar el estado con la fecha formateada
      onInputChange({ target: { name: "fecha", value: formattedDate } });
    } else {
      console.error("Fecha no válida o fechaObj no definido:", venta);
    }

    // const formattedDate =
    //   fechaObj.getFullYear() +
    //   "-" +
    //   ("0" + (fechaObj.getMonth() + 1)).slice(-2) +
    //   "-" +
    //   ("0" + fechaObj.getDate()).slice(-2);

    // // Actualizar el estado con la fecha formateada
    // onInputChange({ target: { name: "fecha", value: formattedDate } });
  }, [venta]);

  useEffect(() => {
    // Simula una carga de 2 segundos (ajusta según tus necesidades)
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const initialFormState = {
    id: venta.id,
    productos: venta.lista,
    fecha: "",
    clienteId: venta.cli && venta.cli.id,
    total: venta.total,
  };

  console.log("EL INITIAL STATE: ", initialFormState);

  const { fecha, clienteId, onInputChange } = useForm(initialFormState);

  // const buscarCliente = (id) => {
  //   const elCli =   losClientes.filter((elCli) => elCli.id === id);
  //   const cliente = elCli[0] || null;
  //   return cliente;
  // };

  const buscarCliente = async (id) => {
    // Simulando una operación asincrónica
    await new Promise((resolve) => setTimeout(resolve, 10));

    const elCli = losClientes.filter((elCli) => elCli.id == id);
    const cliente = elCli[0] || null;
    return cliente;
  };

  const handleProductoSeleccionado = async (event) => {
    console.log("SE SELECCIONÓ");

    try {
      const productoId = event.target.value;

      const buscandoAlProducto = async () => {
        // Simulando una operación asincrónica
        await new Promise((resolve) => setTimeout(resolve, 10));
        const elBelloProducto = PRODUCTOS.filter((pro) => pro.id == productoId);
        return elBelloProducto[0] || "No se encontró el producto";
      };
      const elProducto = await buscandoAlProducto();
      console.log("EL PRODUCTO SELECCIONADO: ", elProducto);

      // Verificar si el producto ya está en la lista
      if (
        elProducto &&
        !productosSeleccionados.some((prod) => prod.id == productoId)
      ) {
        setProductosSeleccionados([
          ...productosSeleccionados,
          { ...elProducto, cantidad: 1 }, // Agregar cantidad inicial
        ]);
      }
    } catch (error) {
      console.log("el error feo: ", error);
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

  const ProductosFiltrados =
    PRODUCTOS &&
    PRODUCTOS.filter(
      (elProducto) => elProducto.estado && elProducto.stock != 0
    );
  const usuariosFiltrados =
    losClientes && losClientes.filter((elCli) => elCli.estado);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Agregar lógica para manejar el envío del formulario aquí
    // console.log("Formulario enviado:", {
    //   id: "1",

    //   fecha, // Puedes utilizar un formato de fecha adecuado para tu aplicación
    //   clienteId,

    //   productosSeleccionados,
    //   totalFinal,
    // });

    let response;
    let funca;
    try {
      console.log("EL cliente ID ACA: ", clienteId);
      console.log("LA VENTA.cli.id: ", venta.cli.id);
      const cuerpo = {
        id: elId,
        lista: productosParaEnviar,
        fecha,
        total: totalFinal,
        cli: await buscarCliente(clienteId),
      };

      console.log("EL BELLO CUERPO: ", cuerpo);
      response = await axios.put(`http://localhost:5000/venta/update`, cuerpo);
      response.status === 200 ? (funca = true) : (funca = false);
      console.log("LA RESPONSE: ", response);
    } catch (error) {
      console.log("EL ERROR: ", error);
    }

    {
      funca
        ? Swal.fire({
            position: "center",
            icon: "success",
            title: "Venta Modificada Con Exito",
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
    }

    setTimeout(() => {
      router.push("/ventas");
    }, 2000);

    // 2000 milisegundos = 2 segundos
  };

  return (
    <>
      {loading ? (
        <Skeleton height={100} count={5} />
      ) : (
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
                  // //   placeholder="Ingresa Nombre del Producto"
                  // //   name="nombre"
                  // //   value={nombre}
                  // //   onChange={onInputChange}
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
                  // defaultValue={(venta && venta.cli.id) || 2}
                  onChange={onInputChange}
                >
                  <option>Selecciona Nuevo Cliente</option>
                  {usuariosFiltrados.map((cliente) => (
                    <option
                      value={cliente.id}
                      key={cliente.id}
                      // selected={cliente.id == venta.cli.id}
                    >
                      {cliente.id} {cliente.nombre}
                    </option>
                  ))}
                </select>
                <p className="text-center">
                  Id del cliente Antiguo de la venta: {venta.cli.id}{" "}
                </p>
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
                Modificar VENTA
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
      )}
    </>
  );
};

export default EditVentaPage;
