import "../../style/Workspace/Flow.css";
import {
  Rocket,
  X,
  MessageSquare,
  Image,
  Video,
  Film,
  TextCursorInput,
  Hash,
  Mail,
  Phone,
  Calendar,
  Star,
  MousePointerClick,
} from "lucide-react";

const ITEM_TYPES = {
  text: {
    category: "bubble",
    Icon: MessageSquare,
    paletteLabel: "Text",
    paletteAlt: "Text Bubble",
    headerLabel: "Text",
    itemAlt: "Text Bubble",
    placeholder: "Click here to edit",
    htmlType: "text",
  },
  image: {
    category: "bubble",
    Icon: Image,
    paletteLabel: "Image",
    paletteAlt: "Images Bubble",
    headerLabel: "Image",
    itemAlt: "Images Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  video: {
    category: "bubble",
    Icon: Video,
    paletteLabel: "Video",
    paletteAlt: "Video Bubble",
    headerLabel: "Video",
    itemAlt: "Video Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  gif: {
    category: "bubble",
    Icon: Film,
    paletteLabel: "GIF",
    paletteAlt: "GIF Bubble",
    headerLabel: "GIF",
    itemAlt: "GIF Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  textInput: {
    category: "input",
    Icon: TextCursorInput,
    paletteLabel: "Text",
    paletteAlt: "Text Input",
    headerLabel: "Input Text",
    itemAlt: "Text Input",
    placeholder: "Hint: User will input text on the form",
    htmlType: "text",
  },
  numberInput: {
    category: "input",
    Icon: Hash,
    paletteLabel: "Number",
    paletteAlt: "Number Input",
    headerLabel: "Input Number",
    itemAlt: "Number Input",
    placeholder: "Hint: User will input a number on the form",
    htmlType: "number",
  },
  emailInput: {
    category: "input",
    Icon: Mail,
    paletteLabel: "Email",
    paletteAlt: "Email Input",
    headerLabel: "Input Email",
    itemAlt: "Email Input",
    placeholder: "Hint: User will input an email on the form",
    htmlType: "email",
  },
  phoneInput: {
    category: "input",
    Icon: Phone,
    paletteLabel: "Phone",
    paletteAlt: "Phone Input",
    headerLabel: "Input Phone",
    itemAlt: "Phone Input",
    placeholder: "Hint: User will input a phone number on the form",
    htmlType: "tel",
  },
  dateInput: {
    category: "input",
    Icon: Calendar,
    paletteLabel: "Date",
    paletteAlt: "Date Input",
    headerLabel: "Input Date",
    itemAlt: "Date Input",
    placeholder: "Hint: User will select a date",
    htmlType: "text",
  },
  ratingInput: {
    category: "input",
    Icon: Star,
    paletteLabel: "Rating",
    paletteAlt: "Rating Input",
    headerLabel: "Input Rating",
    itemAlt: "Rating Input",
    placeholder: "Hint: User will tap to rate out of 5",
    htmlType: "text",
  },
  buttonInput: {
    category: "input",
    Icon: MousePointerClick,
    paletteLabel: "Button",
    paletteAlt: "Button Input",
    headerLabel: "Input Button",
    itemAlt: "Button Input",
    placeholder: "",
    htmlType: "button",
  },
};

const BUBBLE_TYPES = Object.entries(ITEM_TYPES).filter(([, cfg]) => cfg.category === "bubble");
const INPUT_PALETTE_TYPES = Object.entries(ITEM_TYPES).filter(([, cfg]) => cfg.category === "input");

export const BUBBLE_TYPE_LABELS = Object.fromEntries(
  BUBBLE_TYPES.map(([type, config]) => [type, config.headerLabel])
);

function Flow({ dynamicItems, setDynamicItems, itemCounts, setItemCounts }) {
  const handleAddItem = (type) => {
    const newId = itemCounts[type] + 1;
    const newItem = {
      id: `${type}-${newId}`,
      type,
      placeholder: ITEM_TYPES[type].placeholder,
      value: "",
    };

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [type]: newId,
    }));

    setDynamicItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (idToDelete) => {
    setDynamicItems(dynamicItems.filter((item) => item.id !== idToDelete));
  };

  const handleInputChange = (id, newValue) => {
    setDynamicItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div className="flow">
      <div className="flow-items">
        <div className="flow-container">
          <div className="sub-header sub-header-bubbles">Bubbles</div>
          <div className="bubbles">
            {BUBBLE_TYPES.map(([type, config]) => (
              <div
                className="bubble"
                key={type}
                onClick={() => handleAddItem(type)}
              >
                <config.Icon size={22} aria-label={config.paletteAlt} />
                {config.paletteLabel}
              </div>
            ))}
          </div>

          <div className="sub-header">Inputs</div>
          <div className="bubbles">
            {INPUT_PALETTE_TYPES.map(([type, config]) => (
              <div
                className="bubble"
                key={type}
                onClick={() => handleAddItem(type)}
              >
                <config.Icon size={22} aria-label={config.paletteAlt} />
                {config.paletteLabel}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flowchart-container">
        <div className="start-header">
          <Rocket size={20} />
          Start
        </div>
        {dynamicItems.map((item) => {
          const config = ITEM_TYPES[item.type];

          return (
            <div className="text-item" key={item.id}>
              <div
                id="deleteId"
                role="button"
                aria-label="delete"
                onClick={() => handleDeleteItem(item.id)}
              >
                <X size={14} />
              </div>
              <div className="item-header">
                {config
                  ? `${config.headerLabel} ${item.id.split("-")[1]}`
                  : "Unknown"}
              </div>

              <div className="item-data">
                {config ? (
                  <>
                    <config.Icon size={20} aria-label={config.itemAlt} />
                    <input
                      type={config.htmlType}
                      placeholder={item.placeholder}
                      value={item.value}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      disabled={config.category === "input"}
                    />
                  </>
                ) : (
                  <div>Unknown Item Type</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Flow;
