import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Workspace/Workspace.css";
import WorkspaceNavBar from "../components/Workspace/WorkspaceNavBar.jsx";
import Flow, { BUBBLE_TYPE_LABELS } from "../components/Workspace/Flow.jsx";
import axiosInstance from "../api/axiosInstance";
import {
  loadWorkspaceDraft,
  saveWorkspaceDraft,
} from "../utils/workspaceDraft";

const EMPTY_ITEM_COUNTS = {
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
};

const computeItemCounts = (items) => {
  const counts = { ...EMPTY_ITEM_COUNTS };
  items.forEach((item) => {
    const num = parseInt(item.id.split("-")[1], 10);
    if (!Number.isNaN(num) && counts[item.type] !== undefined && num > counts[item.type]) {
      counts[item.type] = num;
    }
  });
  return counts;
};

function Workspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const editFormId = location.state?.formId || null;
  const [folderId, setFolderId] = useState(location.state?.folderId || null);
  const [formName, setFormName] = useState(location.state?.formName || "");
  const [dynamicItems, setDynamicItems] = useState([]);
  const [itemCounts, setItemCounts] = useState(EMPTY_ITEM_COUNTS);
  const [currentFormId, setCurrentFormId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(editFormId));

  useEffect(() => {
    if (!editFormId) return;

    axiosInstance
      .get(`/formdata/${editFormId}`)
      .then((response) => {
        const data = response.data;
        setFormName(data.formName);
        setDynamicItems(data.itemList || []);
        setItemCounts(computeItemCounts(data.itemList || []));
        setFolderId(data.folderId || null);
        setCurrentFormId(data._id);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Could not load this form for editing");
        navigate("/dashboard");
      })
      .finally(() => setIsLoading(false));
  }, [editFormId, navigate]);

  // Restore an in-progress draft after a refresh/tab-close lost the router state.
  // A deliberate "Create a Form" navigation (location.state.formName present)
  // always starts clean instead of resuming a stale draft from a prior session.
  useEffect(() => {
    if (editFormId || location.state?.formName) return;

    const draft = loadWorkspaceDraft();
    if (draft) {
      setFormName(draft.formName || "");
      setDynamicItems(draft.dynamicItems || []);
      setItemCounts(draft.itemCounts || EMPTY_ITEM_COUNTS);
      setFolderId(draft.folderId || null);
      setCurrentFormId(draft.formId || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveWorkspaceDraft({ formId: currentFormId, folderId, formName, dynamicItems, itemCounts });
  }, [currentFormId, folderId, formName, dynamicItems, itemCounts, isLoading]);

  const handleSave = async () => {
    if (isSaving) return false;

    if (!formName) {
      alert("Enter Form Name");
      return false;
    }

    if (dynamicItems.length === 0) {
      alert("You must select items");
      return false;
    }

    const emptyBubble = dynamicItems.find(
      (item) => BUBBLE_TYPE_LABELS[item.type] && !item.value.trim()
    );
    if (emptyBubble) {
      alert(
        `Please enter the ${BUBBLE_TYPE_LABELS[emptyBubble.type]} bubble content before saving`
      );
      return false;
    }

    const dataToSave = {
      formName,
      itemList: dynamicItems,
      folderId,
    };

    setIsSaving(true);

    try {
      const response = currentFormId
        ? await axiosInstance.patch(`/formdata/${currentFormId}`, dataToSave)
        : await axiosInstance.post(`/dynamic-items`, dataToSave);
      setCurrentFormId(response.data._id);
      alert("Form Saved Successfully");
      return true;
    } catch (error) {
      alert(error.response?.data?.message || "There was an error saving the form");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="workspace" />;
  }

  return (
    <div className="workspace">
      <WorkspaceNavBar
        formName={formName}
        setFormName={setFormName}
        dynamicItems={dynamicItems}
        handleSave={handleSave}
        currentFormId={currentFormId}
        isSaving={isSaving}
      />
      <Flow
        formName={formName}
        dynamicItems={dynamicItems}
        setDynamicItems={setDynamicItems}
        itemCounts={itemCounts}
        setItemCounts={setItemCounts}
      />
    </div>
  );
}

export default Workspace;
