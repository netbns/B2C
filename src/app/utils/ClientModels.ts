export interface ClientResponse{
	messageGenerationTime:Date;
	payload:Client;
}

export interface Client{
    id:number;
    names: string;
	lastNames: string;
	phoneNumber: string;
	email: string;
	creditCardType: string;
	creditCardNumber: string;
	status: string;
	addresses:Address[];
	password:string;
}

export interface Address {
    id:number;
	street:string;
	state:string;
	zipCode:string;
	country:string;
	addresType:string;
	city:string;   		
}