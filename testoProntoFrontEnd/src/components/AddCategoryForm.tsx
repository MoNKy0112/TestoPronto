import  "@assets/stylesheets/AddCategoryForm.css"
import React, {useState} from "react";

interface AddCategoryFormProps {
  addCategory:(categoryName:string)=>void;
  cancelAddCategory: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({cancelAddCategory,addCategory})=> {
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory(categoryName)
    setCategoryName('')
  };

  return(
    <div>
      <form onSubmit={handleSubmit} className={'add-category-form'}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          className="add-cat-input"
          onChange={(e)=>setCategoryName(e.target.value)}
          required
        />
        <button
          type={"submit"}
          className={"add-btn"}
        >Add</button>
        <button
          type="button"
          className="close-btn"
          onClick={cancelAddCategory}
        >close</button>
      </form>
    </div>

  )
}

export default AddCategoryForm;
