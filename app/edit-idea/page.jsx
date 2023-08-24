"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

const UpdateIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [idea, setIdea] = useState({
    idea: "",
    tag: "",
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const getIdeaDetails = async () => {
      const response = await fetch(`/api/idea/${ideaId}`);
      const data = await response.json();

      setIdea({
        idea: data.idea,
        tag: data.tag,
      });
    };

    if (ideaId) getIdeaDetails();
  }, [ideaId]);

  const editIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!ideaId) alert("Idea not found");

    try {
      const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: idea.idea,
          tag: idea.tag,
        }),
      });

      if (response.ok) {
        router.push("/idea");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      idea={idea}
      setIdea={setIdea}
      submitting={submitting}
      handleSubmit={editIdea}
    />
  );
};

export default UpdateIdea;
