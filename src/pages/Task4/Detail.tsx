import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      setError("Failed to load post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <Link to="/task-4" className="text-blue-500 mb-4 inline-block">← Back to Posts</Link>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {post && (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="mt-2 text-gray-700">{post.body}</p>
        </>
      )}
    </div>
  );
}
