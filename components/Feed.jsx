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
  const [searchText, setSearchText] = useState();
  const [ideas, setIdeas] = useState([]);

  const handleSearchChange = () => {};
  const handleTagClick = () => {};

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch("/api/idea");
      const data = await response.json();
      setIdeas(data);
    };
    fetchIdeas();
  }, []);

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

      <IdeaCardList data={ideas} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
