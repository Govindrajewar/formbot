import { useEffect, useState } from "react";
import "../../style/Workspace/Response.css";
import axiosInstance from "../../api/axiosInstance";

function Response({ currentFormId }) {
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadResponses = (pageToLoad) => {
    axiosInstance
      .get(`/formdata/${currentFormId}/responses?page=${pageToLoad}`)
      .then((res) => {
        setResponses((prev) => (pageToLoad === 1 ? res.data.data : [...prev, ...res.data.data]));
        setPage(res.data.page);
        setHasMore(res.data.page < res.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching responses!", error);
      });
  };

  useEffect(() => {
    if (!currentFormId) {
      return;
    }
    loadResponses(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFormId]);

  if (!currentFormId || responses.length === 0) {
    return <div className="response">No Response yet collected</div>;
  }

  return (
    <div className="response response-list">
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
  );
}

export default Response;
