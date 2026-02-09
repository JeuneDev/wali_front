import { useId } from 'react';
import './Input.css';

export default function Input({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = '',
    label,
    id,
    className = '',
    icon,
    ...props
}) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={inputId}
                    type={type}
                    className={`input ${error ? 'input--error' : ''} ${icon ? 'input--with-icon' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    );
}
