import { useEffect, useRef, useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { WhatsappIcon } from "../HomePage/BrandIcons";
import "../../style/Shared/ShareMenu.css";

function ShareMenu({ link, variant = "button", label = "Share" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setIsOpen(false);
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(link)}`;

  return (
    <div className="share-menu" ref={menuRef}>
      <button
        type="button"
        className={variant === "icon" ? "share-trigger-icon" : "share-trigger-btn"}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Share"
        aria-expanded={isOpen}
      >
        <Share2 size={variant === "icon" ? 16 : 15} />
        {variant === "button" && label}
      </button>

      {isOpen && (
        <div className="share-dropdown">
          <button type="button" onClick={handleCopyLink}>
            <Link2 size={16} />
            Copy link
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
          >
            <WhatsappIcon size={16} />
            Share via WhatsApp
          </a>
        </div>
      )}

      {copied && (
        <div className="share-toast">
          <Check size={14} />
          Link copied!
        </div>
      )}
    </div>
  );
}

export default ShareMenu;
