import { useState, useEffect } from "react";
import axios from "axios";
import Card from "src/components/Card";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data.slice(0, 10)); // Fetch only the first 10 posts
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={fetchPosts}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              image={`https://picsum.photos/200/300.webp`} // Placeholder image
              description={post.body.substring(0, 50) + "..."}
              onReadMore={() => navigate(`/task-4/${post.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
