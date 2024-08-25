import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config/config";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `${config.apiUrl}/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user profile");
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      {user ? (
        <>
          <h1>{user.username}</h1>
          <img
            src={user.profile_picture}
            alt="Profile"
            className="profile-picture"
          />
          <p>{user.bio}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserProfile;
