import "@assets/stylesheets/TemplateList.css"

import React, { useState } from 'react';
import TemplateButton from '@components/TemplateButton';
import TemplateEditor from '@components/TemplateEditor';
import {template} from "../types/types.tsx";

interface TemplateListProps {
  templates: template[];
  isEditing: boolean;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates, isEditing }) => {
  // const [templates, setTemplates] = useState<template[]>([{title:"template 1",text:"texto plantilla 1"},{title:"template 2",text:"texto plantilla 2"}]);
  // const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  // const [isAdding, setIsAdding] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = (newText: string) => {
    if (editingIndex !== null) {
      templates[editingIndex].text = newText;
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className={"category"}>
      {templates.map((template, index) => (
        <div key={index}>
          <TemplateButton
            text={template.title}
            onClick={isEditing ? () => handleEdit(index) : () => handleCopy(template.text)}
            className={`button ${isEditing ? 'editing' : ''}`}
          />
          {isEditing && editingIndex === index ? <TemplateEditor text={template.text} onSave={handleSave} onCancel={handleCancel}/>:null}
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
