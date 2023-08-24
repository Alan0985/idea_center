import React from "react";
import Link from "next/link";

const Form = ({ type, idea, setIdea, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type === "Add" ? "New" : type} Idea
        </span>
      </h1>

      <p className="desc text-left max-w-md">
        Inspires individuals, ignite their passion, and empower them to take
        meaningful actions that ripple through their lives and communities.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your New Idea
          </span>

          <textarea
            value={idea.idea}
            onChange={(e) => setIdea({ ...idea, idea: e.target.value })}
            placeholder="Your Fantastic Idea Goes Here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">(#Guitar, #IT, #Snowboarding)</span>
          </span>

          <input
            value={idea.tag}
            onChange={(e) => setIdea({ ...idea, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/idea" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm black_btn rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
