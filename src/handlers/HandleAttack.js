export const handleAttack = ({
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
}) => {
  setShowDamage(true);
  setIsFirstRound(false);
  setWasAttackButtonPressed(true);

  const calculateDamageFromPlayer = () => {
    const damageFromPlayer =
      Math.floor(Math.random() * 10 + 2 * playerLevel) + 1;
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

  const handleMonsterDefeat = () => {
    setDefeatedMonsters(defeatedMonsters + 1);
    setOveralDefeatedMonsters(overalDefeatedMonsters + 1);
    setShowDamage(false);
    setGameMessage(
      `You defeated the ${currentMonster.name} by dealing ${playerDamage} attack damage!\n \n`
    );
    chooseNextMonster(setCurrentMonster, setMonsterHealth, monsters);
  };

  const handlePlayerDefeat = () => {
    setShowDamage(false);
    setPlayerDefeats(playerDefeats + 1);
    setGameMessage(
      `You were defeated by the ${currentMonster.name}! GAME OVER !\n \n`
    );

    handleRestart({
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
    });
  };

  const handleNonDefeatScenario = () => {
    setShowDamage(true);
    setGameMessage(
      `You attacked the ${currentMonster.name} and dealt ${damageFromPlayer} attack damage. \nThe ${currentMonster.name} attacked back and dealt ${damageFromMonster} attack damage to you.`
    );
  };

  if (monsterHealth - damageFromPlayer <= 0) {
    handleMonsterDefeat();
  } else if (playerHealth - damageFromMonster <= 0) {
    handlePlayerDefeat();
  } else {
    handleNonDefeatScenario();
  }
};
