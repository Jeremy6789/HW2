import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>即時輸入顯示</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="輸入點什麼吧"
        />
        <p>你輸入的是: {inputValue}</p>
      </header>
    </div>
  );
}

export default App;
