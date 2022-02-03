export interface ObreroI{

        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
        foto: string;
        id: string;

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
    pedido: any;
    estado: 'pedido'| 'devuelto';
    fecha:Date| any;
    id: string;
    tipo: any;

}
