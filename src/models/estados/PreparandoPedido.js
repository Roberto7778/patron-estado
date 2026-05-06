import EstadoPedido from '../EstadoPedido';
import ListoParaRecoger from './ListoParaRecoger';
import Cancelado from './Cancelado';

// Estado cuando el restaurante está preparando el pedido
class PreparandoPedido extends EstadoPedido {
  // Avanza al estado de listo para recoger
  avanzarEstado() {
    this.pedido.setEstado(new ListoParaRecoger(this.pedido));
  }

  // Cancela el pedido y lo mueve al estado cancelado
  cancelarPedido() {
    this.pedido.setEstado(new Cancelado(this.pedido));
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Preparando Pedido';
  }

  // Retorna la descripción del estado para mostrar al usuario
  getDescripcion() {
    return '👨‍🍳 El chef está preparando tu comida...';
  }

  // Permite cancelar el pedido en este estado
  puedeCancelar() {
    return true;
  }
}

export default PreparandoPedido;
