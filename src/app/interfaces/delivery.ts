export interface Delivery {
    cliente_destino: Cliente;
    cliente_origem: Cliente;
    documento: string;
    id: string;
    motorista: Motorista;
    status_entrega: string;
}

export interface Cliente {
    nome: string; 
    endereco: string; 
    bairro: string; 
    cidade: string;
}

export interface Motorista {
    nome: string;
}


