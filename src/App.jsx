
import "./App.css";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import Navbar from "./Components/Navbar";
import { allCharacters } from "./../data/data";

export default function App(){
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
