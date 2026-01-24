import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

export default function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}
