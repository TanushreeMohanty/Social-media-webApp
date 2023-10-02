import characterData from "../dummyData/characterData";
import "../styles/CharacterRecomendation.css";

function CharacterRecomendation() {
  return (
    <div className="character-recommendation">
      {characterData.map((character, index) => (
        <div key={index} className="character-card">
          <img
            src={character.img}
            alt={`Character ${index + 1}`}
            className="character-image"
          />
        </div>
      ))}
    </div>
  );
}

export default CharacterRecomendation;
