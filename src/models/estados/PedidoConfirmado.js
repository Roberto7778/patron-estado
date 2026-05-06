import EstadoPedido from '../EstadoPedido';
import PreparandoPedido from './PreparandoPedido';
import Cancelado from './Cancelado';

// Estado cuando el pedido ha sido confirmado
class PedidoConfirmado extends EstadoPedido {
  // Avanza al estado de preparación
  avanzarEstado() {
    this.pedido.setEstado(new PreparandoPedido(this.pedido));
  }

  // Cancela el pedido
  cancelarPedido() {
    this.pedido.setEstado(new Cancelado(this.pedido));
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Pedido Confirmado';
  }

  // Retorna la descripción del estado
  getDescripcion() {
    return '📝 Pedido confirmado. El restaurante ha recibido tu orden.';
  }

  // Permite cancelar el pedido
  puedeCancelar() {
    return true;
  }
}

export default PedidoConfirmado;
