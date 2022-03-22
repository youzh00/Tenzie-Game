import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Component/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
  function generateNewNum() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function RandomListNums() {
    const numLists = [];
    for (let i = 0; i < 10; i++) {
      numLists.push(generateNewNum());
    }
    return numLists;
  }

  const [numbers, setNumbers] = useState(RandomListNums());
  const [result, setResult] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const allHeld = numbers.every((die) => die.isHeld);
    const firstNumber = numbers[0].value;
    const allEqual = numbers.every((die) => die.value === firstNumber);
    if (allEqual && allHeld) {
      setResult(true);
      console.log("you won");
    }
  }, [numbers]);

  function roll() {
    if (!result) {
      setNumbers((oldNums) =>
        oldNums.map((num) => {
          return num.isHeld ? num : generateNewNum();
        })
      );
      setClicks((clicks) => clicks + 1);
    } else {
      setResult(false);
      setNumbers(RandomListNums());
      setClicks(0);
      setTime(0);
    }
  }
  useEffect(() => {
    if (!result) {
      setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  });
  console.log(time);

  function holdNum(id) {
    setNumbers((nums) =>
      nums.map((num) => {
        return num.id === id ? { ...num, isHeld: !num.isHeld } : num;
      })
    );
  }

  const dies = numbers.map((number) => {
    return (
      <Die
        num={number.value}
        key={number.id}
        isHeld={number.isHeld}
        holdNum={() => holdNum(number.id)}
      />
    );
  });
  const [pageMode, setPageMode] = useState(false);
  function toggleMode() {
    setPageMode(!pageMode);
  }

  // ---------------------------final result ------------------------------//
  return (
    <section className={pageMode ? "sectionDark" : "sectionWhite"}>
      <main className={pageMode ? "mainDark" : "mainwhite"}>
        <div className="Mode-container">
          <DarkModeToggle onChange={toggleMode} checked={pageMode} />
        </div>
        {result && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <h1 className={pageMode ? "darkTitle" : "whiteTitle"}>Tenzies</h1>
        <p className={pageMode ? "darkInstrunctions" : "whiteInstructions"}>
          Roll until all dice are the same. <br /> Click each die to freeze it
          at its current value between rolls.
        </p>
        {result && (
          <div className={pageMode ? "darkClicks" : "whiteClicks"}>
            <h2>
              You score is: {clicks} {clicks > 1 ? "Rolls" : "Roll"} and{" "}
              {time - 1} seconds
            </h2>
          </div>
        )}

        <div className="app-dieContainer">{dies}</div>
        <button className="roll" onClick={roll}>
          {result ? "New Game" : "Roll"}
        </button>
      </main>
    </section>
  );
}

export default App;
