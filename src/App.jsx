import { useState, useEffect } from "react";

import StartGameCard from "./components/StartGameCard";
import CardContainer from "./components/CardContainer";

import "./App.css";
import Header from "./components/Header";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

function App() {
  const [startGame, setStartGame] = useState({ start: false, cardCount: 5 });
  const [score, setScore] = useState([0, 0]);
  const bestScore = score[1];

  const cardPickedHandler = () => {
    setScore((prev) => [++prev[0], prev[0] > prev[1] ? prev[0] : prev[1]]);
  };

  const retryHandler = () => {
    setScore((prev) => [0, prev[1]]);
  };

  useEffect(() => {
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore) {
      setScore([0, bestScore]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  return (
    <>
      <Header score={score[0]} bestScore={score[1]} />
      {startGame.start || (
        <StartGameCard
          onStarted={(value) => {
            setStartGame({ start: true, cardCount: value });
          }}
        />
      )}
      {startGame.start && <CardContainer count={startGame.cardCount} onCardPicked={cardPickedHandler} onRetry={retryHandler} />}
      <footer>
        <a href="https://github.com/Takezou-s/odin-memory-card" target="_blank" rel="noreferrer"><Icon path={mdiGithub} size={1.5}/><span>Source</span></a>
      </footer>
    </>
  );
}

export default App;
