import React, { useState } from 'react';
import TemplateList from '@components/TemplateList';
import AddTemplateForm from '@components/AddTemplateForm';
import { template } from "../types/types.tsx";
import '@assets/stylesheets/TemplateManager.css';
import AddCategoryForm from "../components/AddCategoryForm.tsx";

const TemplateManager: React.FC = () => {
  const [categories, setCategories] = useState<{ [key: string]: template[] }>({
    'Category 1': [{ title: "template 1", text: "texto plantilla 1" }],
    'Category 2': [{ title: "template 2", text: "texto plantilla 2" }]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const handleAddTemplate = (newTemplate: template,category:string) => {
    setCategories({
      ...categories,
      [category]: [...categories[category], newTemplate]
    });
    //TODO modify in backend file to maintain persistence
    setIsAdding(false);
  };

  const handleAddCategory = (newCategory:string) => {
    if(newCategory==='' || categories[newCategory]) {
      //TODO show error
    }
    setCategories({
      ...categories,
      [newCategory]: []
    });
    setIsAddingCategory(false);
  }

  const handleCancelAddCategory=()=>{
    setIsAddingCategory(false);
  }

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  return (
    <div className="template-manager">
      <div className="button-group">
        <button onClick={() => setIsEditing(!isEditing)} className={`edit-button ${isEditing ? 'editing' : ''}`}>
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
        <button onClick={() => setIsAdding(true)} className="add-button">
          Add Template
        </button>
      </div>
      {isAdding &&
          <AddTemplateForm onAdd={handleAddTemplate} onCancel={handleCancelAdd} categories={Object.keys(categories)}/>}
      <div className="categories">
        {}
        {Object.keys(categories).map((category) => (
          <div className={"category"}>
            {category}
            <TemplateList templates={categories[category]} isEditing={isEditing}/>
          </div>
        ))}
        {isAddingCategory ?
          <AddCategoryForm addCategory={handleAddCategory}cancelAddCategory={handleCancelAddCategory}></AddCategoryForm> :
          <button onClick={() => setIsAddingCategory(true)} className="add-category-button">Add Category</button>}
      </div>

    </div>
  );
};

export default TemplateManager;
