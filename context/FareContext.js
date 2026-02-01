"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const FareContext = createContext();

export function FareProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [currency, setCurrency] = useState('NGN');

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('lumi-fares');
        if (saved) {
            try {
                setTransactions(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse transactions", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('lumi-fares', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        const newTx = { ...transaction, id: Date.now().toString(), date: new Date().toISOString() };
        setTransactions(prev => [newTx, ...prev]);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const getTotalToday = () => {
        const today = new Date().toDateString();
        return transactions
            .filter(t => new Date(t.date).toDateString() === today)
            .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    };

    return (
        <FareContext.Provider value={{ transactions, addTransaction, deleteTransaction, getTotalToday }}>
            {children}
        </FareContext.Provider>
    );
}

export const useFare = () => useContext(FareContext);
