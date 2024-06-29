import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {Quote, QuoteCustomer} from "../../types.tsx";
import axiosApi from "../../axiosApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spiner.tsx";

const QUOTE = {
    author: '',
    category: '',
    information: '',
};

const NewQuote = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quote, setQuote] = useState<Quote>(QUOTE);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const fetchOneQuote = useCallback(async (id: string) => {
        setIsFetching(true);
        try {
            const response = await axiosApi.get<QuoteCustomer | null>(`/quotes/${id}.json`);
            if (response.data) {
                setQuote(response.data);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            void fetchOneQuote(id);
        } else {
            setQuote(QUOTE)
        }
    }, [id, fetchOneQuote]);

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

            if (id !== undefined) {
                await axiosApi.put(`/quotes/${id}.json`, quoteData);
            } else {
                await axiosApi.post('/quotes.json', quoteData);

            }
            setQuote(QUOTE)
            navigate("/");
        } catch (error) {
            console.error('Error while adding/editing quote:', error);
        } finally {
            setIsLoading(false);
        }
    };

    let form = (<form className="container" onSubmit={onFormSubmit}>
        <h1 className="text-primary text-center">{id ? 'Edit Quote' : 'Create a new Quote'}</h1>
        <div className="mb-3">
            <label htmlFor="category" className="form-label mb-2 text-primary">Category</label>
            <select className="form-select"
                    id="category"
                    name="category"
                    value={quote.category}
                    onChange={onFieldChange}
                    required>
                <option value="" className="fw-lighter text-secondary">Choose category...</option>
                <option value="star-wars">Star Wars</option>
                <option value="famous-people">Famous people</option>
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

        {id !== undefined ? (
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Save</button>
        ) : (
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Add</button>
        )}
    </form>);


    if (isLoading) {
        form = (
            <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
                <Spinner/>
            </div>
        );
    }

    return isFetching ? isFetching : (
        <div className="container">
            <div className="row mt-2 justify-content-center">
                <div className="col-lg-6">
                    {form}
                </div>
            </div>
        </div>
    );
};

export default NewQuote;
