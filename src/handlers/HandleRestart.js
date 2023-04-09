export const handleRestart = (
  setPlayerMaxHealth,
  setShowDamage,
  setPlayerHealth,
  setPlayerDamage,
  setPlayerLevel,
  setCurrentMonster,
  setMonsterHealth,
  setMonsterDamage,
  setDefeatedMonsters,
  setCombatLog,
  setGameMessage,
  playerMaxHealth,
  monsters,
  currentMonster
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
};
