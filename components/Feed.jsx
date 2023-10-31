"use client";

import React, { useState, useEffect } from "react";
import IdeaCard from "./IdeaCard";

const IdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 idea_layout">
      {data.map((idea) => (
        <IdeaCard key={idea._id} idea={idea} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allIdeas, setAllIdeas] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch("/api/idea");
      const data = await response.json();
      setAllIdeas(data);
    };
    fetchIdeas();
  }, []);

  const filterIdeas = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allIdeas.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.idea)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = filterIdeas(e.target.value);
        setSearchedResults(searchedResults);
      }, 500)
    );
  };
  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchedResults = filterIdeas(tag);
    setSearchedResults(searchedResults);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search Ideas By Tag or Keywords"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <IdeaCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <IdeaCardList data={allIdeas} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
