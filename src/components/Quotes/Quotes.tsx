import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { ApiQuote, QuoteCustomer } from "../../types.tsx";
import QuotesItem from "./QuotesItem/QuotesItem.tsx";

const Quotes = () => {
    const [mainQuoteList, setMainQuoteList] = useState<QuoteCustomer[]>([]);

    const fetchQuotes = useCallback(async () => {
        try {
            const response = await axiosApi.get<ApiQuote | null>("/quotes.json");
            const quotesData = response.data;

            if (quotesData) {
                const quotes = Object.keys(quotesData).map((id: string) => ({
                    ...quotesData[id],
                    id,
                }));
                setMainQuoteList(quotes);
            } else {
                setMainQuoteList([]);
            }
        } catch (error) {
            console.error("Error fetching quotes:", error);
            setMainQuoteList([]);
        }
    }, []);

    useEffect(() => {
        void fetchQuotes();
    }, [fetchQuotes]);

    const handleDeleteQuote = async (quoteId: string) => {
        try {
            await axiosApi.delete(`/quotes/${quoteId}.json`);
            const updatedQuotes = mainQuoteList.filter(quote => quote.id !== quoteId);
            setMainQuoteList(updatedQuotes);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            {mainQuoteList.map((quote, index) => (
                <QuotesItem key={index} quoteInfo={quote.information} quoteId={quote.id} onDelete={() => handleDeleteQuote(quote.id)} />
            ))}
        </div>
    );
};

export default Quotes;
