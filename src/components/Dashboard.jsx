import React from "react";
import CajitasDash from "./CajitasDash";
import PRODUCTOS from "@/data/productos";
import CLIENTES from "@/data/clientes";
import VENTAS from "@/data/ventas";

const Dashboard = () => {
  const cantidadDeProductos = PRODUCTOS.length;
  const cantidadDeUsuarios = CLIENTES.length;
  const usuariosVIP = CLIENTES.filter((cliente) => cliente.vip).length;
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
            numero={usuariosVIP}
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
