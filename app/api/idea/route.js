import { connectToDB } from "@utils/db";
import Idea from "@models/idea";

export const GET = async () => {
  try {
    await connectToDB();
    const ideas = await Idea.find({}).populate("creator");

    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all ideas", { status: 500 });
  }
};
