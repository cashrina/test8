import NewQuote from "./container/NewQuote/NewQuote.tsx";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Quotes from "./components/Quotes/Quotes.tsx";

const App = () => {


  return (
    <>
        <header><Toolbar /></header>
        <div className="container mt-5">
            <Routes>
                <Route path="/" element={<Quotes/>} />
                <Route path="/new-quote" element={<NewQuote/>}/>
            </Routes>
        </div>
    </>
  )
};

export default App
