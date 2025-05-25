import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !description) return;
        onAddExpense({ id: Date.now(), title, description, amount: parseFloat(amount) });
        setTitle('');
        setAmount('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
        }}>
            <input
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    padding: '0.5rem',
                    marginRight: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            <input
                type="text"
                placeholder="Expense Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: '0.5rem',
                    marginRight: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                    padding: '0.5rem',
                    marginRight: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            <button type="submit" style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                Add
            </button>
        </form>
    );
};

export default ExpenseForm;
