export interface ObreroI{

        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
        foto: string;
        id: string;
        checked? : boolean;

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
//formato sugerido: 2022-02-20 ion-date

