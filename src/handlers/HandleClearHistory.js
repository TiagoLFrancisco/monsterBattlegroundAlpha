export const handleClearHistory = (
  setGameMessage,
  setOveralDefeatedMonsters,
  setPlayerDefeats,
  setCombatLog
) => {
  setGameMessage("Chat has been cleared.\n Statistics have been reseted. ");

  setOveralDefeatedMonsters(0);
  setPlayerDefeats(0);
  setCombatLog([]);
};
