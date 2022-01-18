export interface Obrero{

        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
        foto: string;
        id: string;

}

export interface Herramientas{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    id: string;
}

export interface Materiales{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    unidadmedida: string;
    id: string;

}
export interface Equipos{
    foto: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    fechacompra: string;
    id: string;
}

export interface Pedidos{
    obrero: any;
    pedido: any;
    estado: 'pedido'| 'devuelto';
    fecha: any;
    id: string;
    tipo: any;

}
