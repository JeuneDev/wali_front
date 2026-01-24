import './Card.css';

export default function Card({
    children,
    variant = 'default',
    onClick,
    className = '',
    ...props
}) {
    const isClickable = !!onClick;

    return (
        <div
            className={`card card--${variant} ${isClickable ? 'card--clickable' : ''} ${className}`}
            onClick={onClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            {...props}
        >
            {children}
        </div>
    );
}
