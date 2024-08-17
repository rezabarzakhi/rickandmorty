import React, { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Character } from "./CharacterList";

// function Navbar({ children }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">LOGO</div>
//       <input
//         type="text"
//         className="text-field"
//         placeholder="seaech ..."
//       />
//       <div className="navbar__result">Found {numOfResult} character</div>
//       <button className="heart">
//         <HeartIcon className="icon" />
//         <span className="badge">4</span>
//       </button>
//     </nav>
//   );
// }

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favourite({ favourites, handleDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="list of favorite">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button className="icon red" onClick={() => handleDeleteFavorite(item.id)}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
