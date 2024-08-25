import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../../Config/config";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      console.log(id);
      try {
        const response = await axios.get(
          `${config.apiUrl}/posts/getpost/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        setError("Error fetching blog post");
        console.error("Error fetching blog post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-detail">
      {blog ? (
        <>
          <p className="username">Posted by: {blog.username}</p>

          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <div className="blog-content">{blog.content}</div>
        </>
      ) : (
        <p>Blog post not found.</p>
      )}
    </div>
  );
};

export default BlogDetail;
