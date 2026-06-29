import { useState } from "react";
import "../../style/Workspace/WorkspaceNavBar.css";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Eye, ArrowLeft, X } from "lucide-react";
import { useColorMode } from "../../context/ColorModeContext";
import ShareMenu from "../Shared/ShareMenu";
import { clearWorkspaceDraft } from "../../utils/workspaceDraft";
import { getFirstName } from "../../utils/formatName";
import { buildAppUrl } from "../../deploymentLink";

function WorkspaceNavBar({
  formName,
  setFormName,
  dynamicItems,
  handleSave,
  currentFormId,
  isSaving,
}) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isConfirmingClose, setIsConfirmingClose] = useState(false);
  const [isSavingAndLeaving, setIsSavingAndLeaving] = useState(false);
  const userName = getFirstName(localStorage.getItem("formBotCurrentUser"));

  const handleLeaveWithoutSaving = () => {
    clearWorkspaceDraft();
    setIsConfirmingClose(false);
    navigate("/dashboard");
  };

  const handleSaveAndLeave = async () => {
    setIsSavingAndLeaving(true);
    const success = await handleSave();
    setIsSavingAndLeaving(false);
    if (success) {
      clearWorkspaceDraft();
      setIsConfirmingClose(false);
      navigate("/dashboard");
    }
  };

  const openPreview = () => {
    if (dynamicItems.length === 0) return;
    localStorage.setItem(
      "formBotPreviewData",
      JSON.stringify({ formName, itemList: dynamicItems })
    );
    window.open("/preview", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="header-container">
      <button
        className="back-btn"
        type="button"
        onClick={() => setIsConfirmingClose(true)}
        aria-label="Back to dashboard"
      >
        <ArrowLeft size={16} />
        Dashboard
      </button>

      <input
        className="form-name-input"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Untitled form"
        title={formName}
      />

      <div className="header-center">
        {userName ? `${userName}'s workspace` : "Your workspace"}
      </div>

      <div className="buttons">
        <button
          className="color-mode-toggle"
          onClick={toggleColorMode}
          aria-label="Toggle light/dark mode"
          type="button"
        >
          {colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button
          className="preview-btn"
          type="button"
          disabled={dynamicItems.length === 0}
          title={dynamicItems.length === 0 ? "Add some items to preview" : "Preview this form"}
          onClick={openPreview}
        >
          <Eye size={14} />
          Preview
        </button>
        {currentFormId ? (
          <ShareMenu link={buildAppUrl(`/form/${currentFormId}`)} />
        ) : (
          <button
            className="share-btn"
            type="button"
            disabled
            title="Save the form first"
          >
            Share
          </button>
        )}
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className="close-btn"
          type="button"
          aria-label="close"
          onClick={() => setIsConfirmingClose(true)}
        >
          <X size={16} />
        </button>
      </div>

      {isConfirmingClose && (
        <div className="workspace-modal-overlay" onClick={() => setIsConfirmingClose(false)}>
          <div className="workspace-modal" onClick={(e) => e.stopPropagation()}>
            <div className="workspace-modal-title">Leave this form?</div>
            <div className="workspace-modal-message">
              Save your changes before leaving, or leave without saving.
            </div>
            <div className="workspace-modal-buttons">
              <button
                className="workspace-modal-cancel"
                onClick={() => setIsConfirmingClose(false)}
              >
                Cancel
              </button>
              <button
                className="workspace-modal-discard"
                onClick={handleLeaveWithoutSaving}
              >
                Leave without saving
              </button>
              <button
                className="workspace-modal-confirm"
                onClick={handleSaveAndLeave}
                disabled={isSavingAndLeaving}
              >
                {isSavingAndLeaving ? "Saving..." : "Save & Leave"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkspaceNavBar;
