export const heroChooser = ({
  heroClass,
  setHeroClass,
  showSelection,
  setShowSelection,
  isFirstRound,
  setGameMessage,
  monsters,
  setIsButtonDisabled,
}) => {
  function handleHeroClassChange(event) {
    setHeroClass(event.target.value);
  }

  function handleButtonClick() {
    setShowSelection(true);
  }

  function handleConfirmClick() {
    if (heroClass !== "") {
      setShowSelection(false);
      setGameMessage(
        `A wild ${monsters[0].name} appeared in front of you! \nGet your weapons ready!`
      );
      setIsButtonDisabled(true);
    }
  }

  let selectHeroClassBox;

  if (isFirstRound & showSelection) {
    selectHeroClassBox = (
      <div>
        <h2>Select a hero class!</h2>
        <select
          className="select-hero-class-dropdown"
          value={heroClass}
          onChange={handleHeroClassChange}
        >
          <option value="">Choose a hero class</option>
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Rogue">Rogue</option>
        </select>
        <button onClick={handleConfirmClick}>Confirm</button>
      </div>
    );
  } else {
    switch (heroClass) {
      case "Warrior":
        selectHeroClassBox = "";
        break;
      case "Mage":
        selectHeroClassBox = "";
        break;
      case "Rogue":
        selectHeroClassBox = "";
        break;
      default:
        selectHeroClassBox = (
          <div>
            <h2>Click the button to get started!</h2>
            <button
              className="select-hero-class-button"
              onClick={handleButtonClick}
            >
              Select Hero Class
            </button>
          </div>
        );
    }
  }

  return <p>{selectHeroClassBox}</p>;
};
