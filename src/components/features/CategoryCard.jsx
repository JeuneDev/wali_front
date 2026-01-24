import Card from '../common/Card';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
    return (
        <Card className="category-card" variant="hover">
            <div className="category-icon">
                {category.icon}
            </div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-count">{category.count}</p>
        </Card>
    );
}
