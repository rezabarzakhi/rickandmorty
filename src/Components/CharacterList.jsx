import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import Loading from "./Loading";

function CharacterList({ allCharacters, children, isLoading, onSelectCharacter }) {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loading />
      ) : (
        allCharacters.map((item) => (
          <Character key={item.id} item={item} >
            <SelectCharacterBtn item={item} onSelectCharacter={onSelectCharacter} />
          </Character>
        ))
      )}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}
function SelectCharacterBtn({ item, onSelectCharacter }) {
  return (
    <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
      <EyeIcon />
    </button>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? <>&#128104;</> : <>&#128105;</>}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
