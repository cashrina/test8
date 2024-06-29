import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosApi from "../../../axiosApi.ts";

interface Props {
    quoteInfo: string;
    quoteId: string;
    onDelete: () => void;
}

const QuotesItem: React.FC<Props> = ({ quoteInfo, quoteId, onDelete }) => {
    const navigate = useNavigate();

    const deleteQuote = async () => {
        try {
            await axiosApi.delete(`/quotes/${quoteId}.json`);
            onDelete();
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="card shadow-lg mb-4 border-primary-subtle border-3" style={{width: "100%"}}>
            <div className="card-body d-flex flex-row justify-content-between">
                <p className="card-text" style={{width: "70%"}}>"{quoteInfo}"</p>
                <div className="ms-auto">
                    <NavLink to={`/quotes/${quoteId}/edit`} className="btn btn-primary me-2">
                        Edit
                    </NavLink>
                    <button className="btn btn-danger" onClick={deleteQuote}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuotesItem;
