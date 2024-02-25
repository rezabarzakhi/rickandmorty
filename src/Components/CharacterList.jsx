import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";

function CharacterList({ allCharacters }) {
  return (
    <div className="characters-list">
      {allCharacters.map((item) => (
        <Character
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item }) {
  return (
    <div className="list__item">
      <img
        src={item.image}
        alt={item.name}
      />
      <h3 className="name">
        <span>{item.gender === "Male" ? <>&#128104;</> : <>&#128105;</>}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
        <button className="icon red">
            <EyeIcon/>
        </button>
    </div>
  );
}
