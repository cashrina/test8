import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    quoteInfo: string;
    quoteId: string;
}

const QuotesItem: React.FC<Props> = ({ quoteInfo, quoteId }) => {
    return (
        <div className="card shadow-lg mb-4 border-primary-subtle border-3" style={{width:'60%'}}>
            <div className="card-body d-flex flex-row align-items-center justify-content-between">
                <p className="card-text">"{quoteInfo}"</p>
                <div>
                    <NavLink to={`/quotes/${quoteId}/edit`} className="btn btn-primary">
                        Edit
                    </NavLink>
                    <button className="btn btn-danger ms-2">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default QuotesItem;
