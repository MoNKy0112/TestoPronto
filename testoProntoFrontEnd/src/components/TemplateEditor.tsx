import "@assets/stylesheets/TemplateEditor.css"
import React, { useState, useEffect } from 'react';

interface TemplateEditorProps {
  text: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ text, onSave, onCancel }) => {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  return (
    <div className="editor-overlay">
      <div className="editor-window">
        <textarea value={value} onChange={(e) => setValue(e.target.value)}/>
        <button onClick={() => onSave(value)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TemplateEditor;
