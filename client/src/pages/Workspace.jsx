import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/Workspace/Workspace.css";
import WorkspaceNavBar from "../components/Workspace/WorkspaceNavBar.jsx";
import Flow from "../components/Workspace/Flow.jsx";
import Theme from "../components/Workspace/Theme.jsx";
import Response from "../components/Workspace/Response.jsx";
import axiosInstance from "../api/axiosInstance";

function Workspace() {
  const location = useLocation();

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
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;

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

    setIsSaving(true);

    try {
      const response = await axiosInstance.post(`/dynamic-items`, dataToSave);
      setCurrentFormId(response.data._id);
      alert("Form Saved Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "There was an error saving the form");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="workspace">
      <WorkspaceNavBar
        setActiveComponent={setActiveComponent}
        formName={formName}
        setFormName={setFormName}
        handleSave={handleSave}
        currentFormId={currentFormId}
        isSaving={isSaving}
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
      {activeComponent === "Response" && (
        <Response currentFormId={currentFormId} />
      )}
    </div>
  );
}

export default Workspace;
