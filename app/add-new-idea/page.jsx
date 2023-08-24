"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const AddNewIdea = () => {
  const [submitting, setSubmitting] = useState(false);
  const [idea, setIdea] = useState({
    idea: "",
    tag: "",
  });

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  const addNewIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/idea/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          idea: idea.idea,
          tag: idea.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Add"
      idea={idea}
      setIdea={setIdea}
      submitting={submitting}
      handleSubmit={addNewIdea}
    />
  );
};

export default AddNewIdea;
