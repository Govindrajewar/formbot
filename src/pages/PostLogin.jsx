import { useState, useEffect } from "react";
import axios from "axios";
import "../style/PostLogin/PostLogin.css";
import addFolder from "../assets/PostLogin/addFolder.png";
import drop from "../assets/PostLogin/drop.png";
import deleteIcon from "../assets/PostLogin/delete.png";
import upArrow from "../assets/PostLogin/upArrow.png";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../deploymentLink";

function PostLogin() {
  // eslint-disable-next-line
  const [userName, setUsername] = useState(
    localStorage.getItem("formBotCurrentUser")
  );
  // eslint-disable-next-line
  const [isLoggedInFormBot, setIsLoggedInFormBot] = useState(
    localStorage.getItem("isLoggedInFormBot") === "true"
  );
  const [isListVisible, setIsListVisible] = useState(false);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [isDeleteFolder, setIsDeleteFolder] = useState(false);
  const [deleteIndexFolder, setDeleteIndexFolder] = useState(0);
  const [formNames, setFormNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedInFormBot) {
      navigate("/login");
    }
  }, [isLoggedInFormBot, navigate]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/formdata`)
      .then((response) => {
        const userForms = response.data
          .filter((item) => item.user === userName)
          .map((item) => item.formName);
        setFormNames(userForms);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
    // eslint-disable-next-line
  }, []);

  const goToForm = (formName) => {
    navigate("/desktop", { state: { formName } });
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("formBotCurrentUser");
    localStorage.removeItem("isLoggedInFormBot");
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([...folders, newFolderName]);
      setNewFolderName("");
      setIsCreateFolder(!isCreateFolder);
    }
  };

  const deleteFolder = (deleteIndexFolder) => {
    setIsDeleteFolder(!isDeleteFolder);
    setDeleteIndexFolder(deleteIndexFolder);
  };

  const handleDeleteFolder = () => {
    const updatedFolders = folders.filter((_, i) => i !== deleteIndexFolder);
    setFolders(updatedFolders);
    setIsDeleteFolder(!isDeleteFolder);
  };

  const cancelButton = () => {
    setNewFolderName("");
    setDeleteIndexFolder(0);

    if (isCreateFolder) {
      setIsCreateFolder(!isCreateFolder);
    }

    if (isDeleteFolder) {
      setIsDeleteFolder(!isDeleteFolder);
    }
  };

  const hideList = () => {
    if (isListVisible) {
      setIsListVisible(!isListVisible);
    }
  };

  const createTypeBot = () => {
    navigate("/Workspace", { state: { userName } });
  };

  const handleDeleteForm = (formName) => {
    axios
      .delete(`${BACKEND_URL}/formdata/${formName}`)
      .then(() => {
        setFormNames(formNames.filter((name) => name !== formName));
      })
      .catch((error) => {
        console.error("There was an error deleting the form!", error);
      });

    alert("Form deleted successful");
  };

  return (
    <div className="PostLogin" onClick={hideList}>
      <header className="workspace-header">
        {isListVisible ? (
          <>
            <div
              className="header-h1"
              onClick={() => setIsListVisible(!isListVisible)}
            >
              {userName ? `${userName}'s workspace` : "Your workspace"}
              <img src={upArrow} alt="Up arrow" />
            </div>
            <div className="header-settings" onClick={handleSettings}>
              Settings
            </div>
            <div className="header-logOut" onClick={handleLogout}>
              Log Out
            </div>
          </>
        ) : (
          <>
            <div
              className="header-h1"
              onClick={() => setIsListVisible(!isListVisible)}
            >
              {userName ? `${userName}'s workspace` : "Your workspace"}
              <img src={drop} alt="drop arrow" />
            </div>
          </>
        )}
      </header>
      <div className="workspace-content">
        <div className="workspace-folder-content">
          <div
            className="folder-button"
            onClick={() => setIsCreateFolder(!isCreateFolder)}
          >
            <img src={addFolder} alt="Add Folder" />
            Create a folder
          </div>
          <div className="tabs">
            {folders.map((folder, index) => (
              <div className="tab" key={index}>
                {folder}
                <span
                  className="delete-icon"
                  onClick={() => deleteFolder(index)}
                >
                  <img src={deleteIcon} alt="delete Icon" />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="create-typebot">
          <div className="typebot-button" onClick={createTypeBot}>
            <br />
            <br />
            <span className="plus-sign">+</span>
            <br />
            <br />
            <br />
            Create a typebot
          </div>
          <div className="form-names">
            <div className="form-list">
              {formNames.map((formName, index) => (
                <div className="form-list-item" key={index}>
                  <span onClick={() => goToForm(formName)}>{formName}</span>
                  <span
                    className="delete-form-icon"
                    onClick={() => handleDeleteForm(formName)}
                  >
                    <img src={deleteIcon} alt="delete Icon" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCreateFolder && (
        <div className="createNewFolder">
          <label htmlFor="createFolderId">Create New Folder</label>
          <input
            type="text"
            id="createFolderId"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <div className="createNewFolder-buttons">
            <div className="done-button" onClick={handleCreateFolder}>
              Done
            </div>
            <div className="center-line">|</div>
            <div className="cancel-button" onClick={cancelButton}>
              Cancel
            </div>
          </div>
        </div>
      )}

      {isDeleteFolder && (
        <div className="DeleteNewFolder">
          <div id="DeleteFolderId">
            Are you sure you want to delete this folder ?
          </div>

          <div className="DeleteNewFolder-buttons">
            <div className="confirm-button" onClick={handleDeleteFolder}>
              Confirm
            </div>
            <div className="center-line">|</div>
            <div className="cancel-button" onClick={cancelButton}>
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostLogin;
