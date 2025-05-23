export interface ObreroI{

        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
        foto: string;
        id: string;
        checked? : 'Presente' | 'Ausente';
        obs?: boolean;

}

export interface HerramientaI{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    id: string;
}

export interface MaterialI{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    id: string;

}
export interface EquipoI{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    id: string;
}

export interface PedidoI{
    obrero: any;
    obreroAp: any;
    pedido: any;
    estado: 'pedido'| 'devuelto';
    fecha:Date| any;
    id: string;
    tipo: any;

}

export interface AsistenciaI{
  nombre: string;
  apellido: string;
  checked: 'Presente' | 'Ausente';
  fecha: Date | any;
  id: string;
  observaciones?: string;
  justfoto?: string;
  obs?: boolean;

}

