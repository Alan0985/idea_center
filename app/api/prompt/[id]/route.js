import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

//GET
export const GET = async ({ params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("No prompt found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

//Edit
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = req.json();

  try {
    await connectToDB();
    const existingPrompt = Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("No prompt found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//Delete
export const DELETE = async ({ params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed To Delete Prompt", { status: 500 });
  }
};
