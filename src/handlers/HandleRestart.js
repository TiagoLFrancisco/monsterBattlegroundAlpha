import { monsters } from "../components/MonstersList";

export const handleRestart = (
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
  setDefeatedMonsters,
  setCombatLog,
  setGameMessage,
  setIsFirstRound
) => {
  setPlayerMaxHealth(200);
  setShowDamage(0);
  setPlayerHealth(playerMaxHealth);
  setPlayerDamage(0);
  setPlayerLevel(1);
  setCurrentMonster(monsters[0]);
  setMonsterHealth(monsters[0].health);
  setMonsterDamage(0);
  setDefeatedMonsters(0);
  setCombatLog([]);
  setGameMessage(
    `A wild ${currentMonster.name} appeared in front of you! \nGet your weapons ready!`
  );
  setIsFirstRound(true);
};
