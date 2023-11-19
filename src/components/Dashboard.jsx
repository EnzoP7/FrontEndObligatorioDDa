"use client";
import React from "react";
import CajitasDash from "./CajitasDash";
import PRODUCTOS from "@/data/productos";
import VENTAS from "@/data/ventas";
import UsuariosVip from "@/data/VIP";
import clientes from "@/data/clientes";

const Dashboard = () => {
  const CLIENTES = clientes();
  const USUARIOSVIP = UsuariosVip();

  const cantidadDeProductos = PRODUCTOS.length;
  const cantidadDeUsuarios = CLIENTES.length;

  const CantidadVentas = VENTAS.length;

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
            numero={CantidadVentas}
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
