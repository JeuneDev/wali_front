import { Link } from 'react-router-dom';
import Button from '../common/Button';
import logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <img src={logo} alt="Wali" className="logo-image" />
                    </Link>

                    {/* Navigation */}
                    <nav className="nav">
                        <Link to="/" className="nav-link">
                            Rechercher des offres
                        </Link>
                        <Link to="/entreprises" className="nav-link">
                            Pour les entreprises
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <Button variant="text" size="medium">
                            Connexion
                        </Button>
                        <Button variant="primary" size="medium">
                            Inscription
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
