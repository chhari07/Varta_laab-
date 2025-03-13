import React, { useState, useEffect } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: null });

  const API_URL = "https://varta-laab.onrender.com/api/blogs";
  const IMAGE_BASE_URL = "https://varta-laab.onrender.com/uploads/";
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

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    if (newBlog.image) formData.append("image", newBlog.image);

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      setIsAddingBlog(false);
      setNewBlog({ title: "", content: "", image: null });
      fetchBlogs();
    } catch (error) {
      console.error("Error adding blog:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 min-h-screen bg-gray-100">
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

      {/* Blog Details Sidebar */}
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

      {/* Add Blog Modal */}
      {isAddingBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add New Blog</h2>
            <form onSubmit={handleAddBlog} className="flex flex-col">
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                className="border p-2 mb-2"
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Content"
                value={newBlog.content}
                className="border p-2 mb-2"
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                required
              />
              <input
                type="file"
                accept="image/*"
                className="mb-2"
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
              />
             <button 
  type="submit" 
  className={`p-2 rounded ${newBlog.title && newBlog.content ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} 
  disabled={!newBlog.title || !newBlog.content}
>
  Submit
</button>
            </form>
            <button className="text-gray-500 mt-3" onClick={() => setIsAddingBlog(false)}>Cancel</button>
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
