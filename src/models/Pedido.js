import PedidoCreado from './estados/PedidoCreado';

// Clase principal que gestiona el pedido y sus estados
class Pedido {
  // Inicializa el pedido con estado creado
  constructor(items = [], total = 0) {
    this.items = items;
    this.total = total;
    this.metodoPago = null;
    this.pagoAprobado = false;
    this.estadoActual = new PedidoCreado(this);
    this.historialEstados = [this.estadoActual.getNombre()];
  }

  // Cambia el estado actual y guarda en historial
  setEstado(estado) {
    this.estadoActual = estado;
    this.historialEstados.push(estado.getNombre());
  }

  // Avanza al siguiente estado
  avanzarEstado() {
    try {
      this.estadoActual.avanzarEstado();
      return { success: true, message: 'Estado actualizado' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Cancela el pedido
  cancelarPedido() {
    try {
      this.estadoActual.cancelarPedido();
      return { success: true, message: 'Pedido cancelado' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Getters del estado actual
  getEstadoNombre() {
    return this.estadoActual.getNombre();
  }

  getEstadoDescripcion() {
    return this.estadoActual.getDescripcion();
  }

  puedeCancelar() {
    return this.estadoActual.puedeCancelar();
  }

  // Métodos de pago
  setMetodoPago(metodo) {
    this.metodoPago = metodo;
    if (metodo === 'efectivo') {
      this.pagoAprobado = true;
    } else {
      this.pagoAprobado = false;
    }
  }

  aprobarPagoTarjeta() {
    if (this.metodoPago === 'tarjeta') {
      this.pagoAprobado = true;
      return true;
    }
    return false;
  }

  pagarEnEfectivo() {
    if (this.metodoPago === 'efectivo') {
      console.log('Pago en efectivo procesado en la entrega');
      return true;
    }
    return false;
  }

  // Verifica si puede avanzar según el pago
  puedeAvanzar() {
    if (this.metodoPago === 'tarjeta' && !this.pagoAprobado && 
        (this.getEstadoNombre() === 'Pedido Creado' || 
         this.getEstadoNombre() === 'Pedido Confirmado')) {
      return false;
    }
    return true;
  }
}

export default Pedido;
