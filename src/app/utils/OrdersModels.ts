export interface Order{
    id:number;
    orderDate:Date;
    price:number;
    status:string;
    comments:string;
    client:number;
    items:OrderItem[];
}

export interface OrderItem{
    id:number;
    product:number;
    price:number;
    quantity:number;
    orderId:number;
}