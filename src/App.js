import React, { useState } from "react";
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
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [combatLog, setCombatLog] = useState([]);
  const [gameMessage, setGameMessage] = useState(
    "A wild " +
      currentMonster.name +
      " appeared in front of you! Get your weapons ready!"
  );

  const handleAttack = () => {
    const damageToMonster = Math.floor(Math.random() * 6) + 1;
    setMonsterHealth(monsterHealth - damageToMonster);
    setPlayerDamage(damageToMonster);

    const damageToPlayer =
      Math.floor(Math.random() * currentMonster.damage) + 1;
    setPlayerHealth(playerHealth - damageToPlayer);
    setMonsterDamage(damageToPlayer);

    if (monsterHealth - damageToMonster <= 0) {
      setDefeatedMonsters(defeatedMonsters + 1);
      setGameMessage("You defeated the" + currentMonster.name + "!");

      const logKillEntry = `You defeated the ${currentMonster.name}!`;
      setCombatLog([...combatLog, logKillEntry]);
      //new monster
      const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
      setCurrentMonster(monsters[nextMonsterIndex]);
      setMonsterHealth(monsters[nextMonsterIndex].health);
    } else if (playerHealth - damageToPlayer <= 0) {
      setPlayerDeaths(playerDeaths + 1);
      setGameMessage(
        "You were defeated by the " + currentMonster.name + "! GAME OVER !"
      );

      const logPlayerDeath = `You were defeated by the ${currentMonster.name} ! Your health has been fully restored! Good Luck!`;
      setCombatLog([...combatLog, logPlayerDeath]);

      handleRestart();
    } else {
      setGameMessage(
        "You attacked the " +
          currentMonster.name +
          " and dealt " +
          damageToMonster +
          " damage. The " +
          currentMonster.name +
          " attacked back and dealt " +
          damageToPlayer +
          " damage to you."
      );

      const logEntry = `You attacked the ${currentMonster.name} and dealt ${damageToMonster} damage. The ${currentMonster.name} attacked back and dealt ${damageToPlayer} damage to you.`;
      setCombatLog([...combatLog, logEntry]);
    }
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
        <p>Atack Damage: {monsterDamage}</p>
      </div>
      <div className="player-info">
        <h2>Player</h2>
        <p>Level: {playerLevel}</p>
        <p>Health: {playerHealth}</p>
        <p>Atack Damage: {playerDamage}</p>
        <br></br>
        <p>Monsters Defeated: {defeatedMonsters}</p>
        <p>Player Deaths: {playerDeaths}</p>
      </div>
      <button onClick={handleAttack}>Attack</button>
      <button onClick={handleHeal}>Heal</button>
      <button onClick={handleRestart}>Restart</button>
      <button onClick={handleClearChat}>Clear Chat</button>
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
