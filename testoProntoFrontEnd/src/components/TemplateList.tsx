import "@assets/stylesheets/TemplateList.css"

import React, { useState } from 'react';
import TemplateButton from '@components/TemplateButton';
import TemplateEditor from '@components/TemplateEditor';
import { template } from "../types/types.tsx";
import { patchRequest } from "../api/api.ts";

interface TemplateListProps {
  templates: template[];
  isEditing: boolean;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates, isEditing }) => {
  // const [isEditing, setIsEditing] = useState(false);
  const [editingId, seteditingId] = useState<string | null>(null);
  // const [isAdding, setIsAdding] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = (id: string) => {
    seteditingId(id);
  };



  const handleSave = (newText: string) => {
    const fetchTextChange = async (id: string, newText: string) => {
      try {
        const response = await patchRequest(`template/${id}`, { text: newText });
        console.log(response);
      } catch (error) {
        console.error('Error posting data:', error);
        return;
      }
    };
    if (editingId !== null) {
      templates.find((template) => template._id === editingId)!.text = newText;
      fetchTextChange(editingId, newText);
      seteditingId(null);
    }
  };

  const handleCancel = () => {
    seteditingId(null);
  };

  return (
    <>
      {templates.map((template) => (
        <div key={template._id}>
          <TemplateButton
            title={template.title}
            text={template.text}
            onClick={isEditing ? () => handleEdit(template._id) : () => handleCopy(template.text)}
            className={`button ${isEditing ? 'editing' : ''}`}
          />
          {isEditing && editingId === template._id ? <TemplateEditor text={template.text} onSave={handleSave} onCancel={handleCancel} /> : null}
        </div>
      ))}
    </>
  );
};

export default TemplateList;
