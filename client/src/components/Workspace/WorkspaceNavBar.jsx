import { useState } from "react";
import "../../style/Workspace/WorkspaceNavBar.css";
import close from "../../assets/Workspace/close.png";
import { useNavigate } from "react-router-dom";

function WorkspaceNavBar({
  setActiveComponent,
  formName,
  setFormName,
  handleSave,
  currentFormId,
}) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Flow");

  const handleItemClick = (item) => {
    setActiveComponent(item);
    setSelectedItem(item);
  };

  const handleShareForm = () => {
    if (!formName) {
      alert("Enter Form Name");
      return;
    }
    navigate(`/viewForm/${currentFormId}`);
  };

  const handleClose = () => {
    navigate("/postlogin");
  };

  return (
    <div className="header-container">
      <div className="form-name">
        <input
          type="text"
          placeholder="Enter Form Name"
          id="formNameId"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>
      <div className="item-container">
        <div
          className={`item ${selectedItem === "Flow" ? "selected-item" : ""}`}
          onClick={() => handleItemClick("Flow")}
        >
          Flow
        </div>
        <div
          className={`item ${selectedItem === "Theme" ? "selected-item" : ""}`}
          onClick={() => handleItemClick("Theme")}
        >
          Theme
        </div>
        <div
          className={`item ${
            selectedItem === "Response" ? "selected-item" : ""
          }`}
          onClick={() => handleItemClick("Response")}
        >
          Response
        </div>
      </div>
      <div className="buttons">
        <button className="share-btn" onClick={handleShareForm}>
          Share
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <img src={close} alt="close" onClick={handleClose} />
      </div>
    </div>
  );
}

export default WorkspaceNavBar;
