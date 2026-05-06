import EstadoPedido from '../EstadoPedido';
import PedidoConfirmado from './PedidoConfirmado';
import Cancelado from './Cancelado';

// Estado inicial del pedido cuando es creado por el usuario
class PedidoCreado extends EstadoPedido {
  // Avanza al estado de confirmación
  avanzarEstado() {
    this.pedido.setEstado(new PedidoConfirmado(this.pedido));
  }

  // Cancela el pedido y lo mueve al estado cancelado
  cancelarPedido() {
    this.pedido.setEstado(new Cancelado(this.pedido));
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Pedido Creado';
  }

  // Retorna la descripción del estado para mostrar al usuario
  getDescripcion() {
    return '✅ Tu pedido ha sido creado. Esperando confirmación.';
  }

  // Permite cancelar el pedido en este estado
  puedeCancelar() {
    return true;
  }
}

export default PedidoCreado;
