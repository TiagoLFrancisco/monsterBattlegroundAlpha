import React, { useState, useEffect } from "react";
import "./App.css";

const monsters = [
  { name: "Goblin", level: 1, health: 20, damage: 4 },
  { name: "Kobold", level: 1, health: 15, damage: 3 },
  { name: "Orc", level: 1, health: 25, damage: 5 },
  { name: "Giant Rat", level: 1, health: 10, damage: 2 },
  { name: "Skeleton", level: 1, health: 30, damage: 6 },
  { name: "Zombie", level: 1, health: 22, damage: 3 },
  { name: "Giant Spider", level: 1, health: 25, damage: 5 },
  { name: "Bandit", level: 1, health: 27, damage: 4 },
  { name: "Gnoll", level: 1, health: 22, damage: 4 },
  { name: "Giant Crab", level: 1, health: 18, damage: 3 },
  { name: "Troll", level: 2, health: 40, damage: 8 },
  { name: "Harpy", level: 2, health: 35, damage: 7 },
  { name: "Minotaur", level: 3, health: 50, damage: 10 },
  { name: "Chimera", level: 3, health: 45, damage: 9 },
  { name: "Dragon", level: 4, health: 75, damage: 12 },
  { name: "Behemoth", level: 5, health: 90, damage: 15 },
];

function App() {
  const [playerMaxHealth, setPlayerMaxHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
  const [playerDamage, setPlayerDamage] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerDeaths, setPlayerDeaths] = useState(0);
  const [currentMonster, setCurrentMonster] = useState(monsters[0]);
  const [monsterHealth, setMonsterHealth] = useState(currentMonster.health);
  const [monsterDamage, setMonsterDamage] = useState(0);
  const [showDamage, setShowDamage] = useState(false);
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [combatLog, setCombatLog] = useState([]);
  const [gameMessage, setGameMessage] = useState(
    "A wild " +
      currentMonster.name +
      " appeared in front of you! Get your weapons ready!"
  );

  useEffect(() => {
    if (defeatedMonsters % 5 === 0 && defeatedMonsters !== 0) {
      setPlayerLevel(playerLevel + 1);
      setGameMessage(
        "You leveled up! Congratulations! You are now level " +
          (playerLevel + 1) +
          " !"
      );
      const logLevelUp = `You Leveled Up! Congratulations! You are now level ${
        playerLevel + 1
      } !`;
      setCombatLog([...combatLog, logLevelUp]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defeatedMonsters]);

  const handleAttack = () => {
    setShowDamage(true);

    const damageFromPlayer = calculateDamageFromPlayer();
    const damageFromMonster = calculateDamageFromMonster();

    if (monsterHealth - damageFromPlayer <= 0) {
      handleMonsterDefeat();
    } else if (playerHealth - damageFromMonster <= 0) {
      handlePlayerDefeat();
    } else {
      handleNonDefeatScenario(damageFromPlayer, damageFromMonster);
    }
  };

  const calculateDamageFromPlayer = () => {
    const damageFromPlayer = Math.floor(Math.random() * 10) + 1;
    setMonsterHealth(monsterHealth - damageFromPlayer);
    setPlayerDamage(damageFromPlayer);
    return damageFromPlayer;
  };

  const calculateDamageFromMonster = () => {
    const damageFromMonster =
      Math.floor(Math.random() * currentMonster.damage) + 1;
    setPlayerHealth(playerHealth - damageFromMonster);
    setMonsterDamage(damageFromMonster);
    return damageFromMonster;
  };

  const handleMonsterDefeat = () => {
    setDefeatedMonsters(defeatedMonsters + 1);
    setShowDamage(false);
    setGameMessage(
      "You defeated the " +
        currentMonster.name +
        " with a " +
        playerDamage +
        " damage attack!"
    );
    const logKillEntry = `You defeated the ${currentMonster.name} with a ${playerDamage} damage attack!`;
    setCombatLog([...combatLog, logKillEntry]);
    chooseNextMonster();
  };

  const chooseNextMonster = () => {
    const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
    setCurrentMonster(monsters[nextMonsterIndex]);
    setMonsterHealth(monsters[nextMonsterIndex].health);
  };

  const handlePlayerDefeat = () => {
    setShowDamage(false);
    setPlayerDeaths(playerDeaths + 1);
    setGameMessage(
      "You were defeated by the " + currentMonster.name + "! GAME OVER !"
    );

    const logPlayerDeath = `You were defeated by the ${currentMonster.name} ! Your health has been fully restored! Good Luck!`;
    setCombatLog([...combatLog, logPlayerDeath]);

    handleRestart();
  };

  const handleNonDefeatScenario = (damageFromPlayer, damageFromMonster) => {
    setShowDamage(true);
    setGameMessage(
      "You attacked the " +
        currentMonster.name +
        " and dealt " +
        damageFromPlayer +
        " damage. The " +
        currentMonster.name +
        " attacked back and dealt " +
        damageFromMonster +
        " damage to you."
    );

    const logEntry = `You attacked the ${currentMonster.name} and dealt ${damageFromPlayer} damage. The ${currentMonster.name} attacked back and dealt ${damageFromMonster} damage to you.`;
    setCombatLog([...combatLog, logEntry]);
  };

  const handleRestart = () => {
    setPlayerMaxHealth(100);
    setPlayerHealth(playerMaxHealth);
    setPlayerDamage(0);
    setPlayerLevel(1);
    setCurrentMonster(monsters[0]);
    setMonsterHealth(monsters[0].health);
    setMonsterDamage(0);
    setDefeatedMonsters(0);
    setPlayerDeaths(0);
    setCombatLog([]);
    setGameMessage(
      "A wild " +
        currentMonster.name +
        " appeared in front of you! Get your weapons ready!"
    );
  };

  const handleHeal = () => {
    const healingAmount = Math.floor(Math.random() * 11) + 5;
    const newHealth = playerHealth + healingAmount;
    setPlayerHealth(newHealth > 100 ? 100 : newHealth);
    setGameMessage(
      "You were healed by a friendly cleric for " + healingAmount + " points!"
    );
    const logHealing = `You were healed by a friendly cleric for ${healingAmount} points! `;
    setCombatLog([...combatLog, logHealing]);
  };

  const handleClearChat = () => {
    setCombatLog([]);
    setGameMessage("Chat has been cleared.");
  };

  return (
    <div className="App">
      <h1>Monster Battle</h1>
      <div className="monster-info">
        <h2>{currentMonster.name}</h2>
        <p>Level: {currentMonster.level}</p>
        <p>Health: {monsterHealth}</p>
        {showDamage ? (
          <p>Attack Damage: {monsterDamage}</p>
        ) : (
          <p>This Monster has not attacked you yet!</p>
        )}
      </div>
      <div className="player-info">
        <h2>Player</h2>
        <p>Level: {playerLevel}</p>
        <p>Health: {playerHealth}</p>
        {showDamage ? (
          <p>Attack Damage: {playerDamage}</p>
        ) : (
          <p>You have not attacked this Monster yet!</p>
        )}
        <br></br>
        <p>You have defeated {defeatedMonsters} monsters!</p>
        <p>You were defeated {playerDeaths} time!</p>
      </div>
      <button className="button" onClick={handleAttack}>
        Attack
      </button>
      <button className="button" onClick={handleHeal}>
        Heal
      </button>
      <button className="button" onClick={handleRestart}>
        Restart
      </button>
      <button className="button" onClick={handleClearChat}>
        Clear Chat
      </button>
      <p>{gameMessage}</p>
      <div className="combat-log">
        <h2>Combat Log</h2>
        {combatLog
          .slice(0)
          .reverse()
          .map((log, index) => (
            <p key={index}>{log}</p>
          ))}
      </div>
    </div>
  );
}

export default App;
