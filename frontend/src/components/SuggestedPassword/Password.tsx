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
          width: 320px;
          background: white;
          box-shadow: 0px 10px 30px rgba(0,0,0,0.15);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          border: 1px solid #eee;
          /* Keep it in DOM but hidden if not visible */
          opacity: ${isVisible ? "1" : "0"};
          pointer-events: ${isVisible ? "all" : "none"};
          color: #1a1a1a;
        }
        .popup-content h3 {
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
        }
        .password-display {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          word-break: break-all;
          margin-bottom: 20px;
          color: #333;
          min-height: 24px;
          border: 1px solid #e9ecef;
          text-align: center;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }
        .btn-group { display: flex; gap: 12px; }
        .copy-btn { 
          background: #2ecc71; 
          color: white; 
          border: none; 
          padding: 10px 16px; 
          border-radius: 8px; 
          cursor: pointer; 
          flex: 1; 
          font-weight: 600;
          transition: background 0.2s;
        }
        .copy-btn:hover { background: #27ae60; }
        .close-btn { 
          background: #ff4757; 
          color: white; 
          border: none; 
          padding: 10px 16px; 
          border-radius: 8px; 
          cursor: pointer; 
          flex: 1; 
          font-weight: 600;
          transition: background 0.2s;
        }
        .close-btn:hover { background: #ff6b81; }
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
