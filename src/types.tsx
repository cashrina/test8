export interface QuoteCustomer {
    author: '',
    category: '',
    information: '',
}

export interface ApiQuote {
    [id: string]: QuoteCustomer;
}