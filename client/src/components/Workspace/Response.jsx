import { useEffect, useState } from "react";
import "../../style/Workspace/Response.css";
import axiosInstance from "../../api/axiosInstance";

function Response({ currentFormId }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (!currentFormId) {
      return;
    }

    axiosInstance
      .get(`/formdata/${currentFormId}/responses`)
      .then((res) => setResponses(res.data))
      .catch((error) => {
        console.error("There was an error fetching responses!", error);
      });
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
    </div>
  );
}

export default Response;
