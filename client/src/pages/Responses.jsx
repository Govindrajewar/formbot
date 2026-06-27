import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";
import "../style/Responses/Responses.css";

function Responses() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/formdata/${formId}`)
      .then((response) => setFormName(response.data.formName))
      .catch(() => setLoadError("Could not load this form"));
  }, [formId]);

  const loadResponses = (pageToLoad) => {
    axiosInstance
      .get(`/formdata/${formId}/responses?page=${pageToLoad}`)
      .then((res) => {
        setResponses((prev) =>
          pageToLoad === 1 ? res.data.data : [...prev, ...res.data.data]
        );
        setPage(res.data.page);
        setHasMore(res.data.page < res.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching responses!", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadResponses(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  return (
    <div className="responses-page">
      <NavBar centerText={formName ? `Responses - ${formName}` : "Responses"} />

      <div className="responses-main">
        <button className="responses-back" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={16} />
          Back to dashboard
        </button>

        <h1 className="responses-title">{formName || "Form"} responses</h1>

        {loadError ? (
          <div className="responses-status-message">{loadError}</div>
        ) : isLoading ? (
          <div className="responses-status-message">Loading responses...</div>
        ) : responses.length === 0 ? (
          <div className="responses-status-message">No responses collected yet.</div>
        ) : (
          <div className="responses-list">
            {responses.map((response) => (
              <div className="response-item" key={response._id}>
                <div className="response-item-date">
                  {new Date(response.createdAt).toLocaleString()}
                </div>
                {response.answers.map((answer) => (
                  <div className="response-answer" key={answer.itemId}>
                    <span className="response-answer-type">{answer.type}:</span>{" "}
                    {answer.value}
                  </div>
                ))}
              </div>
            ))}
            {hasMore && (
              <div className="load-more-responses" onClick={() => loadResponses(page + 1)}>
                Load more
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Responses;
