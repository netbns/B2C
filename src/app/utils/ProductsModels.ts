export interface Producto{
    productoId:number;
    productoCodigo:string;
    productoNombre:string;
    productoDescripcion:string;
    productoImagen:string;
    espectaculo:Espectaculo;
    espectaculoId:number;
    lodging:Lodging;
    lodgingId:number;
    transporte:Transporte;
    transporteId:number;
    productoArrivalDate:Date;
    productoDepartureDate:Date;
    ciudadOrigen:Ciudad;
    ciudadOrigenId:number;
    ciudadDestino:Ciudad;
    ciudadDestinoId:number;
    href:string;
}

export interface Espectaculo{
    espectaculoId:number;
    espectaculoNombre:string;
    espectaculoDescripcion:string;
    espectaculoCosto:number;
}

export interface Lodging{
    lodgingId:number;
    lodgingNombre:string;
    lodgingCosto:number;
}

export interface Transporte{
    transporteId:number;
    transporteNombre:string;
    transporteDescripcion:string;
    transporteCosto:number;
}
export interface Ciudad{
    ciudadId:number;
    ciudadNombre:string;
    ciudadCodigo:string;
    pais:Pais;
}

export interface Pais{
    paisId:number;
    paisCodigo:string;
    paisNombre:string;
}

export interface FilterResponse {
    totalLength:number;
    resultSet:Producto[];
}