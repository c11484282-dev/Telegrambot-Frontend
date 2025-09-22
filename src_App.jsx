import React, { useEffect, useState } from 'react';

function App() {
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user || { username: 'Guest', id: 0 };

  const handleQuizRequest = async () => {
    try {
      const response = await fetch('https://telegram-bot-backend-8cpr.onrender.com/newquiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, topic: 'roblox', difficulty: 'hard' })
      });
      const quiz = await response.json();
      alert('Quiz: ' + JSON.stringify(quiz));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const fetchReferralCode = async () => {
    try {
      const response = await fetch('https://telegram-bot-backend-8cpr.onrender.com/refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await response.json();
      setReferralCode(data.code);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Your Telegram ID: {user.id}</p>
