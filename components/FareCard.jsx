import { Bus, Car, Train, Gauge } from 'lucide-react';
import styles from './FareCard.module.css';

const getIcon = (type) => {
    switch (type?.toLowerCase()) {
        case 'bus': return <Bus size={20} />;
        case 'car': return <Car size={20} />;
        case 'train': return <Train size={20} />;
        default: return <Gauge size={20} />;
    }
};

const getColor = (type) => {
    switch (type?.toLowerCase()) {
        case 'bus': return '#3b82f6';
        case 'car': return '#10b981';
        case 'train': return '#f59e0b';
        default: return '#64748b';
    }
}

export default function FareCard({ trip }) {
    const { type, title, time, amount } = trip;
    const color = getColor(type);

    return (
        <div className={styles.card}>
            <div className={styles.iconBox} style={{ backgroundColor: `${color}20`, color: color }}>
                {getIcon(type)}
            </div>
            <div className={styles.details}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.time}>{time}</p>
            </div>
            <div className={styles.amount}>
                ₦{amount.toLocaleString()}
            </div>
        </div>
    );
}
