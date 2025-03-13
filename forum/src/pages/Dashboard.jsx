import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    const fetchData = async () => {
      try {
        const [questionsRes, blogsRes] = await Promise.all([
          fetch("https://varta-laab.onrender.com/api/questions"),
          fetch("https://varta-laab.onrender.com/api/blogs"),
        ]);

        if (!questionsRes.ok || !blogsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [questionsData, blogsData] = await Promise.all([
          questionsRes.json(),
          blogsRes.json(),
        ]);

        setQuestions(questionsData);
        setBlogs(blogsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      style={{
        backgroundImage:
          "url('https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp')",
      }}
      className="min-h-screen p-6 bg-white/80 text-black flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="flex items-center gap-4">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="h-20 w-20 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.displayName || "No name set"}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            View Profile
          </button>
        </div>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-5xl">
        <div className="bg-white/80 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Questions</h2>
          {questions.length > 0 ? (
            questions.slice(0, 5).map((q) => (
              <div key={q._id} className="p-4 bg-white/20 rounded-lg mb-2">
                <h3 className="text-lg font-semibold truncate">{q.question}</h3>
                <p className="text-sm text-gray-400">Asked by {q.user}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No questions available.</p>
          )}
        </div>

        <div className="bg-white/80 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
          {blogs.length > 0 ? (
            blogs.slice(0, 5).map((blog) => (
              <div key={blog._id} className="p-4 bg-white/20 rounded-lg mb-2">
                <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                <p className="text-sm text-gray-400">By {blog.author}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
