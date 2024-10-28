import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Workspace/Workspace.css";
import WorkspaceNavBar from "../components/Workspace/WorkspaceNavBar.jsx";
import Flow from "../components/Workspace/Flow.jsx";
import Theme from "../components/Workspace/Theme.jsx";
import Response from "../components/Workspace/Response.jsx";
import axios from "axios";
import { BACKEND_URL } from "../deploymentLink";

function Workspace() {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [isLoggedInFormBot, setIsLoggedInFormBot] = useState(
    localStorage.getItem("isLoggedInFormBot") === "true"
  );
  // eslint-disable-next-line
  const [user, setUser] = useState(location.state?.userName);
  const [activeComponent, setActiveComponent] = useState("Flow");
  const [formName, setFormName] = useState("");
  const [dynamicItems, setDynamicItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({
    text: 0,
    image: 0,
    video: 0,
    gif: 0,
    textInput: 0,
    numberInput: 0,
    emailInput: 0,
    phoneInput: 0,
    dateInput: 0,
    ratingInput: 0,
    buttonInput: 0,
  });
  const [currentFormId, setCurrentFormId] = useState("");

  useEffect(() => {
    if (!isLoggedInFormBot) {
      navigate("/login");
    }
  }, [isLoggedInFormBot, navigate]);

  const handleSave = () => {
    if (!formName) {
      alert("Enter Form Name");
      return;
    }

    if (dynamicItems.length === 0) {
      alert("You must select items");
      return;
    }

    const dataToSave = {
      formName,
      user,
      itemList: dynamicItems,
    };

    console.log(dataToSave);

    axios
      .post(`${BACKEND_URL}/dynamic-items`, dataToSave)
      .then((response) => {
        console.log("Items saved:", response.data);
        setCurrentFormId(response.data._id);
      })
      .catch((error) => {
        console.error("There was an error saving the items!", error);
      });

    alert("Form Saved Successfully");
  };

  return (
    <div className="workspace">
      <WorkspaceNavBar
        setActiveComponent={setActiveComponent}
        formName={formName}
        setFormName={setFormName}
        handleSave={handleSave}
        currentFormId={currentFormId}
      />
      {activeComponent === "Flow" && (
        <Flow
          formName={formName}
          dynamicItems={dynamicItems}
          setDynamicItems={setDynamicItems}
          itemCounts={itemCounts}
          setItemCounts={setItemCounts}
        />
      )}
      {activeComponent === "Theme" && <Theme />}
      {activeComponent === "Response" && <Response />}
    </div>
  );
}

export default Workspace;
