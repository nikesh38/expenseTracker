import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      borderBottom: '1px solid #ddd'
    }}>
      <span>{expense.title}</span>
      <span>{expense.description}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'green', marginRight: '1rem' }}>₹{expense.amount.toFixed(2)}</span>
        <button onClick={() => onDelete(expense.id)} style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'red',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
