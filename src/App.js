import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ConfettiGenerator from "confetti-js";
import "./App.css";
import One from "../src/assets/dice-one.png";
import Two from "../src/assets/dice-two.png";
import Three from "../src/assets/dice-three.png";
import Four from "../src/assets/dice-four.png";
import Five from "../src/assets/dice-five.png";
import Six from "../src/assets/dice-six.png";

export default function App() {
  const nums = {
    1: One,
    2: Two,
    3: Three,
    4: Four,
    5: Five,
    6: Six,
  };
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      const confettiSettings = { target: "my-canvas" };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      return () => confetti.clear();
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: nums[Math.ceil(Math.random() * 6)],
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setCounter((prevCounter) => prevCounter + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCounter(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div>
      <canvas id="my-canvas"></canvas>
      <main>
        <h1 className="title">Tenzies</h1>
        {tenzies ? (
          <h2 className="victory">YOU WON!!</h2>
        ) : (
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        )}
        <h2 className="score">Number of tries: {counter}</h2>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
