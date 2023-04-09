// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { monsters } from "./components/MonstersList";

// function App() {
//   const [playerMaxHealth, setPlayerMaxHealth] = useState(200);
//   const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
//   const [playerDamage, setPlayerDamage] = useState(0);
//   const [playerLevel, setPlayerLevel] = useState(1);
//   const [playerDefeats, setPlayerDefeats] = useState(0);
//   const [currentMonster, setCurrentMonster] = useState(monsters[0]);
//   const [monsterHealth, setMonsterHealth] = useState(currentMonster.health);
//   const [monsterDamage, setMonsterDamage] = useState(0);
//   const [showDamage, setShowDamage] = useState(false);
//   const [defeatedMonsters, setDefeatedMonsters] = useState(0);
//   const [overalDefeatedMonsters, setOveralDefeatedMonsters] = useState(0);
//   const [combatLog, setCombatLog] = useState([]);
//   const [gameMessage, setGameMessage] = useState(
//     `A wild ${currentMonster.name} appeared in front of you! \nGet your weapons ready!`
//   );

// const handleAttack = () => {
//   setShowDamage(true);

//   const damageFromPlayer = calculateDamageFromPlayer();
//   const damageFromMonster = calculateDamageFromMonster();

//   if (monsterHealth - damageFromPlayer <= 0) {
//     handleMonsterDefeat();
//   } else if (playerHealth - damageFromMonster <= 0) {
//     handlePlayerDefeat();
//   } else {
//     handleNonDefeatScenario(damageFromPlayer, damageFromMonster);
//   }
// };

// const calculateDamageFromPlayer = () => {
//   const damageFromPlayer = Math.floor(Math.random() * 10) + 1;
//   setMonsterHealth(monsterHealth - damageFromPlayer);
//   setPlayerDamage(damageFromPlayer);
//   return damageFromPlayer;
// };

// const calculateDamageFromMonster = () => {
//   const damageFromMonster =
//     Math.floor(Math.random() * currentMonster.damage) + 1;
//   setPlayerHealth(playerHealth - damageFromMonster);
//   setMonsterDamage(damageFromMonster);
//   return damageFromMonster;
// };

// const handleMonsterDefeat = () => {
//   setDefeatedMonsters(defeatedMonsters + 1);
//   setOveralDefeatedMonsters(overalDefeatedMonsters + 1);
//   setShowDamage(false);
//   setGameMessage(
//     `You defeated the ${currentMonster.name} by dealing ${playerDamage} attack damage!\n \n`
//   );
//   chooseNextMonster();
// };

// const chooseNextMonster = () => {
//   const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
//   setCurrentMonster(monsters[nextMonsterIndex]);
//   setMonsterHealth(monsters[nextMonsterIndex].health);
// };

// const handlePlayerDefeat = () => {
//   setShowDamage(false);
//   setPlayerDefeats(playerDefeats + 1);
//   setGameMessage(
//     `You were defeated by the ${currentMonster.name}! GAME OVER !\n \n`
//   );

//   handleRestart();
// };

// const handleNonDefeatScenario = (damageFromPlayer, damageFromMonster) => {
//   setShowDamage(true);
//   setGameMessage(
//     `You attacked the ${currentMonster.name} and dealt ${damageFromPlayer} attack damage. \nThe ${currentMonster.name} attacked back and dealt ${damageFromMonster} attack damage to you.`
//   );

//   return(
//   <div>
//     <button className="button" onClick={handleAttack}></button>)
//   </div>

// };

// export default App;
