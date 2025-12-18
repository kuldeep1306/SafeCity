import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/tips");
      setFeedbacks(res.data.data);
    } catch (err) {
      console.error("Failed to fetch feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // DELETE handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      console.log("Deleting feedback with id:", id);

      await axios.delete(`http://localhost:9000/api/tips/${id}`);
      // Remove deleted feedback from state to update UI immediately
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Failed to delete feedback", err);
      alert("Delete failed. Try again.");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <style>{`
        .admin-feedback-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .feedback-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .feedback-table th,
        .feedback-table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
        .feedback-table th {
          background-color: #222;
          color: #fff;
        }
        .feedback-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }
        .feedback-img:hover {
          transform: scale(1.2);
        }
        .delete-btn {
          background-color: #ff4d4f;
          border: none;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .delete-btn:hover {
          background-color: #ff7875;
        }
      `}</style>

      <div className="admin-feedback-page">
        <h2>📋 All User Feedback</h2>

        <table className="feedback-table" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Description</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Image</th>
              <th>Date</th>
              <th>Action</th> {/* New column for Delete button */}
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>{item.tip}</td>
                <td>{item.anonymous ? "Anonymous" : item.contact || "N/A"}</td>
                <td>
                  {item.location
                    ? `${item.location.lat}, ${item.location.lng}`
                    : "Not Shared"}
                </td>
                <td>
                  {item.attachment ? (
                    <img
                      src={`http://localhost:9000/uploads/${item.attachment}`}
                      alt="proof"
                      className="feedback-img"
                      title="Click to view full image"
                      onClick={() =>
                        window.open(`http://localhost:9000/uploads/${item.attachment}`, "_blank")
                      }
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

