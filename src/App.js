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
  const [playerHealth, setPlayerHealth] = useState(10);
  const [currentMonster, setCurrentMonster] = useState(monsters[0]);
  const [monsterHealth, setMonsterHealth] = useState(currentMonster.health);
  const [playerDamage, setPlayerDamage] = useState(0);
  const [gameMessage, setGameMessage] = useState(
    "A wild " + currentMonster.name + " appeared!"
  );
  const [defeatedMonsters, setDefeatedMonsters] = useState(0);
  const [playerDeaths, setPlayerDeaths] = useState(0);
  const [combatLog, setCombatLog] = useState([]);

  const handleAttack = () => {
    const damageToMonster = Math.floor(Math.random() * 6) + 1;
    setMonsterHealth(monsterHealth - damageToMonster);
    setPlayerDamage(damageToMonster);

    const damageToPlayer =
      Math.floor(Math.random() * currentMonster.damage) + 1;
    setPlayerHealth(playerHealth - damageToPlayer);

    if (monsterHealth - damageToMonster <= 0) {
      setDefeatedMonsters(defeatedMonsters + 1);
      setGameMessage(
        "You defeated the " +
          currentMonster.name +
          "! The next target has appeared!"
      );

      //monster killed shows on combat log
      const logKillEntry = `You killed the ${currentMonster.name} !`;
      setCombatLog([...combatLog, logKillEntry]);

      //new monster
      const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
      setCurrentMonster(monsters[nextMonsterIndex]);
      setMonsterHealth(monsters[nextMonsterIndex].health);
    } else if (playerHealth - damageToPlayer <= 0) {
      setPlayerDeaths(playerDeaths + 1);
      setGameMessage(
        "You have been defeated by " + currentMonster.name + "! GAME OVER !"
      );

      //player death shows on combat log
      const logPlayerDeath = `You have been defeated by the ${currentMonster.name} ! Your health has been fully restored! Good Luck!`;
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
    setCurrentMonster(monsters[Math.floor(Math.random() * monsters.length)]);
    setPlayerHealth(100);
    setMonsterHealth(currentMonster.health);
    setDefeatedMonsters(0);
    setGameMessage("A wild " + currentMonster.name + " appeared!");
  };

  const handleHeal = () => {
    const newHealth = playerHealth + Math.floor(Math.random() * 11) + 5;
    setPlayerHealth(newHealth > 100 ? 100 : newHealth);
    setGameMessage("You were healed by a friendly cleric!");
  };

  return (
    <div className="App">
      <h1>Monster Battle</h1>
      <div className="monster-info">
        <h2>{currentMonster.name}</h2>
        <p>Level: {currentMonster.level}</p>
        <p>Health: {monsterHealth}</p>
        <p>Damage: {currentMonster.damage}</p>
      </div>
      <div className="player-info">
        <h2>Player</h2>
        <p>Health: {playerHealth}</p>
        <p>Damage: {playerDamage}</p>
        <p>Monsters Defeated: {defeatedMonsters}</p>
        <p>Player Deaths: {playerDeaths}</p>
      </div>
      <button onClick={handleAttack}>Attack</button>
      <button onClick={handleHeal}>Heal</button>
      <button onClick={handleRestart}>Restart</button>
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
