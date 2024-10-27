import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import click from "../assets/sounds/general-click.wav";
import correct from "../assets/sounds/correct.m4a";
import wrong from "../assets/sounds/wrong.mp3";
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
  return (
    <>
      <div className="question text-[35px]">{question?.question}</div>
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
