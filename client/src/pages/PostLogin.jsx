import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import "../style/PostLogin/PostLogin.css";
import { FolderPlus, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";

function PostLogin() {
  const [userName] = useState(localStorage.getItem("formBotCurrentUser"));
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [isDeleteFolder, setIsDeleteFolder] = useState(false);
  const [deleteIndexFolder, setDeleteIndexFolder] = useState(0);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsPage, setFormsPage] = useState(1);
  const [hasMoreForms, setHasMoreForms] = useState(false);
  const [isLoadingForms, setIsLoadingForms] = useState(true);

  const navigate = useNavigate();

  const loadForms = (page, folderId) => {
    setIsLoadingForms(true);
    const folderQuery = folderId ? `&folderId=${folderId}` : "";

    axiosInstance
      .get(`/formdata?page=${page}${folderQuery}`)
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
      })
      .finally(() => {
        setIsLoadingForms(false);
      });
  };

  useEffect(() => {
    loadForms(1, selectedFolderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  const handleLoadMoreForms = () => {
    loadForms(formsPage + 1, selectedFolderId);
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
    navigate(`/form/${formId}`);
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
        if (selectedFolderId === folderToDelete._id) {
          setSelectedFolderId(null);
        }
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

  const createTypeBot = () => {
    navigate("/Workspace", { state: { folderId: selectedFolderId } });
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
    <div className="PostLogin">
      <NavBar
        centerText={userName ? `${userName}'s workspace` : "Your workspace"}
      />

      <div className="dashboard-main">
        <div className="workspace-content">
          <div className="workspace-folder-content">
            <div
              className="folder-button"
              onClick={() => setIsCreateFolder(!isCreateFolder)}
            >
              <FolderPlus size={16} />
              Create a folder
            </div>
            <div className="tabs">
              <div
                className={`tab ${selectedFolderId === null ? "tab-selected" : ""}`}
                onClick={() => setSelectedFolderId(null)}
              >
                All forms
              </div>
              {folders.map((folder, index) => (
                <div
                  className={`tab ${selectedFolderId === folder._id ? "tab-selected" : ""}`}
                  key={folder._id}
                  onClick={() => setSelectedFolderId(folder._id)}
                >
                  {folder.name}
                  <span
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFolder(index);
                    }}
                  >
                    <Trash2 size={16} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="create-typebot">
            <div className="typebot-button" onClick={createTypeBot}>
              <Plus className="plus-sign" size={40} />
              Create a TypeBot
            </div>

            {isLoadingForms ? (
              <div className="forms-status-message">Loading your forms...</div>
            ) : forms.length === 0 ? (
              <div className="forms-status-message">
                No forms yet - create one to get started.
              </div>
            ) : (
              forms.map(({ formName, formId }, index) => (
                <div className="form-list-card" key={index}>
                  <div
                    className="form-list-item"
                    onClick={() => goToForm(formId)}
                  >
                    <span>{formName}</span>
                  </div>

                  <button
                    className="delete-form-icon"
                    aria-label="Delete form"
                    onClick={() => handleDeleteForm(formId)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {hasMoreForms && (
            <div className="load-more-forms" onClick={handleLoadMoreForms}>
              Load more
            </div>
          )}
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

      <Footer />
    </div>
  );
}

export default PostLogin;
