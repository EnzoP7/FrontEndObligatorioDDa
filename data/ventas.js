const VENTAS = [
  {
    id: "1",
    productos: [
      { productoId: "1", cantidad: 2 },
      { productoId: "2", cantidad: 1 },
    ],
    fecha: "2023-11-20", // Puedes utilizar un formato de fecha adecuado para tu aplicación
    clienteId: "1",
    total: "4000",
  },
  {
    id: "2",
    productos: [
      { productoId: "2", cantidad: 3 },
      { productoId: "3", cantidad: 2 },
    ],
    fecha: "2023-11-20",
    clienteId: "3",
    total: "4000",
  },
  {
    id: "3",
    productos: [{ productoId: "2", cantidad: 1 }],
    fecha: "2023-11-14",
    clienteId: "5",
    total: "4000",
  },
  // Agrega más ventas según sea necesario
];

export default VENTAS;
