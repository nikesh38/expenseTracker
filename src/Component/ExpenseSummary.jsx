import React from 'react';

const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div style={{
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '1rem',
      color: '#333'
    }}>
      Total Expenses: ₹{total.toFixed(2)}
    </div>
  );
};

export default ExpenseSummary;
