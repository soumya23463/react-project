import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TextForm({ heading }) {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => setDarkMode(!darkMode);

  const handleUpClick = () => setText(text.toUpperCase());
  const handleDownClick = () => setText(text.toLowerCase());
  const handleRemoveSpaces = (e) => {
  e.preventDefault();
  const newText = text.replace(/\s+/g, ' ').trim();
  setText(newText);
  toast.info(" Extra spaces removed!");
};
  const handleClearClick = () => {
    setText('');
    toast.info('Text cleared!');
  };
  const handleCapitalize = () => {
    setText(
      text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    );
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied!');
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
 const minutesToRead = (0.008 * wordCount).toFixed(2) + ' min';


  const theme = darkMode
    ? {
        backgroundColor: '#121212',
        color: '#f1f1f1',
        textareaBg: '#1e1e1e',
        borderColor: '#444',
      }
    : {
        backgroundColor: '#ffffff',
        color: '#000000',
        textareaBg: '#ffffff',
        borderColor: '#ccc',
      };

      const handleSpeak = (e) => {
        e.preventDefault();
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        toast.info("Speaking...");
    };


  return (
    <div style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh', padding: '2rem' }}>
      <div className="d-flex justify-content-between mb-4">
        <h2>{heading}</h2>
        <button className="btn btn-sm btn-outline-secondary" onClick={toggleMode}>
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>

      <textarea
        className="form-control mb-3"
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text..."
        style={{
          backgroundColor: theme.textareaBg,
          color: theme.color,
          borderColor: theme.borderColor,
          borderRadius: '8px',
        }}
      />

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className="btn btn-success" onClick={handleUpClick}> Uppercase</button>
        <button className="btn btn-warning text-white" onClick={handleDownClick}>Lowercase</button>
        <button className="btn btn-info text-white" onClick={handleCapitalize}>Capitalize</button>
        <button className="btn btn-danger" onClick={handleClearClick}> Clear</button>
        <button className="btn btn-dark" onClick={handleCopy}>Copy</button>
        <button className="btn btn-secondary" onClick={handleRemoveSpaces}>Remove Extra Spaces</button>
        <button className="btn btn-secondary" onClick={handleSpeak}>Speak Text</button>

      </div>

      <p className="text-muted">
        <strong>{wordCount}</strong> words | <strong>{charCount}</strong> characters <strong>{minutesToRead}</strong> min read
      </p>

      <h5>Preview:</h5>
      <div
        className="p-3 rounded"
        style={{
          backgroundColor: darkMode ? '#1e1e1e' : '#f8f9fa',
          minHeight: '100px',
        }}
      >
        {text ? text : <span className="text-muted">Nothing to preview...</span>}
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
}
