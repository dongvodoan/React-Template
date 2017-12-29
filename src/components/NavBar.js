import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Sep = () => <span> | </span>;

class NavBar extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link> <Sep />
                <Link to="/catalog">Catalog</Link> <Sep />
                <Link to="/another">Another</Link> <Sep />
                <Link to="/nested">Nested</Link>
                <Link to="/protected">Protected</Link>
                <hr/>
            </div>
        );
    }
}

export default NavBar;
