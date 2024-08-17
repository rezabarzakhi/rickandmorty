import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import Navbar, { Favourite, Search, SearchResult } from "./Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./Components/Modal";

export default function App() {
  const [Characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState("1");
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`, { signal });
        setCharacters(data.results.slice(0, 10));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          console.log(error.message);
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // if (query < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favourites));
  }, [favourites]);
  
  const handleSelectCharacter = (id) => {
    setSelectedID(id);
  };

  const handleAddFavourite = (char) => {
    setFavourites([...favourites, char]);
  };

  const handleDeleteFavorite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedID);
  return (
    <div className="app">
      <Toaster />
      {/* <Modal title="modal" open={false} onOpen={true}>
        sdsdsd
      </Modal> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={Characters.length} />
        <Favourite favourites={favourites} handleDeleteFavorite={handleDeleteFavorite} />
      </Navbar>
      <div className="main">
        <CharacterList allCharacters={Characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter} />
        <CharacterDetail
          selectedID={selectedID}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </div>
    </div>
  );
}
