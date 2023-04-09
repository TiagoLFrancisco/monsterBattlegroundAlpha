// function App() {
//   const [playerMaxHealth, setPlayerMaxHealth] = useState(200);

//   const handleAttack = () => {
//     setShowDamage(true);

//     const damageFromPlayer = calculateDamageFromPlayer();
//     const damageFromMonster = calculateDamageFromMonster();

//     if (monsterHealth - damageFromPlayer <= 0) {
//       handleMonsterDefeat();
//     } else if (playerHealth - damageFromMonster <= 0) {
//       handlePlayerDefeat();
//     } else {
//       handleNonDefeatScenario(damageFromPlayer, damageFromMonster);
//     }
//   }
// }
// export default App;

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

//   const handleAttack = () => {
//     setShowDamage(true);

//     const damageFromPlayer = calculateDamageFromPlayer();
//     const damageFromMonster = calculateDamageFromMonster();

//     if (monsterHealth - damageFromPlayer <= 0) {
//       handleMonsterDefeat();
//     } else if (playerHealth - damageFromMonster <= 0) {
//       handlePlayerDefeat();
//     } else {
//       handleNonDefeatScenario(damageFromPlayer, damageFromMonster);
//     }
//   };

//   const calculateDamageFromPlayer = () => {
//     const damageFromPlayer = Math.floor(Math.random() * 10) + 1;
//     setMonsterHealth(monsterHealth - damageFromPlayer);
//     setPlayerDamage(damageFromPlayer);
//     return damageFromPlayer;
//   };

//   const calculateDamageFromMonster = () => {
//     const damageFromMonster =
//       Math.floor(Math.random() * currentMonster.damage) + 1;
//     setPlayerHealth(playerHealth - damageFromMonster);
//     setMonsterDamage(damageFromMonster);
//     return damageFromMonster;
//   };

//   const handleMonsterDefeat = () => {
//     setDefeatedMonsters(defeatedMonsters + 1);
//     setOveralDefeatedMonsters(overalDefeatedMonsters + 1);
//     setShowDamage(false);
//     setGameMessage(
//       `You defeated the ${currentMonster.name} by dealing ${playerDamage} attack damage!\n \n`
//     );
//     chooseNextMonster();
//   };

//   const chooseNextMonster = () => {
//     const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
//     setCurrentMonster(monsters[nextMonsterIndex]);
//     setMonsterHealth(monsters[nextMonsterIndex].health);
//   };

//   const handlePlayerDefeat = () => {
//     setShowDamage(false);
//     setPlayerDefeats(playerDefeats + 1);
//     setGameMessage(
//       `You were defeated by the ${currentMonster.name}! GAME OVER !\n \n`
//     );

//     handleRestart();
//   };

//   const handleNonDefeatScenario = (damageFromPlayer, damageFromMonster) => {
//     setShowDamage(true);
//     setGameMessage(
//       `You attacked the ${currentMonster.name} and dealt ${damageFromPlayer} attack damage. \nThe ${currentMonster.name} attacked back and dealt ${damageFromMonster} attack damage to you.`
//     );
//   };

//   const handleRestart = () => {
//     setPlayerMaxHealth(100);
//     setPlayerHealth(playerMaxHealth);
//     setPlayerDamage(0);
//     setPlayerLevel(1);
//     setCurrentMonster(monsters[0]);
//     setMonsterHealth(monsters[0].health);
//     setMonsterDamage(0);
//     setDefeatedMonsters(0);
//     setCombatLog([]);
//     setGameMessage(
//       `A wild ${currentMonster.name} appeared in front of you! \nGet your weapons ready!`
//     );
//   };

//   const handleHeal = () => {
//     const healingAmount = Math.floor(Math.random() * 11) + 5;
//     const newHealth = playerHealth + healingAmount;
//     setPlayerHealth(newHealth > 200 ? 200 : newHealth);
//     setGameMessage(
//       `You were healed by a friendly cleric for ${healingAmount} points!\n \n`
//     );
//   };

//   const handleClearHistory = () => {
//     setGameMessage("Chat has been cleared.\n Statistics have been reseted. ");
//     setCombatLog([]);
//     setOveralDefeatedMonsters(0);
//     setPlayerDefeats(0);
//   };

//   return (
//     <div className="App">
//       <div className="tittle">
//         <h1>Monster Battle</h1>
//       </div>
//       <div className="pve-panel">
//         <h2 className="h2-tittle">Battle Ground</h2>
//         <div className="pve-board">
//           <div className="monster-info">
//             <h2>{currentMonster.name}</h2>
//             <p>Level: {currentMonster.level}</p>
//             <p>Health: {monsterHealth}</p>
//             {showDamage ? (
//               <p>Attack Damage: {monsterDamage}</p>
//             ) : (
//               <p>This Monster has not attacked you yet!</p>
//             )}
//           </div>
//           <h1 className="versus">VS</h1>
//           <div className="player-info">
//             <h2>Player</h2>
//             <p>Level: {playerLevel}</p>
//             <p>Health: {playerHealth}</p>
//             {showDamage ? (
//               <p>Attack Damage: {playerDamage}</p>
//             ) : (
//               <p>You have not attacked this Monster yet!</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="menu-panel">
//         <h2 className="h2-tittle">Round Event</h2>
//         <p className="game-message">{gameMessage}</p>
//         <h2 className="h2-tittle">Actions</h2>
//         <button className="button" onClick={handleAttack}>
//           Attack
//         </button>
//         <button className="button" onClick={handleHeal}>
//           Heal
//         </button>
//         <button className="button" onClick={handleRestart}>
//           Restart
//         </button>
//         <button className="button" onClick={handleClearHistory}>
//           Clear History
//         </button>
//         <div className="statistics">
//           <h2 className="h2-tittle">Statistics</h2>
//           <p>You have defeated {overalDefeatedMonsters} monsters!</p>
//           <p>You were defeated {playerDefeats} time!</p>
//         </div>
//       </div>
//       <div className="combat-log">
//         <h2 className="h2-tittle">Combat Log</h2>
//         <p className="combat-log-chat">
//           {combatLog
//             .slice(0)
//             .reverse()
//             .map((log, index) => (
//               <p key={index}>{log}</p>
//             ))}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;
