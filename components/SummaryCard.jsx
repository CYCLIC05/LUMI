import styles from './SummaryCard.module.css';

export default function SummaryCard({ total, percentage }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.label}>Total Spent Today</span>
                <span className={styles.percentage}>{percentage}%</span>
            </div>
            <div className={styles.balance}>
                ₦{total.toLocaleString()}
            </div>
            <button className={styles.limitBtn}>
                Set Daily Limit
            </button>
        </div>
    );
}
