import './Badge.css';

export default function Badge({
    children,
    variant = 'neutral',
    size = 'medium',
    className = '',
    ...props
}) {
    return (
        <span
            className={`badge badge--${variant} badge--${size} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
