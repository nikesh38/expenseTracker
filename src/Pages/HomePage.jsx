import React, { useState } from 'react';

import ExpenseForm from '../Component/ExpenseForm';
import ExpenseList from '../Component/ExpenseList';
import ExpenseSummary from '../Component/ExpenseSummary';
import NavBar from '../Component/NavBar';

const HomePage = () => {
    const [expenses, setExpenses] = useState([]);

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter((exp) => exp.id !== id));
    };

    return (
        <div>
            <NavBar />
            <div style={{
                maxWidth: '600px',
                margin: '2rem auto',
                padding: '1rem'
            }}>
                <ExpenseForm onAddExpense={handleAddExpense} />
                <ExpenseSummary expenses={expenses} />
                <ExpenseList />
            </div>
        </div>
    );
};

export default HomePage;
