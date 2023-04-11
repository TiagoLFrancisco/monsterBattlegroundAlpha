import React, { useState, useEffect } from "react";
import "./App.css";
import { monsters } from "./components/MonstersList";
import { handleRestart } from "./handlers/HandleRestart";
import { handleHeal } from "./handlers/HandleHeal";
import { handleClearHistory } from "./handlers/HandleClearHistory";
import { handleAttack } from "./handlers/HandleAttack";
import { heroChooser } from "./components/HeroChooser";

function App() {
  const [playerMaxHealth, setPlayerMaxHealth] = useState(200);
  const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
  const [playerDamage, setPlayerDamage] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerDefeats, setPlayerDefeats] = useState(0);
  const [currentMonster, setCurrentMonster] = useState(monsters[0]);
  const [monsterHealth, setMonsterHealth] = useState(currentMonster.health);
  const [monsterDamage, setMonsterDamage] = useState(0);
  const [showDamage, setShowDamage] = useState(false);
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [overalDefeatedMonsters, setOveralDefeatedMonsters] = useState(0);
  const [combatLog, setCombatLog] = useState([]);
  const [gameMessage, setGameMessage] = useState(
    `A wild ${currentMonster.name} appeared in front of you! \nGet your weapons ready!`
  );
  const [isFirstRound, setIsFirstRound] = useState(true);
  const [heroClass, setHeroClass] = useState("");
  const [showSelection, setShowSelection] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [wasAttackButtonPressed, setWasAttackButtonPressed] = useState(false);

  // Rotine that listens to changes in game messages and prints them as a new entrie in Combat Log
  useEffect(() => {
    if (isFirstRound && showSelection) {
      setCombatLog([]);
      setGameMessage(
        `A wild ${monsters[0].name} appeared in front of you! \nGet your weapons ready!`
      );
    } else if (isFirstRound && !showSelection) {
      setGameMessage(`Please chose a Hero Class before starting!`);
      setCombatLog(["Choosing a Hero Class..."]);

      if (heroClass !== "") {
        const logEntry = `You chose to become a ${heroClass} !`;
        setCombatLog([...combatLog, logEntry]);
        setGameMessage(
          `A wild ${currentMonster.name} appeared in front of you! \nGet your weapons ready!`
        );
      }
    } else {
      const logEntry = gameMessage;
      setCombatLog([...combatLog, logEntry]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMessage]);

  useEffect(() => {
    if (defeatedMonsters % 5 === 0 && defeatedMonsters !== 0) {
      setPlayerLevel(playerLevel + 1);
      const healingAmount = Math.floor(Math.random() * 30) + 20;
      const newHealth = playerHealth + healingAmount;
      setPlayerHealth(newHealth);
      setGameMessage(
        `You leveled up! Congratulations! You are now level ${
          playerLevel + 1
        } !\n You have been healed by ${healingAmount} HP points!`
      );
      setMonsterHealth(currentMonster.health);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defeatedMonsters]);

  const heroChooserParams = {
    heroClass,
    setHeroClass,
    showSelection,
    setShowSelection,
    isFirstRound,
    setGameMessage,
    monsters,
    setIsButtonDisabled,
  };

  const handleAttackParams = {
    playerMaxHealth,
    setPlayerMaxHealth,
    playerHealth,
    setPlayerHealth,
    playerDamage,
    setPlayerDamage,
    setPlayerLevel,
    playerDefeats,
    setPlayerDefeats,
    currentMonster,
    setCurrentMonster,
    monsterHealth,
    setMonsterHealth,
    setMonsterDamage,
    setShowDamage,
    defeatedMonsters,
    setDefeatedMonsters,
    overalDefeatedMonsters,
    setOveralDefeatedMonsters,
    setCombatLog,
    setGameMessage,
    handleRestart,
    setIsFirstRound,
    setShowSelection,
    setHeroClass,
    playerLevel,
    setIsButtonDisabled,
    monsters,
    setWasAttackButtonPressed,
  };

  const handleRestartParams = {
    playerMaxHealth,
    setPlayerMaxHealth,
    setPlayerHealth,
    setPlayerDamage,
    setPlayerLevel,
    currentMonster,
    setCurrentMonster,
    setMonsterHealth,
    setMonsterDamage,
    setShowDamage,
    setCombatLog,
    setGameMessage,
    setIsFirstRound,
    setHeroClass,
    setShowSelection,
    setIsButtonDisabled,
    setDefeatedMonsters,
    monsters,
    setWasAttackButtonPressed,
  };

  return (
    <div className="App">
      <div className="tittle">
        <h1>Monster Battle</h1>
      </div>
      <div className="pve-panel">
        <h2 className="h2-tittle">Battle Ground</h2>
        <div className="pve-board">
          <div className="monster-info">
            <h2>{currentMonster.name}</h2>
            <p>Level: {currentMonster.level}</p>
            <p>
              Health: {monsterHealth} / {currentMonster.health}
            </p>
            {showDamage ? (
              <p>Attack Damage: {monsterDamage}</p>
            ) : (
              <p>The {currentMonster.name} is ready to attack you!</p>
            )}
          </div>
          <h1 className="versus">VS</h1>
          <div className="player-info">
            <h2>Player</h2>
            <p>Level: {playerLevel}</p>
            <p>Health: {playerHealth} / 200</p>
            {showDamage ? (
              <p>Attack Damage: {playerDamage}</p>
            ) : (
              <p>Your are ready to attack the {currentMonster.name}!</p>
            )}
          </div>
        </div>
      </div>
      <div className="menu-panel">
        <h2 className="h2-tittle">Round Event</h2>
        <p className="game-message">{gameMessage}</p>
        <p className="hero-chooser-menu">{heroChooser(heroChooserParams)}</p>
        <h2 className="h2-tittle">Actions</h2>
        <button
          className="button"
          disabled={!isButtonDisabled}
          onClick={() => handleAttack(handleAttackParams)}
        >
          Attack
        </button>
        <button
          className="button"
          disabled={!wasAttackButtonPressed}
          onClick={() =>
            handleHeal(playerHealth, setPlayerHealth, setGameMessage)
          }
        >
          Heal
        </button>
        <button
          className="button"
          disabled={!isButtonDisabled}
          onClick={() => handleRestart(handleRestartParams)}
        >
          Restart
        </button>
        <button
          className="button"
          disabled={!wasAttackButtonPressed}
          onClick={() =>
            handleClearHistory(
              setGameMessage,
              setOveralDefeatedMonsters,
              setPlayerDefeats,
              setCombatLog
            )
          }
        >
          Clear History
        </button>
        <div className="statistics">
          <h2 className="h2-tittle">Statistics</h2>
          {showSelection ? <p>Hero Class: </p> : <p>Hero Class: {heroClass}</p>}
          <p>Level: {playerLevel}</p>
          <p>Atack Damage: 10+{playerLevel * 2} bonus</p>
          <p>Defeated monsters: {defeatedMonsters} </p>
          <p>Total defeated monsters: {overalDefeatedMonsters} </p>
          <p>Times defeated: {playerDefeats}</p>
        </div>
      </div>
      <div className="combat-log">
        <h2 className="h2-tittle">Combat Log</h2>
        <p className="combat-log-chat">
          {combatLog
            .slice(0)
            .reverse()
            .map((log, index) => (
              <p key={index}>{log}</p>
            ))}
        </p>
      </div>
    </div>
  );
}

export default App;
