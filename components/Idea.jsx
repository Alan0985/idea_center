import React from "react";
import IdeaCard from "@components/IdeaCard";

const Idea = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Ideas</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 idea_layout">
        {data.length === 0 ? (
          <p className="text-gray-500 text-left">Nothing in my mind yet.</p>
        ) : (
          data.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              handleEdit={() => handleEdit && handleEdit(idea)}
              handleDelete={() => handleDelete && handleDelete(idea)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Idea;
