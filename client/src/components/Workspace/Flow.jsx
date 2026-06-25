import "../../style/Workspace/Flow.css";
import start from "../../assets/Workspace/Flow/start.png";
import deleteLogo from "../../assets/Workspace/Flow/delete.png";

// Bubble Icons
import textBubble from "../../assets/Workspace/Flow/Bubbles/text.png";
import image from "../../assets/Workspace/Flow/Bubbles/image.png";
import video from "../../assets/Workspace/Flow/Bubbles/video.png";
import gif from "../../assets/Workspace/Flow/Bubbles/gif.png";

// Input Icons
import textInput from "../../assets/Workspace/Flow/Inputs/text.png";
import numberInput from "../../assets/Workspace/Flow/Inputs/number.png";
import emailInput from "../../assets/Workspace/Flow/Inputs/email.png";
import phoneInput from "../../assets/Workspace/Flow/Inputs/phone.png";
import dateInput from "../../assets/Workspace/Flow/Inputs/date.png";
import ratingInput from "../../assets/Workspace/Flow/Inputs/rating.png";
import buttonInput from "../../assets/Workspace/Flow/Inputs/button.png";

const ITEM_TYPES = {
  text: {
    category: "bubble",
    icon: textBubble,
    paletteLabel: "Text",
    paletteAlt: "Text Bubble",
    headerLabel: "Text",
    itemAlt: "Text Bubble",
    placeholder: "Click here to edit",
    htmlType: "text",
  },
  image: {
    category: "bubble",
    icon: image,
    paletteLabel: "Image",
    paletteAlt: "Images Bubble",
    headerLabel: "Image",
    itemAlt: "Images Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  video: {
    category: "bubble",
    icon: video,
    paletteLabel: "Video",
    paletteAlt: "Video Bubble",
    headerLabel: "Video",
    itemAlt: "Video Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  gif: {
    category: "bubble",
    icon: gif,
    paletteLabel: "GIF",
    paletteAlt: "GIF Bubble",
    headerLabel: "GIF",
    itemAlt: "GIF Item",
    placeholder: "Click to add link",
    htmlType: "text",
  },
  textInput: {
    category: "input",
    icon: textInput,
    paletteLabel: "Text",
    paletteAlt: "Text Input",
    headerLabel: "Input Text",
    itemAlt: "Text Input",
    placeholder: "Hint: User will input text on the form",
    htmlType: "text",
  },
  numberInput: {
    category: "input",
    icon: numberInput,
    paletteLabel: "Number",
    paletteAlt: "Number Input",
    headerLabel: "Input Number",
    itemAlt: "Number Input",
    placeholder: "Hint: User will input a number on the form",
    htmlType: "number",
  },
  emailInput: {
    category: "input",
    icon: emailInput,
    paletteLabel: "Email",
    paletteAlt: "Email Input",
    headerLabel: "Input Email",
    itemAlt: "Email Input",
    placeholder: "Hint: User will input an email on the form",
    htmlType: "email",
  },
  phoneInput: {
    category: "input",
    icon: phoneInput,
    paletteLabel: "Phone",
    paletteAlt: "Phone Input",
    headerLabel: "Input Phone",
    itemAlt: "Phone Input",
    placeholder: "Hint: User will input a phone number on the form",
    htmlType: "tel",
  },
  dateInput: {
    category: "input",
    icon: dateInput,
    paletteLabel: "Date",
    paletteAlt: "Date Input",
    headerLabel: "Input Date",
    itemAlt: "Date Input",
    placeholder: "Hint: User will select a date",
    htmlType: "text",
  },
  ratingInput: {
    category: "input",
    icon: ratingInput,
    paletteLabel: "Rating",
    paletteAlt: "Rating Input",
    headerLabel: "Input Rating",
    itemAlt: "Rating Input",
    placeholder: "Hint: User will tap to rate out of 5",
    htmlType: "text",
  },
  buttonInput: {
    category: "input",
    icon: buttonInput,
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

function Flow({ dynamicItems, setDynamicItems, itemCounts, setItemCounts }) {
  const handleAddItem = (type) => {
    const config = ITEM_TYPES[type];
    const newId = itemCounts[type] + 1;
    const newItem = {
      id: `${type}-${newId}`,
      type,
      src: config.icon,
      placeholder: config.placeholder,
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
                <img src={config.icon} alt={config.paletteAlt} />
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
                <img src={config.icon} alt={config.paletteAlt} />
                {config.paletteLabel}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flowchart-container">
        <div className="start-header">
          <img src={start} alt="start" />
          Start
        </div>
        {dynamicItems.map((item) => {
          const config = ITEM_TYPES[item.type];

          return (
            <div className="text-item" key={item.id}>
              <img
                src={deleteLogo}
                alt="delete"
                id="deleteId"
                onClick={() => handleDeleteItem(item.id)}
              />
              <div className="item-header">
                {config
                  ? `${config.headerLabel} ${item.id.split("-")[1]}`
                  : "Unknown"}
              </div>

              <div className="item-data">
                {config ? (
                  <>
                    <img src={item.src} alt={config.itemAlt} />
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
