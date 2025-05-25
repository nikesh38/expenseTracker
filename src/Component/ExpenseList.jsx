import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.10:8080/expense-tracker/api/get-expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Expense List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {expenses.map(expense => (
          <li
            key={expense.id}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '12px'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{expense.title}</h3>
            <p style={{ margin: '8px 0', color: '#333' }}>₹ {expense.amount}</p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{expense.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
