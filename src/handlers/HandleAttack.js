export const handleAttack = (
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
  monsters,
  handleRestart
) => {
  setShowDamage(true);

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

  const damageFromPlayer = calculateDamageFromPlayer();
  const damageFromMonster = calculateDamageFromMonster();

  const chooseNextMonster = (setCurrentMonster, setMonsterHealth, monsters) => {
    const nextMonsterIndex = Math.floor(Math.random() * monsters.length);
    setCurrentMonster(monsters[nextMonsterIndex]);
    setMonsterHealth(monsters[nextMonsterIndex].health);
  };

  const handleMonsterDefeat = (
    playerDamage,
    currentMonster,
    setShowDamage,
    defeatedMonsters,
    setDefeatedMonsters,
    overalDefeatedMonsters,
    setOveralDefeatedMonsters,
    setGameMessage,
    chooseNextMonster,
    setCurrentMonster,
    setMonsterHealth,
    monsters
  ) => {
    setDefeatedMonsters(defeatedMonsters + 1);
    setOveralDefeatedMonsters(overalDefeatedMonsters + 1);
    setShowDamage(false);
    setGameMessage(
      `You defeated the ${currentMonster.name} by dealing ${playerDamage} attack damage!\n \n`
    );
    chooseNextMonster(setCurrentMonster, setMonsterHealth, monsters);
  };

  const handlePlayerDefeat = (
    playerMaxHealth,
    setPlayerMaxHealth,
    setPlayerHealth,
    setPlayerDamage,
    setPlayerLevel,
    playerDefeats,
    setPlayerDefeats,
    currentMonster,
    setCurrentMonster,
    setMonsterHealth,
    setMonsterDamage,
    setShowDamage,
    setDefeatedMonsters,
    setCombatLog,
    setGameMessage,
    monsters,
    handleRestart
  ) => {
    setShowDamage(false);
    setPlayerDefeats(playerDefeats + 1);
    setGameMessage(
      `You were defeated by the ${currentMonster.name}! GAME OVER !\n \n`
    );

    handleRestart(
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
      monsters
    );
  };

  const handleNonDefeatScenario = (
    currentMonster,
    setShowDamage,
    setGameMessage,
    damageFromPlayer,
    damageFromMonster
  ) => {
    setShowDamage(true);
    setGameMessage(
      `You attacked the ${currentMonster.name} and dealt ${damageFromPlayer} attack damage. \nThe ${currentMonster.name} attacked back and dealt ${damageFromMonster} attack damage to you.`
    );
  };

  if (monsterHealth - damageFromPlayer <= 0) {
    handleMonsterDefeat(
      playerDamage,
      currentMonster,
      setShowDamage,
      defeatedMonsters,
      setDefeatedMonsters,
      overalDefeatedMonsters,
      setOveralDefeatedMonsters,
      setGameMessage,
      chooseNextMonster,
      setCurrentMonster,
      setMonsterHealth,
      monsters
    );
  } else if (playerHealth - damageFromMonster <= 0) {
    handlePlayerDefeat(
      playerMaxHealth,
      setPlayerMaxHealth,
      setPlayerHealth,
      setPlayerDamage,
      setPlayerLevel,
      playerDefeats,
      setPlayerDefeats,
      currentMonster,
      setCurrentMonster,
      setMonsterHealth,
      setMonsterDamage,
      setShowDamage,
      setDefeatedMonsters,
      setCombatLog,
      setGameMessage,
      monsters,
      handleRestart
    );
  } else {
    handleNonDefeatScenario(
      currentMonster,
      setShowDamage,
      setGameMessage,
      damageFromPlayer,
      damageFromMonster
    );
  }
};
