import React, { useEffect, useState } from "react";

export const InpLocal = () => {
  const [text, setText] = useState<string>(() => {
    const stored = localStorage.getItem("text");
    return stored ? stored : "";
  });

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="bg-red-500"
      />
    </div>
  );
};
