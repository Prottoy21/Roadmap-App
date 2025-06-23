import { useState } from "react";
import roadmapItemsData from "./data/roadmapItems";
import RoadmapItem from "./components/RoadmapItem";
import { useUser } from "./context/UserContext";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [items, setItems] = useState(roadmapItemsData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("upvotes");

  const { user, logout } = useUser();

  const handleUpvote = (id) => {
    const updated = items.map((item) =>
      item._id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    );
    setItems(updated);
  };

  const filteredItems = items.filter(
    (item) => filterStatus === "All" || item.status === filterStatus
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "upvotes") return b.upvotes - a.upvotes;
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
          Roadmap Application
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
            className="p-2 border rounded"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="p-2 border rounded"
          >
            <option value="upvotes">Sort by Upvotes</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {!user ? (
          <div className="space-y-4">
            <Login />
            <Signup />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-800">Welcome, {user.email.split('@')[0]}</h2>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
            {sortedItems.map((item) => (
              <RoadmapItem
                key={item._id || item.id}
                item={item}
                onUpvote={handleUpvote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
