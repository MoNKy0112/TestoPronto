import React, { useEffect, useState } from 'react';
import TemplateList from '@components/TemplateList';
import AddTemplateForm from '@components/AddTemplateForm';
import { category, createTemplate, template } from "../types/types.tsx";
import '@assets/stylesheets/TemplateManager.css';
import AddCategoryForm from "../components/AddCategoryForm.tsx";
import { getRequest, patchRequest, postRequest } from '../api/api.ts';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext.tsx';

const TemplateManager: React.FC = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState<category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddTemplate = async (newTemplate: createTemplate, categoryName: string) => {
    try {
      const categoryId = categories.find(category => category.name === categoryName)?._id;
      if (!categoryId) {
        console.error('Error adding template:', newTemplate, categoryName);
        toast.error('No fue posible crear la plantilla. Inténtalo de nuevo.');
        return;
      }
      const response = await postRequest('template', {
        ...newTemplate,
        categoryId: categoryId,
        userId: '66db7a92da7aa24ef4b921aa'
      });
      const createdTemplate: template = { ...newTemplate, _id: response._id };
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category._id === categoryId
            ? { ...category, templates: [...category.templates, createdTemplate] }
            : category
        )
      );

      setIsAdding(false);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleAddCategory = async (newCategoryName: string) => {
    if (newCategoryName === '' || categories.some(category => category.name === newCategoryName)) {
      console.log('Error adding category:', newCategoryName);
      toast.error('El nombre de la categoría no puede estar vacío o ya existe.');
      return;
    }

    try {
      const response = await postRequest('category', { 'name': newCategoryName });
      console.log(response);
      //TODO: Add posibility to encrypt the id in backend
      setCategories(prevCategories => [...prevCategories, { _id: response._id, name: newCategoryName, templates: [] }]);
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('No fue posible crear la categoría. Inténtalo de nuevo.');
      return;
    }
  }

  const handleCancelAddCategory = () => {
    setIsAddingCategory(false);
  }

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleChangeCategoryName = (categoryId: string, newCategoryName: string) => {
    try {
      const response = patchRequest(`category/${categoryId}`, { 'name': newCategoryName });
      console.log(response);
      setCategories(prevCategories => prevCategories.map(category => category._id === categoryId ? { ...category, name: newCategoryName } : category));
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('No fue posible cambiar el nombre de la categoría. Inténtalo de nuevo.');
      return;
    }
  }

  const getCategories = async () => {
    try {
      const response = await getRequest('category/user');
      console.log("cat:", response)
      const newCategories = response.map((category: category) => ({ ...category, templates: [] }));
      console.log("newCat:", newCategories)
      setCategories(newCategories);
      return newCategories;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  };

  const getTemplates = async (categories: category[]) => {
    try {
      const response = await getRequest('template/categorized');
      setTemplates(response, categories);
      // console.log(response);
    } catch (error) {
      console.error('Error getting templates:', error);
      return;
    }
  }

  const setTemplates = (response: Record<string, template[]>, categories: category[]) => {
    const newCategories = [...categories];
    console.log(...categories)
    newCategories.map(category => {
      console.log(category.name)
      response[category._id] !== undefined ? category.templates = response[category._id] : null;
    });
    setCategories(newCategories);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const categories = await getCategories();
        await getTemplates(categories);
      } else {
        setCategories([]);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="template-manager">
      <div className="button-group">
        <button onClick={() => setIsEditing(!isEditing)} className={`edit-button ${isEditing ? 'editing' : ''}`}>
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
        <button onClick={() => setIsAdding(true)} className="add-button">
          Add Template
        </button>
        <button onClick={() => setIsAddingCategory(true)} className="add-category-button">
          Add Category
        </button>
      </div>
      {isAdding &&
        <AddTemplateForm onAdd={handleAddTemplate} onCancel={handleCancelAdd} categories={categories.map(cat => cat.name)} />}
      {isAddingCategory &&
        <AddCategoryForm addCategory={handleAddCategory} cancelAddCategory={handleCancelAddCategory} />}
      <div className="categories">
        { }
        {categories.map((category) => (
          <div className={"category"} key={category._id}>
            <div className='category-title'>
              {isEditing ?
                <input
                  defaultValue={category.name}
                  type="text"
                  placeholder='Nombre Categroía'
                  className="category-checkbox"
                  onBlur={e => handleChangeCategoryName(category._id, e.target.value)}
                />
                : <>
                  {category.name}
                </>
              }
            </div>
            <TemplateList templates={category.templates} isEditing={isEditing} />
          </div>
        ))}

      </div>

    </div>
  );
};

export default TemplateManager;
