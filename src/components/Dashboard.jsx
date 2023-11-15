import React from "react";
import CajitasDash from "./CajitasDash";

const Dashboard = () => {
  return (
    <div className="mt-20">
      <div className="">
        <div className="ml-10 font-bold text-5xl">
          <h1>Dashboard</h1>
        </div>
        <div className="flex mx-32 gap-5  mt-20 justify-between items-center xl:flex-nowrap flex-wrap">
          <CajitasDash
            logo="shoppingBag"
            numero="25"
            titulo="Productos Totales"
            ruta={"/products"}
          />
          <CajitasDash
            logo="user"
            numero="84"
            titulo="Usuarios Totales"
            ruta="/users"
          />
          <CajitasDash
            logo="vipCrown"
            numero="25"
            titulo="Usuarios VIP"
            ruta="/"
          />
          <CajitasDash
            logo="shoppingCart"
            numero="361"
            titulo="Ventas Realizadas"
            ruta="/ventas"
          />
        </div>
        <div className="flex mx-32 gap-5  mt-20 justify-between items-center xl:flex-nowrap flex-wrap">
          <CajitasDash logo="altaProducto" titulo="Ingresar Producto" />
          <CajitasDash logo="altausuario" titulo="Ingresar Usuario" />
          <CajitasDash logo="buscar" titulo="Buscar" />
          <CajitasDash logo="altaVenta" titulo="Ingresar Venta" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
