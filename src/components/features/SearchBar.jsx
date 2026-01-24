import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('Toute la Guinée');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch({ keyword, location });
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-bar-inputs">
                <div className="search-input-wrapper">
                    <Input
                        type="text"
                        placeholder="Ex: Développeur web, comptable..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        }
                    />
                </div>
                <div className="search-input-wrapper">
                    <select
                        className="location-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="Toute la Guinée">Toute la Guinée</option>
                        <option value="Conakry">Conakry</option>
                        <option value="Kankan">Kankan</option>
                        <option value="Labé">Labé</option>
                        <option value="Nzérékoré">Nzérékoré</option>
                        <option value="Kindia">Kindia</option>
                    </select>
                </div>
            </div>
            <Button type="submit" variant="primary" size="large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                Rechercher
            </Button>
        </form>
    );
}
