import { NavLink } from 'react-router-dom';

const Toolbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">Quotes Central</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Quotes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/new-quote" className="nav-link">Submit new quote</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
