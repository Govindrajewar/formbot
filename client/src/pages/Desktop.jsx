import "../style/Desktop/Desktop.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import icon from "../../src/assets/Workspace/Theme/icon.png";
import send from "../assets/Desktop/send.png";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../deploymentLink";

const INPUT_TYPES = [
  "textInput",
  "numberInput",
  "emailInput",
  "phoneInput",
  "dateInput",
  "ratingInput",
  "buttonInput",
];

// Config for the generic <input> rendered by every input type except ratingInput
// (which gets its own star-picker UI below). NOTE: dateInput and buttonInput share
// the same entry here because that's the pre-existing behavior being preserved -
// buttonInput previously fell through to dateInput's type/placeholder and an
// unrelated "rating-input" class. Flagged separately as a bug to fix or not.
const RUNTIME_INPUT_CONFIG = {
  textInput: { htmlType: "text", placeholder: "Enter your text", className: "text-input" },
  numberInput: { htmlType: "number", placeholder: "Enter your number", className: "number-input" },
  emailInput: { htmlType: "email", placeholder: "Enter your email", className: "email-input" },
  phoneInput: { htmlType: "tel", placeholder: "Enter your phone number", className: "phone-input" },
  dateInput: { htmlType: "date", placeholder: "Enter your date", className: "date-input" },
  buttonInput: { htmlType: "date", placeholder: "Enter your date", className: "rating-input" },
};

function Desktop() {
  const location = useLocation();
  const currentFormId = location.pathname.split("/").at(2);
  const [data, setData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState({});
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/viewForm/${currentFormId}`)
      .then((response) => {
        const initialValues = response.data;
        setInputValues(initialValues);
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setFetchError(
          error.response?.data?.message || "This form could not be loaded"
        );
      });
  }, [currentFormId]);

  const handleInputChange = (index, value, type) => {
    setInputValues({
      ...inputValues,
      [index]: value,
    });

    if (type === "emailInput") {
      setErrors({
        ...errors,
        [index]: validateEmail(value) ? null : "Invalid email address",
      });
    } else if (type === "phoneInput") {
      setErrors({
        ...errors,
        [index]: validatePhone(value) ? null : "Invalid phone number",
      });
    } else if (type === "dateInput") {
      setErrors({
        ...errors,
        [index]: validateDate(value) ? null : "Invalid date",
      });
    } else if (type === "ratingInput") {
      setErrors({
        ...errors,
        [index]: validateRating(value) ? null : "Invalid rating",
      });
    } else {
      setErrors({ ...errors, [index]: null });
    }
  };

  const handleFormSubmit = (index) => {
    const updatedData = {
      ...data,
      itemList: data.itemList.map((item, itemIndex) =>
        itemIndex === index && INPUT_TYPES.includes(item.type)
          ? { ...item, value: inputValues[index] || "" }
          : item
      ),
    };
    setData(updatedData);

    const updatedIsDisabled = { ...isDisabled, [index]: true };
    setIsDisabled(updatedIsDisabled);

    const inputItemIndexes = updatedData.itemList
      .map((item, itemIndex) => ({ item, itemIndex }))
      .filter(({ item }) => INPUT_TYPES.includes(item.type))
      .map(({ itemIndex }) => itemIndex);

    const allInputsAnswered = inputItemIndexes.every(
      (itemIndex) => updatedIsDisabled[itemIndex]
    );

    if (allInputsAnswered) {
      const answers = inputItemIndexes.map((itemIndex) => ({
        itemId: updatedData.itemList[itemIndex].id,
        type: updatedData.itemList[itemIndex].type,
        value: String(inputValues[itemIndex] ?? ""),
      }));

      axios
        .post(`${BACKEND_URL}/formdata/${currentFormId}/responses`, { answers })
        .catch((error) => {
          console.error("There was an error submitting the response!", error);
        });
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validateDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  const validateRating = (rating) => rating >= 1 && rating <= 5;

  return (
    <div className="desktop">
      <div className="chat-container">
        {data ? (
          <>
            <h1 className="form-title">{data.formName}</h1>

            {data.itemList && data.itemList.length > 0 ? (
              data.itemList.map((item, index) => {
                const isInput = INPUT_TYPES.includes(item.type);

                return (
                  <div
                    key={index}
                    className={`data-container ${isInput ? "right" : "left"}`}
                  >
                    {item.type === "image" || item.type === "gif" ? (
                      <img
                        src={item.value}
                        alt="Invalid URL"
                        className="data-image"
                      />
                    ) : item.type === "video" ? (
                      <video src={item.value} controls className="data-video">
                        Your browser does not support the video tag.
                      </video>
                    ) : !isInput ? (
                      <>
                        <img src={icon} alt="icon" className="data-icon" />
                        <p className="chat-bubble">{item.value}</p>
                      </>
                    ) : (
                      <div className="text-input-container">
                        {item.type === "ratingInput" ? (
                          <div
                            className={`rating-container ${
                              isDisabled[index]
                                ? "disabled rating-container-dark"
                                : ""
                            }`}
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className={`rating-option ${
                                  inputValues[index] === rating
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  !isDisabled[index] &&
                                  handleInputChange(index, rating, item.type)
                                }
                              >
                                {rating}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={RUNTIME_INPUT_CONFIG[item.type]?.htmlType}
                            value={inputValues[index] || ""}
                            placeholder={RUNTIME_INPUT_CONFIG[item.type]?.placeholder}
                            className={RUNTIME_INPUT_CONFIG[item.type]?.className}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                e.target.value,
                                item.type
                              )
                            }
                            disabled={isDisabled[index]}
                          />
                        )}
                        <button
                          className="submit-button"
                          onClick={() => handleFormSubmit(index)}
                          disabled={!inputValues[index]}
                        >
                          <img src={send} alt="Send" />
                        </button>
                        {errors[index] && (
                          <div className="display-error-message">
                            {errors[index]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No items to display.</p>
            )}
          </>
        ) : fetchError ? (
          <p className="loading-message">{fetchError}</p>
        ) : (
          <p className="loading-message">Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Desktop;
