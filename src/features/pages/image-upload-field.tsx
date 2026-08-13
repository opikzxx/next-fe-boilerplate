"use client";

import { ImageIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data: { url: string } = await response.json();
  return data.url;
}

export function ImageUploadField(props: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {props.value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={props.value}
          alt=""
          className="h-24 w-full rounded-md object-cover"
        />
      )}
      <div className="flex gap-2">
        <Input
          value={props.value ?? ""}
          onChange={(event) => props.onChange(event.target.value)}
          placeholder="https://..."
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={isUploading}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/png,image/jpeg,image/webp,image/gif";
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) {
                return;
              }
              setIsUploading(true);
              try {
                const url = await uploadImage(file);
                props.onChange(url);
              } finally {
                setIsUploading(false);
              }
            };
            input.click();
          }}
        >
          {isUploading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ImageIcon />
          )}
        </Button>
      </div>
    </div>
  );
}
