// Clase base abstracta para todos los estados del pedido
// Define el contrato que deben seguir todos los estados
class EstadoPedido {
  constructor(pedido) {
    this.pedido = pedido;
  }

  // Método abstracto para avanzar al siguiente estado
  avanzarEstado() {
    throw new Error(`Método avanzarEstado debe ser implementado`);
  }

  // Método abstracto para cancelar el pedido
  cancelarPedido() {
    throw new Error(`Método cancelarPedido debe ser implementado`);
  }

  // Método abstracto para obtener el nombre del estado
  getNombre() {
    throw new Error(`Método getNombre debe ser implementado`);
  }

  // Método abstracto para obtener la descripción del estado
  getDescripcion() {
    throw new Error(`Método getDescripcion debe ser implementado`);
  }

  // Por defecto, los pedidos no se pueden cancelar
  puedeCancelar() {
    return false;
  }
}

export default EstadoPedido;
