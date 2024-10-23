import "../style/Desktop/Desktop.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import icon from "../../src/assets/Workspace/Theme/icon.png";
import send from "../assets/Desktop/send.png";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../deploymentLink";

function Desktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const formName = location.state?.formName;

  // eslint-disable-next-line
  const [isLoggedInFormBot, setIsLoggedInFormBot] = useState(
    localStorage.getItem("isLoggedInFormBot") === "true"
  );

  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState({});

  useEffect(() => {
    if (!isLoggedInFormBot) {
      navigate("/login");
    }
  }, [isLoggedInFormBot, navigate]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/formdata`)
      .then((response) => {
        const initialValues = response.data.reduce((acc, form) => {
          form.itemList.forEach((item, index) => {
            acc[index] = "";
          });
          return acc;
        }, {});
        setInputValues(initialValues);
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleInputChange = (index, value, type) => {
    setInputValues({
      ...inputValues,
      [index]: value,
    });

    if (type === "emailInput") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [index]: null });
      } else {
        setErrors({ ...errors, [index]: "Invalid email address" });
      }
    } else if (type === "phoneInput") {
      if (validatePhone(value)) {
        setErrors({ ...errors, [index]: null });
      } else {
        setErrors({ ...errors, [index]: "Invalid phone number" });
      }
    } else if (type === "dateInput") {
      if (validateDate(value)) {
        setErrors({ ...errors, [index]: null });
      } else {
        setErrors({ ...errors, [index]: "Invalid date" });
      }
    } else if (type === "ratingInput") {
      if (validateRating(value)) {
        setErrors({ ...errors, [index]: null });
      } else {
        setErrors({ ...errors, [index]: "Invalid rating" });
      }
    } else {
      setErrors({ ...errors, [index]: null });
    }
  };

  const handleFormSubmit = (index) => {
    const updatedData = data.map((form) => ({
      ...form,
      itemList: form.itemList.map((item, itemIndex) =>
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
    }));
    setData(updatedData);
    setIsDisabled({ ...isDisabled, [index]: true });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const validateDate = (date) => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
  };

  const validateRating = (rating) => {
    return rating >= 1 && rating <= 5;
  };

  const filteredData = data.filter((form) => form.formName === formName);

  return (
    <div className="desktop">
      <div className="chat-container">
        {filteredData.length > 0 ? (
          filteredData.map((form) => {
            let isEmpty = false;
            return form.itemList.map((item, index) => {
              if (isEmpty) return null;

              const isInputEmpty =
                (item.type === "textInput" ||
                  item.type === "numberInput" ||
                  item.type === "emailInput" ||
                  item.type === "phoneInput" ||
                  item.type === "dateInput" ||
                  item.type === "ratingInput" ||
                  item.type === "buttonInput") &&
                !inputValues[index];
              if (isInputEmpty) isEmpty = true;

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
                    <>
                      <img
                        src={item.value}
                        alt="Invalid URL"
                        className="data-image"
                      />
                    </>
                  ) : item.type === "video" ? (
                    <>
                      <video src={item.value} controls className="data-video">
                        Your browser does not support the video tag.
                      </video>
                    </>
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
                    <>
                      {item.value ? (
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
                                  : item.type === "dateInput"
                                  ? "date"
                                  : "button"
                              }
                              value={item.value || ""}
                              className={
                                item.type === "textInput"
                                  ? "text-input-dark"
                                  : item.type === "numberInput"
                                  ? "number-input-dark"
                                  : item.type === "emailInput"
                                  ? "email-input-dark"
                                  : item.type === "phoneInput"
                                  ? "phone-input-dark"
                                  : item.type === "dateInput"
                                  ? "date-input-dark"
                                  : "button-input-dark"
                              }
                              disabled
                            />
                          )}
                          <button className="submit-button-dark" disabled>
                            <img src={send} alt="Send" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-input-container">
                          {item.type === "ratingInput" ? (
                            <div
                              className={`rating-container ${
                                isDisabled[index] ? "disabled" : ""
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
                          ) : item.type === "buttonInput" ? (
                            <>
                              <input
                                type="text"
                                placeholder="Enter button text"
                                className="button-input"
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    e.target.value,
                                    item.type
                                  )
                                }
                                disabled={isDisabled[index]}
                              />
                            </>
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
                        </div>
                      )}
                      {errors[index] && (
                        <div className="display-error-message">
                          {errors[index]}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            });
          })
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Desktop;
