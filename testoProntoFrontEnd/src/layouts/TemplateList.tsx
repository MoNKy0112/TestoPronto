import React, { useState } from 'react';
import TemplateButton from '@components/TemplateButton';
import TemplateEditor from '@components/TemplateEditor';

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<string[]>(['Template 1', 'Template 2']);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleSave = (newText: string) => {
    if (editingIndex !== null) {
      const newTemplates = [...templates];
      newTemplates[editingIndex] = newText;
      setTemplates(newTemplates);
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <div>
      {templates.map((template, index) => (
        <div key={index}>
          {isEditing && editingIndex === index ? (
            <TemplateEditor text={template} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <TemplateButton text={template} onClick={() => handleCopy(template)} />
            )}
          {!isEditing && <button onClick={() => handleEdit(index)}>Edit</button>}
        </div>
      ))}
  </div>
);
};

  export default TemplateList;
