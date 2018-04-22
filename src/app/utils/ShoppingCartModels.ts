
export interface ShoppingCartResponse{
    messageGenerationTime:Date,
    payload:ShoppingCart;
}

export interface ShoppingCart{
    id:number;
    client:number;
    items:ShoppingCartItem[];
}

export interface ShoppingCartItem{
    id:number;
    productId:number;
    quantity:number;
}