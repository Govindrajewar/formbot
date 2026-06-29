import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import "../style/PostLogin/PostLogin.css";
import { FolderPlus, Trash2, Plus, Pencil, BarChart3, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";
import ShareMenu from "../components/Shared/ShareMenu";
import { getFirstName } from "../utils/formatName";
import { buildAppUrl } from "../deploymentLink";

function PostLogin() {
  const [userName] = useState(getFirstName(localStorage.getItem("formBotCurrentUser")));
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [isDeleteFolder, setIsDeleteFolder] = useState(false);
  const [deleteIndexFolder, setDeleteIndexFolder] = useState(0);
  const [editFolderTarget, setEditFolderTarget] = useState(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsPage, setFormsPage] = useState(1);
  const [hasMoreForms, setHasMoreForms] = useState(false);
  const [isLoadingForms, setIsLoadingForms] = useState(true);
  const [pendingFormAction, setPendingFormAction] = useState(null);
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [newFormName, setNewFormName] = useState("");

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

  const editForm = (formId) => {
    navigate("/Workspace", { state: { formId } });
  };

  const viewResponses = (formId) => {
    navigate(`/responses/${formId}`);
  };

  const requestFormAction = (type, formId, formName) => {
    setPendingFormAction({ type, formId, formName });
  };

  const confirmFormAction = () => {
    if (!pendingFormAction) return;
    const { type, formId } = pendingFormAction;

    if (type === "edit") {
      editForm(formId);
    } else if (type === "delete") {
      handleDeleteForm(formId);
    }

    setPendingFormAction(null);
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
      setIsCreateFolder(false);
    }
  };

  const deleteFolder = (deleteIndexFolder) => {
    setIsDeleteFolder(true);
    setDeleteIndexFolder(deleteIndexFolder);
  };

  const startEditFolder = (folder) => {
    setEditFolderTarget(folder);
    setEditFolderName(folder.name);
  };

  const handleUpdateFolder = () => {
    if (!editFolderTarget || editFolderName.trim() === "") return;

    axiosInstance
      .patch(`/folders/${editFolderTarget._id}`, { name: editFolderName.trim() })
      .then((response) => {
        setFolders((prev) =>
          prev.map((folder) => (folder._id === response.data._id ? response.data : folder))
        );
      })
      .catch((error) => {
        console.error("There was an error updating the folder!", error);
      });

    setEditFolderTarget(null);
    setEditFolderName("");
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

    setIsDeleteFolder(false);
  };

  const closeAnyModal = () => {
    setIsCreateFolder(false);
    setNewFolderName("");
    setIsDeleteFolder(false);
    setDeleteIndexFolder(0);
    setEditFolderTarget(null);
    setEditFolderName("");
    setPendingFormAction(null);
    setIsCreateForm(false);
    setNewFormName("");
  };

  const createTypeBot = () => {
    setIsCreateForm(true);
  };

  const handleCreateForm = () => {
    if (newFormName.trim() === "") return;

    navigate("/Workspace", {
      state: { folderId: selectedFolderId, formName: newFormName.trim() },
    });
    setIsCreateForm(false);
    setNewFormName("");
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
            <div className="folder-button" onClick={() => setIsCreateFolder(true)}>
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
                  <span className="tab-icons">
                    <span
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditFolder(folder);
                      }}
                    >
                      <Pencil size={14} />
                    </span>
                    <span
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFolder(index);
                      }}
                    >
                      <Trash2 size={14} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="create-typebot">
            <div className="typebot-button" onClick={createTypeBot}>
              <Plus className="plus-sign" size={40} />
              <span>Create a Form</span>
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

                  <div className="form-card-actions">
                    <button
                      className="form-icon-btn"
                      aria-label="View responses"
                      onClick={() => viewResponses(formId)}
                    >
                      <BarChart3 size={16} />
                    </button>
                    <button
                      className="form-icon-btn"
                      aria-label="Edit form"
                      onClick={() => requestFormAction("edit", formId, formName)}
                    >
                      <Pencil size={16} />
                    </button>
                    <ShareMenu
                      variant="icon"
                      link={buildAppUrl(`/form/${formId}`)}
                    />
                    <button
                      className="form-icon-btn form-icon-btn-delete"
                      aria-label="Delete form"
                      onClick={() => requestFormAction("delete", formId, formName)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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

        {(isCreateFolder ||
          isDeleteFolder ||
          editFolderTarget ||
          pendingFormAction ||
          isCreateForm) && (
          <div className="modal-overlay" onClick={closeAnyModal}>
            {isCreateFolder && (
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-card-header">
                  <FolderPlus size={20} />
                  <label htmlFor="createFolderId">Create new folder</label>
                </div>
                <input
                  type="text"
                  id="createFolderId"
                  placeholder="Enter folder name"
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <div className="modal-card-buttons">
                  <button className="modal-btn-cancel" onClick={closeAnyModal}>
                    Cancel
                  </button>
                  <button className="modal-btn-primary" onClick={handleCreateFolder}>
                    Done
                  </button>
                </div>
              </div>
            )}

            {editFolderTarget && (
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-card-header">
                  <Pencil size={20} />
                  <label htmlFor="editFolderNameId">Rename folder</label>
                </div>
                <input
                  type="text"
                  id="editFolderNameId"
                  placeholder="Enter folder name"
                  autoFocus
                  value={editFolderName}
                  onChange={(e) => setEditFolderName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdateFolder()}
                />
                <div className="modal-card-buttons">
                  <button className="modal-btn-cancel" onClick={closeAnyModal}>
                    Cancel
                  </button>
                  <button className="modal-btn-primary" onClick={handleUpdateFolder}>
                    Save
                  </button>
                </div>
              </div>
            )}

            {isDeleteFolder && (
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-card-header">
                  <AlertTriangle size={20} />
                  <span>Delete this folder?</span>
                </div>
                <div className="modal-card-buttons">
                  <button className="modal-btn-cancel" onClick={closeAnyModal}>
                    Cancel
                  </button>
                  <button className="modal-btn-danger" onClick={handleDeleteFolder}>
                    Delete
                  </button>
                </div>
              </div>
            )}

            {pendingFormAction && (
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-card-header">
                  {pendingFormAction.type === "delete" ? (
                    <AlertTriangle size={20} />
                  ) : (
                    <Pencil size={20} />
                  )}
                  <span>
                    {pendingFormAction.type === "delete"
                      ? `Delete "${pendingFormAction.formName}"? This can't be undone.`
                      : `Edit "${pendingFormAction.formName}"?`}
                  </span>
                </div>
                <div className="modal-card-buttons">
                  <button className="modal-btn-cancel" onClick={closeAnyModal}>
                    Cancel
                  </button>
                  <button
                    className={
                      pendingFormAction.type === "delete"
                        ? "modal-btn-danger"
                        : "modal-btn-primary"
                    }
                    onClick={confirmFormAction}
                  >
                    {pendingFormAction.type === "delete" ? "Delete" : "Edit"}
                  </button>
                </div>
              </div>
            )}

            {isCreateForm && (
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-card-header">
                  <Plus size={20} />
                  <label htmlFor="createFormNameId">Name your form</label>
                </div>
                <input
                  type="text"
                  id="createFormNameId"
                  placeholder="Enter form name"
                  autoFocus
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateForm()}
                />
                <div className="modal-card-buttons">
                  <button className="modal-btn-cancel" onClick={closeAnyModal}>
                    Cancel
                  </button>
                  <button className="modal-btn-primary" onClick={handleCreateForm}>
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default PostLogin;
