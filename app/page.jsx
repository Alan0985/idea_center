import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        IDEA CENTER
        <br />
        <span className="purple_gradient text-center">
          Where Innovative Ideas Explode
        </span>
      </h1>

      <p className="desc text-center">
        Dynamic and vibrant online platform designed to serve as a collaborative
        hub where individuals from diverse backgrounds can gather to share,
        explore, and refine their innovative ideas.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
