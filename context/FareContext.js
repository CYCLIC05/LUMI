"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const FareContext = createContext();

export function FareProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [currency, setCurrency] = useState('NGN');
    const [userName, setUserName] = useState('Traveler');
    const [dailyLimit, setDailyLimit] = useState(0);

    // Load from LocalStorage
    useEffect(() => {
        const savedFares = localStorage.getItem('lumi-fares');
        const savedUser = localStorage.getItem('lumi-user');
        const savedLimit = localStorage.getItem('lumi-limit');

        if (savedFares) {
            try {
                setTransactions(JSON.parse(savedFares));
            } catch (e) {
                console.error("Failed to parse transactions", e);
            }
        }

        if (savedUser) {
            setUserName(savedUser);
        }

        if (savedLimit) {
            setDailyLimit(Number(savedLimit));
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('lumi-fares', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('lumi-user', userName);
    }, [userName]);

    useEffect(() => {
        localStorage.setItem('lumi-limit', dailyLimit);
    }, [dailyLimit]);

    const addTransaction = (transaction) => {
        const newTx = { ...transaction, id: Date.now().toString(), date: new Date().toISOString() };
        setTransactions(prev => [newTx, ...prev]);
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions(prev => prev.map(t =>
            t.id === updatedTransaction.id ? updatedTransaction : t
        ));
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
        <FareContext.Provider value={{ transactions, addTransaction, deleteTransaction, updateTransaction, getTotalToday, userName, setUserName, dailyLimit, setDailyLimit }}>
            {children}
        </FareContext.Provider>
    );
}

export const useFare = () => useContext(FareContext);
