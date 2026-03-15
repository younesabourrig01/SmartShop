import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const Password: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //Use a ref to prevent double-fetching in Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't already
    if (hasFetched.current) return;

    const getPassword = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/generated-password",
        );

        setPassword(res.data.password);
        setIsVisible(true);
        // Mark as fetched so the second run of Strict Mode is ignored
        hasFetched.current = true;
      } catch (error) {
        console.error(error);
        toast.error("Error generating password");
      } finally {
        setLoading(false);
      }
    };

    getPassword();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setPassword("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied!");
    } catch {
      toast.error("Failed to copy password");
    }
  };

  return (
    <>
      <style>{`
        .popup-container {
          position: fixed;
          bottom: 20px;
          /* 3. Use the state to move the popup in/out of view */
          left: ${isVisible ? "20px" : "-400px"};
          width: 300px;
          background: white;
          box-shadow: 0px 10px 30px rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.5s ease-in-out;
          z-index: 1000;
          border: 1px solid #eee;
          /* Keep it in DOM but hidden if not visible */
          opacity: ${isVisible ? "1" : "0"};
          pointer-events: ${isVisible ? "all" : "none"};
        }
        /* ... rest of your styles ... */
        .password-display {
          background: #f4f4f9;
          padding: 10px;
          border-radius: 6px;
          font-family: monospace;
          word-break: break-all;
          margin-bottom: 15px;
          color: #555;
          min-height: 20px;
        }
        .btn-group { display: flex; gap: 8px; }
        .copy-btn { background: #2ed573; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; flex: 1; }
        .close-btn { background: #ff4757; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; flex: 1; }
      `}</style>

      <div className="popup-container">
        <div className="popup-content">
          <h3>Suggested password for you</h3>
          <div className="password-display">
            {loading ? "Generating..." : password}
          </div>
          <div className="btn-group">
            <button className="copy-btn" onClick={handleCopy}>
              Copy
            </button>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
