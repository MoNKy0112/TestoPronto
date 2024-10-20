import React, { useState } from 'react';
import { createTemplate } from "../types/types.tsx";
import "@assets/stylesheets/AddTemplateForm.css";

interface AddTemplateFormProps {
  onAdd: (template: createTemplate, category: string) => void;
  onCancel: () => void;
  categories: string[];
}

const AddTemplateForm: React.FC<AddTemplateFormProps> = ({ onAdd, onCancel, categories }) => {
  const [category, setCategory] = useState(categories[0])
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, text }, category);
    setTitle('');
    setText('');
    setCategory(categories[0])
  };

  return (
    <div className="add-overlay">
      <form onSubmit={handleSubmit} className="add-window">
        <h2>Add New Template</h2>
        <select onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((category) =>
            <option value={category}>{category}</option>
          )}
        </select>
        <input
          type="text"
          placeholder="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={64}
          className="input-field"
        />
        <textarea
          placeholder="Template Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="textarea-field"
        />
        <div className="button-group">
          <button type="submit" className="button submit-button">Add Template</button>
          <button type="button" onClick={onCancel} className="button cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTemplateForm;
