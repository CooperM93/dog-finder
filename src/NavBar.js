import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-link"><Link className="nav-link" exact to='/'>Home</Link></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.props.dogs.map(d => (
                                    <Link className="dropdown-item" key={d.id} exact to={`/dog/${d.name}`}>{d.name}</Link>
                                ))}
                            </div>
                        </li>
                        <li className="nav-item nav-link"><Link className="nav-link" exact to='/'>Back</Link></li>
                    </ul>
                </div>
          </nav>
        )
    }
}

export default NavBar;