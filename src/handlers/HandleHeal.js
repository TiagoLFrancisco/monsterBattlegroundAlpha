export const handleHeal = (playerHealth, setPlayerHealth, setGameMessage) => {
  const healingAmount = Math.floor(Math.random() * 11) + 5;
  const newHealth = playerHealth + healingAmount;
  if (newHealth > 200) {
    setPlayerHealth(200);
    setGameMessage(`You are already full HP. You can't heal anymore!\n \n`);
  } else {
    setPlayerHealth(newHealth);
    setGameMessage(
      `You were healed by a friendly cleric for ${healingAmount} points!\n \n`
    );
  }
};
