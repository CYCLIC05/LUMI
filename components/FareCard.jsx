import Link from 'next/link';
import { Bus, Car, Train, Gauge, Edit2, Trash2 } from 'lucide-react';
import styles from './FareCard.module.css';
import { useFare } from '@/context/FareContext';
import { useRouter } from 'next/navigation';

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
    const { type, title, time, amount, id } = trip;
    const color = getColor(type);
    const { deleteTransaction } = useFare();
    const router = useRouter();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Delete this trip?')) {
            deleteTransaction(id);
        }
    };

    return (
        <Link href={`/edit/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
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
        </Link>
    );
}
