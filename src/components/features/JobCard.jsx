import Card from '../common/Card';
import Badge from '../common/Badge';
import './JobCard.css';

export default function JobCard({ job }) {
    return (
        <Card className="job-card" variant="hover">
            <div className="job-card-header">
                <div className="job-card-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                </div>
                {job.isNew && <Badge variant="success">Nouveau</Badge>}
            </div>

            <div className="job-card-details">
                <div className="job-detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{job.location}</span>
                </div>
                <div className="job-detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <span>{job.type}</span>
                </div>
                {job.salary && (
                    <div className="job-detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>{job.salary}</span>
                    </div>
                )}
            </div>

            <div className="job-card-footer">
                <span className="job-time">{job.timeAgo}</span>
            </div>
        </Card>
    );
}
