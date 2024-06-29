import {ChangeEvent, useState} from "react";
import {QuoteCustomer} from "../../types.tsx";


// const IAddQuote = {
//     quote : {
//         author: '',
//         category: '',
//         information: '',
//     }
// }

const NewQuote = () => {
    const [quote, setQuote] = useState<QuoteCustomer>({
        quote: {
            author: "",
            category: "",
            information: ""}
    });


    const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;

        setQuote(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    return  (
        <form className="container" >
            <div className="mb-3">
                <label htmlFor="category" className="form-label mb-2 text-primary">Category</label>
                <select className="form-select"
                        aria-label="Default select example"
                        value={quote.quote.category}
                        onChange={onFieldChange}
                        required>
                    <option selected className="fw-lighter">Open this select menu</option>
                    <option value="star">Star Wars</option>
                    <option value="famous">Famous people</option>
                    <option value="saying">Saying</option>
                    <option value="humor">Humor</option>
                    <option value="motivation">Motivation</option>
                </select>
            </div>


            <div className="mb-3">
                <label htmlFor="title" className="form-label mb-2 text-primary">Author</label>
                <input
                    required
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={quote.quote.author}
                    onChange={onFieldChange}
                    style={{cursor: "pointer"}}
                />
            </div>
            <div className="mb-3">
            <label htmlFor="information" className="form-label mb-2 text-primary">Quote text</label>
                <textarea
                    className="form-control"
                    id="information"
                    name="information"
                    placeholder="Enter information"
                    value={quote.quote.information}
                    onChange={onFieldChange}
                    style={{height: "100px", cursor: "pointer"}}
                />
            </div>
            <div>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
};

export default NewQuote;