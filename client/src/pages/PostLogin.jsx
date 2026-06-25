import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import "../style/PostLogin/PostLogin.css";
import addFolder from "../assets/PostLogin/addFolder.png";
import drop from "../assets/PostLogin/drop.png";
import deleteIcon from "../assets/PostLogin/delete.png";
import upArrow from "../assets/PostLogin/upArrow.png";
import { useNavigate } from "react-router-dom";

function PostLogin() {
  // eslint-disable-next-line
  const [userName, setUsername] = useState(
    localStorage.getItem("formBotCurrentUser")
  );
  const [isListVisible, setIsListVisible] = useState(false);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [isDeleteFolder, setIsDeleteFolder] = useState(false);
  const [deleteIndexFolder, setDeleteIndexFolder] = useState(0);
  const [forms, setForms] = useState([]);
  const [formsPage, setFormsPage] = useState(1);
  const [hasMoreForms, setHasMoreForms] = useState(false);

  const navigate = useNavigate();

  const loadForms = (page) => {
    axiosInstance
      .get(`/formdata?page=${page}`)
      .then((response) => {
        const userForms = response.data.data.map((item) => ({
          formName: item.formName,
          formId: item._id,
        }));
        setForms((prevForms) => (page === 1 ? userForms : [...prevForms, ...userForms]));
        setFormsPage(response.data.page);
        setHasMoreForms(response.data.page < response.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    loadForms(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreForms = () => {
    loadForms(formsPage + 1);
  };

  useEffect(() => {
    axiosInstance
      .get(`/folders?limit=100`)
      .then((response) => {
        setFolders(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the folders!", error);
      });
  }, []);

  const goToForm = (formId) => {
    navigate(`/viewForm/${formId}`);
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("formBotCurrentUser");
    localStorage.removeItem("formBotToken");
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() !== "") {
      axiosInstance
        .post(`/folders`, { name: newFolderName.trim() })
        .then((response) => {
          setFolders([...folders, response.data]);
        })
        .catch((error) => {
          console.error("There was an error creating the folder!", error);
        });
      setNewFolderName("");
      setIsCreateFolder(!isCreateFolder);
    }
  };

  const deleteFolder = (deleteIndexFolder) => {
    setIsDeleteFolder(!isDeleteFolder);
    setDeleteIndexFolder(deleteIndexFolder);
  };

  const handleDeleteFolder = () => {
    const folderToDelete = folders[deleteIndexFolder];

    axiosInstance
      .delete(`/folders/${folderToDelete._id}`)
      .then(() => {
        setFolders(folders.filter((_, i) => i !== deleteIndexFolder));
      })
      .catch((error) => {
        console.error("There was an error deleting the folder!", error);
      });

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

  // TODO: Modify the delete functionality in backend
  const handleDeleteForm = (formId) => {
    axiosInstance
      .delete(`/formdata/${formId}`)
      .then(() => {
        setForms(forms.filter((form) => form.formId !== formId));
      })
      .catch((error) => {
        console.error("There was an error deleting the form!", error);
      });

    alert("Form deleted successfully");
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
              <div className="tab" key={folder._id}>
                {folder.name}
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
            Create a TypeBot
          </div>
          <div className="form-names">
            <div className="form-list">
              {forms.map(({ formName, formId }, index) => (
                <>
                  <div
                    className="form-list-item"
                    key={index}
                    onClick={() => goToForm(formId)}
                  >
                    <span>{formName}</span>
                  </div>

                  <img
                    src={deleteIcon}
                    alt="delete Icon"
                    className="delete-form-icon"
                    onClick={() => handleDeleteForm(formId)}
                  />
                </>
              ))}
            </div>
            {hasMoreForms && (
              <div className="load-more-forms" onClick={handleLoadMoreForms}>
                Load more
              </div>
            )}
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
