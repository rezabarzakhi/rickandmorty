import React, { useEffect, useState } from "react";
// import { episodes, mokecharacter } from "./../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";

function CharacterDetail({ selectedID, onAddFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState();
  const [episodes, setEpisodes] = useState();
  // const [characterId, setCharacterId] = useState(selectedID);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(episodes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedID}`);
        const episodesURL = data.episode;
        const episodesReq = episodesURL.map((url) => axios.get(url));
        const fetchedEpisodes = await axios.all(episodesReq).then((responses) => {
          let episodes = [];
          responses.forEach((res) => {
            episodes.push({ ...res.data });
          });
          return episodes;
        });
        setEpisodes(fetchedEpisodes);

        setCharacter(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    // if (query < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
  }, [selectedID]);

  return (
    <div style={{ flex: 1 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CharacterSubInfo character={character} isAddToFavourite={isAddToFavourite} onAddFavourite={onAddFavourite} />
          <EpisodesList episodes={episodes} />
        </>
      )}
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite, onAddFavourite }) {
  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>&nbsp;{character.gender === "Male" ? <>&#128104;</> : <>&#128105;</>}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          &nbsp;
          <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span>&nbsp;{character.status}</span>
          <span> -&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Added To Favourite</p>
          ) : (
            <button className="btn btn--primary" onClick={() => onAddFavourite(character)}>
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodesList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created));
  } else {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created));
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{ rotate: sortBy ? "" : "180deg" }} />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} : <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
