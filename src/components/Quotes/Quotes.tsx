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

    return (
        <div>
            {mainQuoteList. map((quote, index) => (
                <QuotesItem quoteInfo={quote.information} key={index}  />
            ))}
        </div>
    );
};

export default Quotes;
