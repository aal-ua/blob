"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;

    await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    setFile(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
      />
      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
}
