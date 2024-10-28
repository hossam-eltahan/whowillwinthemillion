import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import click from "../assets/sounds/general-click.wav";
import correct from "../assets/sounds/correct.m4a";
import wrong from "../assets/sounds/wrong.mp3";
import './Questions.css'; // تأكد من أن المسار صحيح

const Questions = ({
  data,
  setStop,
  setquestionNumber,
  questionNumber,
  setPauseTimer,
}) => {
  // Sounds
  let [clicked] = useSound(click);
  let [correctAns] = useSound(correct);
  let [wrongAns] = useSound(wrong);
  const refAns = useRef(null);
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, SetSelectedAnswer] = useState(null);
  const [className, SetClassName] = useState("answer");
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans, refAns) => {
    setPauseTimer(true);
    clicked();
    SetSelectedAnswer(ans);
    SetClassName("answer active");
    delay(500, () => {
      SetClassName(ans?.correct ? "answer correct" : "answer wrong");
    });
    delay(2200, () => {
      if (ans.correct) {
        correctAns();
        delay(2000, () => {
          setquestionNumber((a) => a + 1);
          SetSelectedAnswer(null);
          setPauseTimer(false);
        });
      } else {
        wrongAns();
        delay(3000, () => {
          const correctIndex = question.answers.findIndex(
            (answer) => answer.correct
          );
          refAns.current.parentElement.children[correctIndex].classList.add(
            "correctAns"
          );
        });
        delay(5000, () => {
          setStop(true);
        });
      }
    });
  };

  const useLifeline = () => {
    if (!lifelineUsed) {
      setLifelineUsed(true);
      const incorrectAnswers = question.answers.filter(ans => !ans.correct);
      const answersToRemove = incorrectAnswers.slice(0, 2);

      const newAnswers = question.answers.filter(ans => ans.correct).concat(
        question.answers.filter(ans => answersToRemove.includes(ans)).slice(0, 1)
      );

      setQuestion(prev => ({ ...prev, answers: newAnswers }));
    }
  };

  const useHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      const correctIndex = question.answers.findIndex(
        (answer) => answer.correct
      );
      const correctAnswer = question.answers[correctIndex];
      const hint = `The correct answer is ${correctAnswer.text}`;
      alert(hint);
      const hintButton = document.querySelector(".hint-button"); // Select the button element
      hintButton.classList.add("used");
    }
  };

  const handleExit = () => {
    // Logic to end the game
    setStop(true); // Assuming this will stop the game
  };

  return (
    <>
      <div className="question text-[35px] marhey-font">{question?.question}</div>
      <button 
        onClick={useLifeline} 
        disabled={lifelineUsed}
        className={`marhey-font lifeline-button ${lifelineUsed ? "used" : ""}`}
      >
       🤔يا صابت/خابت 
      </button>
      <button onClick={useHint} disabled={hintUsed} className="marhey-font hint-button">
        🥺غششني
      </button>
      <button onClick={handleExit} className="marhey-font exit-button">
        🚪 اهرب
      </button>
      <div className="answers">
        {question?.answers.map((ans, index) => (
          <div
            ref={refAns}
            key={index}
            className={selectedAnswer === ans ? className : "answer"}
            onClick={() => handleClick(ans, refAns)}
          >
            {ans.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default Questions;