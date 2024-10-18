import React, { useState, useEffect } from 'react';
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

// 使用 Fisher-Yates 演算法進行隨機排序
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [reviewData, setReviewData] = useState([]); // 用來存儲答題記錄
  const [shuffledQuizData, setShuffledQuizData] = useState([]); // 隨機排序後的題目

  // 在組件加載時對題目進行隨機排序
  useEffect(() => {
    const shuffledData = shuffle([...quizData]); // 將 quizData 隨機排序
    setShuffledQuizData(shuffledData);
  }, []);

  const handleAnswerClick = (answer) => {
    const currentQuestion = shuffledQuizData[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setReviewData(prevData => [
      ...prevData,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect
      }
    ]);

    if (isCorrect) {
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
    if (nextQuestionIndex < shuffledQuizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true); // 顯示最終結果
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setAnswerFeedback('');
    setShowCorrectAnswer(false);
    setReviewData([]); // 重置答題記錄
    setShuffledQuizData(shuffle([...quizData])); // 重置題目並重新隨機排序
  };

  // 顯示答題記錄
  const renderReview = () => (
    <div>
      <h2>答題記錄：</h2>
      {reviewData.map((record, index) => (
        <div key={index} className={record.isCorrect ? 'correct-answer' : 'wrong-answer'}>
          <p>第 {index + 1} 題: {record.isCorrect ? '答對' : '答錯'}</p>
          <p>題目: {record.question}</p>
          <p>你的答案: {record.userAnswer}</p>
          <p>正確答案: {record.correctAnswer}</p>
        </div>
      ))}
    </div>
  );

  // 顯示結果並直接顯示答題記錄
  if (showResult) {
    return (
      <div className="App-header">
        <h1>你的得分是：{score} / {quizData.length}</h1>
        {renderReview()} {/* 直接顯示答題記錄 */}
        <button onClick={restartQuiz}>重新開始</button>
      </div>
    );
  }

  const { question, options, correctAnswer } = shuffledQuizData[currentQuestionIndex] || {};

  return (
    <div className="App-header">
      <h1>第 {currentQuestionIndex + 1} 題</h1>
      <h2>英文單字：{question}</h2>
      {options && options.map((option) => (
        <button 
          key={option} 
          onClick={() => handleAnswerClick(option)} 
          disabled={showCorrectAnswer}
        >
          {option}
        </button>
      ))}

      {answerFeedback && (
        <p className={answerFeedback === '答對了！' ? 'correct-answer' : 'wrong-answer'}>
          {answerFeedback}
        </p>
      )}

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






