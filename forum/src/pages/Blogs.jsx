import React, { useState, useEffect } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newComment, setNewComment] = useState("");

  const API_URL = "http://localhost:5000/api/blogs";
  const IMAGE_BASE_URL = "http://localhost:5000/uploads/";
  const defaultImage = "/default-image.jpg";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  const handleLike = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/like`, { method: "POST" });
      fetchBlogs();
    } catch (error) {
      console.error("Error liking blog:", error.message);
    }
  };

  const handleComment = async (id) => {
    if (!newComment.trim()) return;
    try {
      await fetch(`${API_URL}/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newComment }),
      });
      setNewComment("");
      fetchBlogs();
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div 
    style={{
      backgroundImage:
        "url('https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp')",
    }} 
    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 min-h-screen bg-gray-100">
      {/* Blog List */}
      <main className="md:col-span-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Latest Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog._id} className="p-3 bg-gray-50 rounded-lg mb-4 shadow">
            <img
              src={blog.image ? `${IMAGE_BASE_URL}${blog.image.split("/").pop()}` : defaultImage}
              alt={blog.title}
              className="w-full h-40 rounded-lg object-cover"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.content.substring(0, 100)}...</p>
            <div className="flex items-center justify-between mt-2">
              <button className="text-red-500 text-sm" onClick={() => handleLike(blog._id)}>❤️ {blog.likes}</button>
              <button className="text-blue-500 text-sm bg-black rounded px-3 py-1" onClick={() => setSelectedBlog({ ...blog })}>View</button>
            </div>
          </div>
        ))}
      </main>

      {/* Blog Details Sidebar (Hidden on Mobile) */}
      <aside className="md:col-span-4 p-4 bg-white rounded-lg shadow-lg hidden md:block">
        {selectedBlog ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{selectedBlog.title}</h3>
              <button className="text-gray-500 text-sm" onClick={() => setSelectedBlog(null)}>✖ Close</button>
            </div>
            <p className="text-sm text-gray-600">{selectedBlog.content}</p>
            <img
              src={selectedBlog.image ? `${IMAGE_BASE_URL}${selectedBlog.image.split("/").pop()}` : defaultImage}
              alt={selectedBlog.title}
              className="w-full h-40 rounded-lg object-cover mt-2"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <button className="text-red-500 mt-2" onClick={() => handleLike(selectedBlog._id)}>❤️ {selectedBlog.likes}</button>
            <h4 className="font-bold mt-3 text-sm">Comments</h4>
            {selectedBlog.comments?.length > 0 ? (
              selectedBlog.comments.map((c, index) => <p key={index} className="text-xs text-gray-500">- {c}</p>)
            ) : (
              <p className="text-xs text-gray-400">No comments yet</p>
            )}
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              className="w-full border p-2 mt-2 text-sm"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="bg-blue-500 text-white text-sm px-3 py-1 mt-2 rounded" onClick={() => handleComment(selectedBlog._id)}>Comment</button>
          </>
        ) : (
          <p className="text-gray-500 text-sm">Select a blog to view</p>
        )}
      </aside>

      {/* Mobile Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 md:hidden">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-auto relative">
            <button className="absolute top-3 right-3 text-gray-500 text-xl" onClick={() => setSelectedBlog(null)}>✖</button>
            <h3 className="font-bold text-lg">{selectedBlog.title}</h3>
            <p className="text-sm text-gray-600">{selectedBlog.content}</p>
            <img
              src={selectedBlog.image ? `${IMAGE_BASE_URL}${selectedBlog.image.split("/").pop()}` : defaultImage}
              alt={selectedBlog.title}
              className="w-full h-40 rounded-lg object-cover mt-2"
              onError={(e) => (e.target.src = defaultImage)}
            />
            <button className="text-red-500 mt-2" onClick={() => handleLike(selectedBlog._id)}>❤️ {selectedBlog.likes}</button>
            <h4 className="font-bold mt-3 text-sm">Comments</h4>
            {selectedBlog.comments?.length > 0 ? (
              selectedBlog.comments.map((c, index) => <p key={index} className="text-xs text-gray-500">- {c}</p>)
            ) : (
              <p className="text-xs text-gray-400">No comments yet</p>
            )}
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              className="w-full border p-2 mt-2 text-sm"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="bg-blue-500 text-white text-sm px-3 py-1 mt-2 rounded" onClick={() => handleComment(selectedBlog._id)}>Comment</button>
          </div>
        </div>
      )}

      {/* Floating Add Blog Button */}
      <button onClick={() => setIsAddingBlog(true)} className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full text-xl text-white shadow-lg">
        ➕
      </button>
    </div>
  );
};

export default Blog;
