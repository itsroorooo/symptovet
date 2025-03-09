"use client";

import React, { useState } from "react";
import './profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "Rose Ann",
    lastName: "Baqueran",
    username: "roseann123",
    email: "roseann@example.com",
    title: "Software Engineer",
    photo: "/images/default-avatar.png", // Default avatar image
  });

  // State to toggle between view and edit modes
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1 * 1024 * 1024) { // Check if file size is under 1MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Image size should be under 1MB and have a 1:1 aspect ratio.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // Switch back to view mode after saving
    console.log("Profile updated:", profile);
  };

  return (
    <div className="ml-[250px] font-[Poppins] pt-8 pl-8 pr-8 pb-0 bg-gray-100 flex flex-col min-h-[89.5vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
      
      {/* Profile Container with Flexbox */}
      <div className="bg-white p-6 rounded-lg shadow-md flex gap-8">
        
        {/* Left Side - Upload Photo Section */}
        <div className="w-1/3 flex flex-col items-center border-r pr-6">
          <img
            src={profile.photo}
            alt="Profile"
            className="w-64 h-64 rounded-full object-cover mb-4"
          />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
            Upload Photo
          </label>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Image size should be under 1MB and image ratio needs to be 1:1.
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-2/3">

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" disabled={!isEditing} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" name="username" value={profile.username} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" disabled={!isEditing} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" disabled={!isEditing} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <textarea name="title" value={profile.title} onChange={handleInputChange} maxLength={50} className="w-full p-2 border border-gray-300 rounded" disabled={!isEditing} />
              <p className="text-sm text-gray-500 mt-2">{profile.title.length}/50</p>
            </div>
            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save Changes
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
