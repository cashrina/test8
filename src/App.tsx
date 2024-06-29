import { Routes, Route } from 'react-router-dom';
import Quotes from './components/Quotes/Quotes';
import NewQuote from './container/NewQuote/NewQuote';
import Toolbar from "./components/Toolbar/Toolbar.tsx";

const App = () => {
    return (
        <>
            <header><Toolbar /></header>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Quotes />} />
                    <Route path="/quotes/:category?" element={<Quotes />} />
                    <Route path="/new-quote" element={<NewQuote />} />
                    <Route path="/quotes/:id/edit" element={<NewQuote />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
