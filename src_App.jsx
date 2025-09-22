import { useEffect} from 'react';

function App() {
  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();}  }, []);

  // Get user data from Telegram
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user || { username: 'Guest', id: 0};
  // Send quiz request to Render backend
  const handleQuizRequest = async () => {
    try {
      const response = await fetch('https://telegram-bot-backend-8cpr.onrender.com/newquiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},        body: JSON.stringify({ userId: user.id, topic: 'roblox', difficulty: 'hard' }),
      });
      const quiz = await response.json();
      alert('Quiz: ' + JSON.stringify(quiz));} catch (error) {
      alert('Error: ' + error.message);}  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Your Telegram ID: {user.id}</p>
      <button
        style={{ padding: '10px', background: '#27A5E5', color: 'white', border: 'none', cursor: 'pointer' }}
        onClick={handleQuizRequest}
      >
        Get Roblox Quiz
      </button>
    </div>);}

export default App;
