export class Constants{

   private static DOT_NET_URL='http://186.147.87.87/';
   private static CLIENTS_BASE_URL='http://localhost:8181/';
   private static SHOPPING_CART_BASE_URL='http://localhost:8080/';
    
    public static get CAMPAIGNS_URL(): string { return Constants.DOT_NET_URL+'eas_webapi/api/Campaings'; };
    public static get PRODUCTS_URL(): string { return Constants.DOT_NET_URL+'eas_webapi/api/productos/'; };
    public static get CLIENTS_URL(): string { return Constants.CLIENTS_BASE_URL+'client/'; };
    public static get SHOPPING_CART_URL(): string { return Constants.SHOPPING_CART_BASE_URL+'shoppingcart/'; }; 
    public static get LOGIN_URL(): string { return Constants.CLIENTS_BASE_URL+'client/email/'; }; 
    public static get COUNTRIES_URL(): string { return '/assets/Countries.json'; };
    public static get ORDERS_URL(): string { return '/assets/Orders.json'; };

}