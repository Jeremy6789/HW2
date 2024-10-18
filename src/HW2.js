import React, { useState } from 'react';
import './App.css'; // 確保引入 CSS

const quizData = [
  {
    question: "perspective",
    correctAnswer: "觀點",
    options: ["觀點", "個性", "說服力"]
  },
  {
    question: "recruit",
    correctAnswer: "招募",
    options: ["重組", "回饋", "招募"]
  },
  {
    question: "virtual",
    correctAnswer: "虛擬的",
    options: ["虛擬的", "真實的", "有害的"]
  },
  {
    question: "resign",
    correctAnswer: "辭職",
    options: ["設計", "辭職", "簽名"]
  },
  {
    question: "insight",
    correctAnswer: "洞察力",
    options: ["破壞力", "內部", "洞察力"]
  },
  {
    question: "財金的",
    correctAnswer: "financial",
    options: ["financial", "economical", "commercial"]
  },
  {
    question: "終止",
    correctAnswer: "termination",
    options: ["termination", "takeover", "teenager"]
  },
  {
    question: "主管",
    correctAnswer: "manager",
    options: ["employee", "staff", "manager"]
  },
  {
    question: "合併",
    correctAnswer: "merge",
    options: ["mellow", "merge", "merit"]
  },
  {
    question: "衝突",
    correctAnswer: "clash",
    options: ["candidate", "comment", "clash"]
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerClick = (answer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setAnswerFeedback('答對了！');
    } else {
      setAnswerFeedback('答錯了！');
    }

    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setAnswerFeedback('');
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setAnswerFeedback('');
    setShowCorrectAnswer(false);
  };

  if (showResult) {
    return (
      <div className="App-header">
        <h1>你的得分是：{score} / {quizData.length}</h1>
        <button onClick={restartQuiz}>重新開始</button>
      </div>
    );
  }

  const { question, options, correctAnswer } = quizData[currentQuestionIndex];
  
  return (
    <div className="App-header"> {/* 使用這裡的 App-header 來居中 */}
      <h1>第 {currentQuestionIndex + 1} 題</h1>
      <h2>英文單字：{question}</h2>
      {options.map((option) => (
        <button 
          key={option} 
          onClick={() => handleAnswerClick(option)} 
          disabled={showCorrectAnswer}
        >
          {option}
        </button>
      ))}

      {answerFeedback && <p>{answerFeedback}</p>}

      {showCorrectAnswer && (
        <div>
          <p>正確答案是：{correctAnswer}</p>
          <button onClick={handleNextQuestion}>下一題</button>
        </div>
      )}
    </div>
  );
}

export default App;


