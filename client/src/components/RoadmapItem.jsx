import CommentSection from "./CommentSection";

function RoadmapItem({ item, onUpvote }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <button
          onClick={() => onUpvote(item._id)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Upvote ({item.upvotes})
        </button>
      </div>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <p className="text-sm text-gray-500 italic mt-1">Status: {item.status}</p>
      <CommentSection roadmapId={item._id || item.id} />
    </div>
  );
}

export default RoadmapItem;
