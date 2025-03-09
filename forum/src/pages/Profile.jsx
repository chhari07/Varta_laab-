import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase"; // Firebase auth instance
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("view");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;
    setUser(auth.currentUser);

    fetch(`http://localhost:5000/api/users/${auth.currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayName(data.displayName);
        setPhotoURL(data.photoURL);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  // Handle Image File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPhotoURL(fileURL); // Preview the image
      setSelectedFile(file);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let imageUrl = photoURL; // Default to existing URL

      // If a new file is selected, upload it to the server
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.imageUrl; // Use uploaded image URL
      }

      const response = await fetch(`http://localhost:5000/api/users/${auth.currentUser.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, photoURL: imageUrl }),
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setSuccessMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2"
    style={{
      backgroundImage:
        "url('https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp')",
    }}
    >
      <div className="max-w-md mx-auto p-2 mt-4 bg-white/80 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Profile</h1>

        <div className="text-center mb-4">
          <Link to="/dashboard">
            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Go to Dashboard
            </button>
          </Link>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setActiveTab("view")}
                className={`px-6 py-2 text-lg font-medium ${
                  activeTab === "view" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                } rounded-l-md hover:bg-blue-600 hover:text-white`}
              >
                View Profile
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-6 py-2 text-lg font-medium ${
                  activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                } rounded-r-md hover:bg-blue-600 hover:text-white`}
              >
                Edit Profile
              </button>
            </div>

            {activeTab === "view" ? (
              <div className="flex flex-col items-center">
                <img className="w-24 h-24 rounded-full mb-4" src={photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                <h2 className="text-xl font-semibold text-gray-800">{displayName || "No Name"}</h2>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-gray-700 font-medium">Display Name</label>
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter new display name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="photoUpload" className="block text-gray-700 font-medium">Upload Profile Photo</label>
                    <input
                      id="photoUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {photoURL && <img src={photoURL} alt="Profile Preview" className="w-24 h-24 rounded-full mx-auto mt-4" />}

                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>

                {successMessage && <p className="mt-4 text-center text-sm font-medium text-green-600">{successMessage}</p>}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
