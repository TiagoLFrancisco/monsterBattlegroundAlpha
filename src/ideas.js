// (1) char creation

// import React, { useState, useEffect } from "react";
// import "./App.css";

// // Define the available character classes
// const characterClasses = [
//   { name: "Warrior", maxHealth: 250, damage: 5, specialAbility: "Berserk" },
//   { name: "Mage", maxHealth: 150, damage: 7, specialAbility: "Fireball" },
//   { name: "Rogue", maxHealth: 200, damage: 6, specialAbility: "Backstab" },
// ];

// // Define the monsters as before
// const monsters = [
//   // ...
// ];

// function App() {
//   // Add a new state variable to track the player's chosen class
//   const [playerClass, setPlayerClass] = useState(null);

//   // Update the player's stats and abilities based on their class selection
//   const [playerMaxHealth, setPlayerMaxHealth] = useState(0);
//   const [playerHealth, setPlayerHealth] = useState(0);
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

//   // Add a new function to handle the player class selection
//   const handleClassSelect = (index) => {
//     setPlayerClass(characterClasses[index]);
//     setPlayerMaxHealth(characterClasses[index].maxHealth);
//     setPlayerHealth(characterClasses[index].maxHealth);
//     setPlayerDamage(characterClasses[index].damage);
//     setGameMessage(`You have chosen the ${characterClasses[index].name} class.`);
//   };

//   // Add a new component to allow the player to choose their class
//   const ClassSelection = () => {
//     return (
//       <div>
//         <h2>Select your class:</h2>
//         <ul>
//           {characterClasses.map((c, index) => (
//             <li key={index} onClick={() => handleClassSelect(index)}>
//               {c.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   // Render the class selection component if the player has not yet chosen a class
//   if (!playerClass) {
//     return <ClassSelection />;
//   }
