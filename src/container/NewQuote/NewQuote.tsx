import React, { ChangeEvent, useState } from "react";
import { QuoteCustomer } from "../../types.tsx";
import axiosApi from "../../axiosApi.ts";
import { useNavigate } from "react-router-dom";

const NewQuote = () => {
    const navigate = useNavigate();
    const [quote, setQuote] = useState<QuoteCustomer>({
        author: "",
        category: "",
        information: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setQuote(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);

            const quoteData = {
                ...quote,
            };

            await axiosApi.post('/quotes.json', quoteData);
            navigate("/");
        } catch (error) {
            console.error('Error while adding new quote:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="container" onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="category" className="form-label mb-2 text-primary">Category</label>
                <select className="form-select"
                        id="category"
                        name="category"
                        value={quote.category}
                        onChange={onFieldChange}
                        required>
                    <option value="">Choose category...</option>
                    <option value="star">Star Wars</option>
                    <option value="famous">Famous people</option>
                    <option value="saying">Saying</option>
                    <option value="humor">Humor</option>
                    <option value="motivation">Motivation</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="author" className="form-label mb-2 text-primary">Author</label>
                <input
                    required
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Enter author"
                    value={quote.author}
                    onChange={onFieldChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="information" className="form-label mb-2 text-primary">Quote text</label>
                <textarea
                    className="form-control"
                    id="information"
                    name="information"
                    placeholder="Enter quote text"
                    value={quote.information}
                    onChange={onFieldChange}
                    rows={5}
                />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>Add</button>
        </form>
    );
};

export default NewQuote;