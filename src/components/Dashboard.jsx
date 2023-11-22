"use client";
import React from "react";
import CajitasDash from "./CajitasDash";
import PRODUCTOS from "@/data/productos";

import UsuariosVip from "@/data/VIP";
import losClientes from "@/data/clientes";
import losProductos from "@/data/productos";
import ventas from "@/data/ventas";

const Dashboard = () => {
  const CLIENTES = losClientes();
  const USUARIOSVIP = UsuariosVip();
  const PRODUCTOS = losProductos();

  const cantidadDeProductos = PRODUCTOS.length;
  const cantidadDeUsuarios = CLIENTES.length;

  const CantidadVentas = ventas();

  return (
    <div className="mt-20">
      <div className="">
        <div className="flex mx-32 gap-5  mt-20 justify-between items-center xl:flex-nowrap flex-wrap">
          <CajitasDash
            logo="shoppingBag"
            numero={cantidadDeProductos}
            titulo="Productos Totales"
            ruta={"/products"}
          />
          <CajitasDash
            logo="user"
            numero={cantidadDeUsuarios}
            titulo="Usuarios Totales"
            ruta="/users"
          />
          <CajitasDash
            logo="vipCrown"
            numero={USUARIOSVIP.length}
            titulo="Usuarios VIP"
            ruta="/"
          />
          <CajitasDash
            logo="shoppingCart"
            numero={CantidadVentas.length}
            titulo="Ventas Realizadas"
            ruta="/ventas"
          />
        </div>
        <div className="flex mx-32 gap-5  mt-20 justify-between items-center xl:flex-nowrap flex-wrap">
          <CajitasDash
            logo="altaProducto"
            titulo="Ingresar Producto"
            ruta="/products/createProduct"
          />
          <CajitasDash
            logo="altausuario"
            titulo="Ingresar Usuario"
            ruta="/users/createUser"
          />
          {/* <CajitasDash logo="buscar" titulo="Buscar" /> */}
          <CajitasDash
            logo="altaVenta"
            titulo="Ingresar Venta"
            ruta="/ventas/createVenta"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
