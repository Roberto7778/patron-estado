import EstadoPedido from '../EstadoPedido';
import RepartidorAsignado from './RepartidorAsignado';

// Estado cuando el pedido está listo para recoger
class ListoParaRecoger extends EstadoPedido {
  // Avanza al estado de repartidor asignado
  avanzarEstado() {
    this.pedido.setEstado(new RepartidorAsignado(this.pedido));
  }

  // No permite cancelar el pedido
  cancelarPedido() {
    throw new Error('No se puede cancelar el pedido en este estado');
  }

  // Retorna el nombre del estado
  getNombre() {
    return 'Listo para Recoger';
  }

  // Retorna la descripción del estado
  getDescripcion() {
    return '📦 Tu pedido está listo. Buscando repartidor...';
  }

  // No permite cancelar
  puedeCancelar() {
    return false;
  }
}

export default ListoParaRecoger;
