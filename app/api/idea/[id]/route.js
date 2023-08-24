import { connectToDB } from "@utils/db";
import Idea from "@models/idea";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const idea = await Idea.findById(params.id).populate("creator");

    if (!idea) return new Response("No idea found", { status: 404 });

    return new Response(JSON.stringify(idea), { status: 200 });
  } catch (error) {
    return new Response("Failed to get idea", { status: 500 });
  }
};

//Edit
export const PATCH = async (req, { params }) => {
  const { idea, tag } = await req.json();

  try {
    await connectToDB();

    const existingIdea = await Idea.findById(params.id);

    if (!existingIdea) return new Response("No idea found", { status: 404 });

    existingIdea.idea = idea;
    existingIdea.tag = tag;

    await existingIdea.save();

    return new Response("Update idea successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update idea", { status: 500 });
  }
};

//Delete
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Idea.findByIdAndRemove(params.id);

    return new Response("Idea Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed To Delete Idea", { status: 500 });
  }
};
