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
        itemIndex === index &&
        (item.type === "textInput" ||
          item.type === "numberInput" ||
          item.type === "emailInput" ||
          item.type === "phoneInput" ||
          item.type === "dateInput" ||
          item.type === "ratingInput" ||
          item.type === "buttonInput")
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
                // eslint-disable-next-line
                const isInputEmpty =
                  (item.type === "textInput" ||
                    item.type === "numberInput" ||
                    item.type === "emailInput" ||
                    item.type === "phoneInput" ||
                    item.type === "dateInput" ||
                    item.type === "ratingInput" ||
                    item.type === "buttonInput") &&
                  !inputValues[index];

                return (
                  <div
                    key={index}
                    className={`data-container ${
                      item.type === "textInput" ||
                      item.type === "numberInput" ||
                      item.type === "emailInput" ||
                      item.type === "phoneInput" ||
                      item.type === "dateInput" ||
                      item.type === "ratingInput" ||
                      item.type === "buttonInput"
                        ? "right"
                        : "left"
                    }`}
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
                    ) : item.type !== "textInput" &&
                      item.type !== "numberInput" &&
                      item.type !== "emailInput" &&
                      item.type !== "phoneInput" &&
                      item.type !== "dateInput" &&
                      item.type !== "ratingInput" &&
                      item.type !== "buttonInput" ? (
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
                            type={
                              item.type === "textInput"
                                ? "text"
                                : item.type === "numberInput"
                                ? "number"
                                : item.type === "emailInput"
                                ? "email"
                                : item.type === "phoneInput"
                                ? "tel"
                                : "date"
                            }
                            value={inputValues[index] || ""}
                            placeholder={
                              item.type === "textInput"
                                ? "Enter your text"
                                : item.type === "numberInput"
                                ? "Enter your number"
                                : item.type === "emailInput"
                                ? "Enter your email"
                                : item.type === "phoneInput"
                                ? "Enter your phone number"
                                : "Enter your date"
                            }
                            className={
                              item.type === "textInput"
                                ? "text-input"
                                : item.type === "numberInput"
                                ? "number-input"
                                : item.type === "emailInput"
                                ? "email-input"
                                : item.type === "phoneInput"
                                ? "phone-input"
                                : item.type === "dateInput"
                                ? "date-input"
                                : "rating-input"
                            }
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
