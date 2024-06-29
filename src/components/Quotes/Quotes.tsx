import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { ApiQuote, QuoteCustomer } from "../../types.tsx";
import QuotesItem from "./QuotesItem/QuotesItem.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";

const Quotes = () => {
    const navigate = useNavigate();
    const { category } = useParams<{ category?: string }>();
    const [mainQuoteList, setMainQuoteList] = useState<QuoteCustomer[]>([]);
    const [loading, setLoading] = useState(false);

    const CATEGORY = [
        { title: "Star Wars", id: "star-wars" },
        { title: "Famous people", id: "famous-people" },
        { title: "Humor", id: "humor" },
        { title: "Saying", id: "saying" },
        { title: "Motivation", id: "motivation" },
    ];

        const fetchQuotes = useCallback(async () => {
            setLoading(true);
            try {
                let response;
                if (category) {
                    response = await axiosApi.get<ApiQuote | null>(
                        `/quotes.json?orderBy="category"&equalTo="${category}"`
                    );
                } else {
                    response = await axiosApi.get<ApiQuote | null>(`/quotes.json`);
                }
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
                console.error('Error fetching quotes:', error);
                setMainQuoteList([]);
            } finally {
                setLoading(false);
            }
        }, [category]);

        useEffect(() => {
            void fetchQuotes();
        }, [fetchQuotes, category]);

        const handleDeleteQuote = async (quoteId: string) => {
            try {
                await axiosApi.delete(`/quotes/${quoteId}.json`);
                const updatedQuotes = mainQuoteList.filter((quote) => quote.id !== quoteId);
                setMainQuoteList(updatedQuotes);
                void fetchQuotes();
                navigate('/');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        };

        if (loading) {
            return <div>Loading...</div>;
        }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <ul className="list-group">
                        {CATEGORY.map((cat) => (
                            <li
                                key={cat.id}
                                className={`list-group-item ${category === cat.id ? 'active' : ''}`}
                            >
                                <NavLink to={`/quotes/${cat.id}`}
                                         className={category === cat.id ? 'text-light' : 'text-primary'}>
                                    {cat.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {mainQuoteList.map((quote) => (
                            <div key={quote.id} className="col-md-12 mb-4">
                                <QuotesItem
                                    quoteInfo={quote.information}
                                    quoteId={quote.id}
                                    onDelete={() => handleDeleteQuote(quote.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quotes;
