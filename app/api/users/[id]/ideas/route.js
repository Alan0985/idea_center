import Idea from "@models/idea";
import { connectToDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const ideas = await Idea.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all ideas", { status: 500 });
  }
};
