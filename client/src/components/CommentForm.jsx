import { useState } from "react";

function CommentForm({ onSubmit, placeholder = "Add a comment here" }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="w-full border rounded p-2 text-sm"
        placeholder={placeholder}
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={300}
      />
      <div className="text-right">
        <button
          type="submit"
          className="mt-1 px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
