import Idea from "@models/idea";
import { connectToDB } from "@utils/db";

export const POST = async (req) => {
  const { userId, idea, tag } = await req.json();

  try {
    await connectToDB();
    const newIdea = new Idea({
      creator: userId,
      idea,
      tag,
    });

    await newIdea.save();

    return new Response(JSON.stringify(newIdea), { status: 201 });
  } catch (error) {
    return new Response("Failed to add new idea", { status: 500 });
  }
};
