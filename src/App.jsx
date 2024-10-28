import { useEffect, useState } from "react";
import "./App.css";
import data from "./components/data";
import Questions from "./components/Questions";
import Timer from "./components/Timer";
import User from "./components/User";
import useSound from "use-sound";
import congrat from "./assets/sounds/congrats.m4a";
// import playSound from "./assets/sounds/play.mp3";
const App = () => {
  // let [playedSound, { pause }] = useSound(playSound);
  let [congratSound] = useSound(congrat);
  const [questionNumber, setquestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [user, setUser] = useState("");
  const [congrats, setCongrats] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);

  const pyramids = [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },
    { id: 4, amount: "$ 500" },
    { id: 5, amount: "$ 1000" },
    { id: 6, amount: "$ 2000" },
    { id: 7, amount: "$ 4000" },
    { id: 8, amount: "$ 8000" },
    { id: 9, amount: "$ 16000" },
    { id: 10, amount: "$ 32000" },
    { id: 11, amount: "$ 64000" },
    { id: 12, amount: "$ 125000" },
    { id: 13, amount: "$ 250000" },
    { id: 14, amount: "$ 500000" },
    { id: 15, amount: "$ 1000000" },
  ];
  // useEffect(() => {
  //   if (user && questionNumber === 1) {
  //     playedSound();
  //   }
  // }, [user, questionNumber, playedSound]);
  useEffect(() => {
    if (stop || congrats) {
      setTimeout(() => {
        setUser("");
        setStop(false);
        setCongrats(false);
        setquestionNumber(1);
      }, 5000);
    }
  }, [stop, congrats]);
  useEffect(() => {
    if (questionNumber === 16) {
      setCongrats(true);
      congratSound();
    }
  }, [questionNumber]);
  return (
    <div className="app flex h-screen bg-indigo-950 text-white">
      {user ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="end-game">
                You earned:{" "}
                {questionNumber > 1
                  ? pyramids[questionNumber - 2].amount
                  : "$ 0"}
              </h1>
            ) : congrats ? (
              <h1 className="end-game">
                Congrats, You have reached to $ 1000000
              </h1>
            ) : (
              <>
                <div className="top h-1/2 relative flex justify-center items-center">
                  <div className="timer">
                    <Timer
                      questionNumber={questionNumber}
                      setStop={setStop}
                      pauseTimer={pauseTimer}
                    />
                  </div>
                </div>
                <div className="bottom h-1/2 relative">
                  <Questions
                    data={data}
                    questionNumber={questionNumber}
                    setquestionNumber={setquestionNumber}
                    setStop={setStop}
                    setPauseTimer = {setPauseTimer}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid center-elements bg-[#020230]">
            <ul className="lists w-full p-[20px]">
              <h2 className="p-2 text-center rounded-xl mb-[15px] md:mb-[35px] text-[15px] md:text-[25px]">
                Name: {user}
              </h2>
              {pyramids
                .slice()
                .reverse()
                .map((item) => (
                  <li
                    key={item.id}
                    className={
                      questionNumber === item.id ? "item active" : "item"
                    }
                  >
                    <span className="num">{item.id}</span>
                    <span className="amount">{item.amount}</span>
                  </li>
                ))}
            </ul>
            
          </div>
        </>
      ) : (
        <User setUser={setUser} />
      )}
    </div>
  );
};

export default App;