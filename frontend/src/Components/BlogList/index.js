import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config/config";
import { useSearch } from "../../contexts/SearchContext";
import { Link } from "react-router-dom";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/posts/getpost`);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowercasedQuery) ||
          blog.content.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  return (
    <div className="blog-list">
      <div className="blog-cards-container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-content">{blog.content.slice(0, 150)}...</p>
              <Link to={`/blog/${blog.id}`} className="read-more">
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
