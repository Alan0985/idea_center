"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Idea from "@components/Idea";

const MyIdea = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/ideas`);
      const data = await response.json();
      setIdeas(data);
    };
    if (session?.user.id) fetchIdeas();
  }, [session?.user.id]);

  const handleEdit = (idea) => {
    router.push(`/edit-idea?id=${idea._id}`);
  };

  const handleDelete = async (idea) => {
    const confirmDelete = confirm("Are you sure you want to delete it?");

    if (confirmDelete) {
      try {
        await fetch(`/api/idea/${idea._id}`, {
          method: "DELETE",
        });

        const filteredIdeas = ideas.filter((p) => p._id !== idea._id);
        setIdeas(filteredIdeas);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Idea
      name="My"
      desc="Here are what in my mind."
      data={ideas}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyIdea;
