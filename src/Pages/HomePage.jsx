import React, { useState } from 'react';

 
import ExpenseTracker from '../Component/EsxpenseTracker';

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
            <ExpenseTracker />
        </div>
  
    );
};

export default HomePage;
