import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import NewQuote from "./container/NewQuote/NewQuote";
import Quotes from "./components/Quotes/Quotes";

const App = () => {
    return (
        <>
            <header><Toolbar /></header>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Quotes />} />
                    <Route path="/new-quote" element={<NewQuote />} />
                    <Route path="/quotes/:id/edit" element={<NewQuote />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
