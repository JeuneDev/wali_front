import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo" onClick={closeMenu}>
                        <img src={logo} alt="Wali" className="logo-image" />
                    </Link>

                    {/* Burger Button */}
                    <button
                        className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation */}
                    <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                        <Link to="/" className="nav-link" onClick={closeMenu}>
                            Rechercher des offres
                        </Link>
                        <Link to="/entreprises" className="nav-link" onClick={closeMenu}>
                            Pour les entreprises
                        </Link>

                        {/* Actions - Mobile */}
                        <div className="header-actions-mobile">
                            <Button variant="text" size="medium" onClick={closeMenu}>
                                Connexion
                            </Button>
                            <Button variant="primary" size="medium" onClick={closeMenu}>
                                Inscription
                            </Button>
                        </div>
                    </nav>

                    {/* Actions - Desktop */}
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

            {/* Overlay for mobile menu */}
            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    );
}

