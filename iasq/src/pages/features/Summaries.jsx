import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import Header from "../../components/header";
import PCHeader from "../../components/PageContentHeader";

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const token = localStorage.getItem("accessToken"); 
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get("http://localhost:8000/api/v1/user/summaries/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.data)) {
          setSummaries(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="page-content px-[64px] py-[48px]">
        <PCHeader pageHeader="Your Summaries" />
        {loading ? (
          <p className="text-center text-gray-600">Loading summaries...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : summaries.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-600">No summaries available.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/home")}
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px]">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className="summary-card pt-[16px] px-[16px] pb-[24px] border border-gray-400 rounded-lg shadow-md"
              >
                <div className="card-header text-sm text-gray-600">
                  <span>Topic: {summary.category || "No Category"}</span>
                </div>
                <div className="card-body">
                  <h1 className="card-title mb-3 text-lg font-bold">
                    {summary.title || "No Title"}
                  </h1>
                  <div className="card-details text-sm text-gray-600">
                    <p>{summary.content || "No content available"}</p>
                    <p>Created At: {new Date(summary.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summaries;
