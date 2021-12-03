export interface Obrero{
   
        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
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
    obrero: string;
    pedido: string;
    estado: 'pedido'| 'devuelto';
    fecha: string;
    id: string;

}