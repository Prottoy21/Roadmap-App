import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { useUser } from "../context/UserContext";

function CommentSection({ roadmapId }) {
  const [flatComments, setFlatComments] = useState([]);
  const { user } = useUser();

  const buildTree = (flat, parentId = null) => {
    return flat
      .filter((c) => c.parent === parentId)
      .map((c) => ({
        ...c,
        replies: buildTree(flat, c._id),
      }));
  };

  const treeComments = buildTree(flatComments);

  useEffect(() => {
    if (!roadmapId) return;

    fetch(`/api/comment/item/${roadmapId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(setFlatComments)
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [roadmapId]);

  const addComment = async (text, parentId = null) => {
    const token = localStorage.getItem("token"); 
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, parentId, roadmapItemId: roadmapId }),
      });

      if (!res.ok) throw new Error(await res.text());
      const newComment = await res.json();
      setFlatComments((prev) => [...prev, newComment]);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const editComment = async (commentId, newText) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newText }),
      });

      setFlatComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: newText } : c))
      );
    } catch (err) {
      console.error("Failed to edit comment:", err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const collectIdsToDelete = (id, all) => {
        const children = all.filter((c) => c.parent === id);
        return [
          id,
          ...children.flatMap((child) => collectIdsToDelete(child._id, all)),
        ];
      };

      const idsToDelete = collectIdsToDelete(commentId, flatComments);
      setFlatComments((prev) =>
        prev.filter((c) => !idsToDelete.includes(c._id))
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const renderComments = (commentList, depth = 0) =>
  commentList.map((comment) => (
    <div
      key={comment._id}
      className="mt-2 border-l pl-4"
      style={{ marginLeft: `${Math.min(depth, 3) * 16}px` }}
    >
      <p className="text-sm">{comment.text}</p>
      <div className="text-xs text-gray-600 mb-1">
        — {comment.userEmail || "Anonymous"}
      </div>
      <div className="text-xs flex gap-2">
        {user?._id === comment.user?._id && (
          <>
            <button
              onClick={() => {
                const newText = prompt("Edit your comment:", comment.text);
                if (newText && newText.trim()) editComment(comment._id, newText);
              }}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => deleteComment(comment._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>

      <CommentForm
        placeholder="Reply..."
        onSubmit={(text) => addComment(text, comment._id)}
      />

      {comment.replies?.length > 0 && renderComments(comment.replies, depth + 1)}
    </div>
  ));



  return (
    <div className="mt-4">
      <CommentForm onSubmit={addComment} />
      <div className="mt-2">{renderComments(treeComments)}</div>
    </div>
  );
}

export default CommentSection;
