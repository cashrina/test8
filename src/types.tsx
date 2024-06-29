export interface QuoteCustomer {
    id: string;
    author: string,
    category: string,
    information: string,
}

export interface Quote {
    author: string,
    category: string,
    information: string,
}

export interface ApiQuote {
    [id: string]: QuoteCustomer;
}