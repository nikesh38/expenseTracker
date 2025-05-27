import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch expenses from server
  const fetchExpenses = () => {
    axios.get('http://localhost:8080/expense-tracker/api/get-expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense handler
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !description || !amount) return;

    const newExpense = {
      title,
      description,
      amount: parseFloat(amount),
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/expense-tracker/api/add-expense',
        newExpense,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 || response.status === 201) {
        await fetchExpenses();
        setTitle('');
        setDescription('');
        setAmount('');
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Delete single expense
  const deleteExpense = (id) => {
    console.log('Deleting expense with id:', id);
    axios.delete(`http://localhost:8080/expense-tracker/api/delete-expense?id=${id}`)
      .then(() => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  // Delete all expenses
  const deleteAllExpenses = () => {
    axios.delete('http://localhost:8080/expense-tracker/api/delete-all-expenses')
      .then(() => {
        setExpenses([]);
      })
      .catch(error => {
        console.error('Error deleting all expenses:', error);
      });
  };

  // Calculate total amount
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            marginBottom: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            animation: 'bounce 2s infinite'
          }}>
            <span style={{ fontSize: '40px', color: 'white' }}>💰</span>
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            💸 Expense Tracker
          </h1>
          <p style={{ color: '#e0e7ff', fontSize: '1.2rem' }}>Manage your finances with style</p>
        </div>

        {/* Total Amount Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={e => e.target.style.transform = 'translateY(-5px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#e0e7ff', fontSize: '1.2rem', marginBottom: '10px' }}>Total Expenses</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem', marginRight: '10px' }}>💵</span>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
                  ₹ {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📈</span>
            </div>
          </div>
        </div>

        {/* Add Expense Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px', }}>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(240, 147, 251, 0.4)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 25px rgba(240, 147, 251, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>➕</span>
            Add New Expense
          </button>
        </div>

        {/* Expense Form */}
        {isFormVisible && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            animation: 'slideDown 0.5s ease',
             
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📝</span> Add New Expense
              </h2>
              <button
                onClick={() => setIsFormVisible(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#cbd5e1',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#cbd5e1'}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddExpense}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Title</label>
                  <input
                    type="text"
                    placeholder="Enter expense title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      width: '80%',
                      padding: '15px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#a78bfa'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Amount</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: '15px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: '#9ca3af',
                      fontSize: '1.2rem'
                    }}>₹</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        width: '80%',
                        padding: '15px 15px 15px 40px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a78bfa'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <label style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Description</label>
                <textarea
                  placeholder="Enter expense description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '93%',
                    padding: '15px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '80px',
                    transition: 'all 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#a78bfa'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                  required
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '97%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                <span>➕</span> Add Expense
              </button>
            </form>
          </div>
        )}

      

        {/* Expense List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {expenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '2rem' }}>💰</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '1.2rem', marginBottom: '5px' }}>No expenses recorded yet</p>
              <p style={{ color: '#6b7280' }}>Add your first expense to get started!</p>
            </div>
          ) : (
            expenses.map((expense, index) => (
              <div
                key={expense.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  animation: `slideInLeft 0.5s ease ${index * 0.1}s both`
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #a78bfa, #f093fb)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        boxShadow: '0 5px 15px rgba(167, 139, 250, 0.3)'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>📝</span>
                      </div>
                      <div>
                        <h3 style={{ 
                          color: 'white', 
                          fontSize: '1.4rem', 
                          fontWeight: 'bold', 
                          margin: '0 0 5px 0',
                          transition: 'color 0.2s'
                        }}>
                          {expense.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#34d399', fontSize: '1.2rem', fontWeight: '600' }}>
                          <span style={{ marginRight: '5px' }}>💵</span>
                          ₹ {expense.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <p style={{ 
                      color: '#cbd5e1', 
                      lineHeight: '1.6', 
                      marginLeft: '70px',
                      fontSize: '1rem'
                    }}>
                      {expense.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    style={{
                      marginLeft: '20px',
                      padding: '12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#9ca3af',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '1.2rem'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                      e.target.style.color = '#ef4444';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                      e.target.style.color = '#9ca3af';
                      e.target.style.transform = 'scale(1)';
                    }}
                    title="Delete expense"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        input::placeholder, textarea::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ExpenseTracker;