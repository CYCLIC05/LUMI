import { useState } from 'react';
import styles from './SummaryCard.module.css';

export default function SummaryCard({ total, percentage, limit, onSetLimit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputLimit, setInputLimit] = useState(limit);

    const handleSave = () => {
        onSetLimit(Number(inputLimit));
        setIsEditing(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.label}>Total Spent Today</span>
                <span className={styles.percentage}>{percentage}%</span>
            </div>
            <div className={styles.balance}>
                ₦{total.toLocaleString()}
                {limit > 0 && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: 10 }}> / ₦{limit.toLocaleString()}</span>}
            </div>

            {/* Progress Bar */}
            {limit > 0 && (
                <div className={styles.progressBarContainer}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: percentage >= 100 ? '#ef4444' : '#3b82f6',
                        borderRadius: 3,
                        transition: 'width 0.5s ease'
                    }}></div>
                </div>
            )}

            {isEditing ? (
                <div style={{ display: 'flex', gap: 10, marginTop: 10, justifyContent: 'center' }}>
                    <input
                        type="number"
                        className={styles.inputField}
                        value={inputLimit}
                        onChange={(e) => setInputLimit(e.target.value)}
                        placeholder="Limit"
                    />
                    <button onClick={handleSave} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '5px 15px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem' }}>Save</button>
                    <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
                </div>
            ) : (
                <button className={styles.limitBtn} onClick={() => setIsEditing(true)}>
                    {limit > 0 ? "Edit Daily Limit" : "Set Daily Limit"}
                </button>
            )}
        </div>
    );
}
