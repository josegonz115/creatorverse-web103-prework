// an AddCreator page to allow the user to add a new content creator
import '../styles/AddCreator.css';
import supabase from '../supabase/client';
import { useState } from 'react';
import { TablesInsert } from '../supabase/database.types';
import { useNavigate } from 'react-router-dom';
import CreatorForm from '../components/CreatorForm';
import { validateCreatorData } from '../utils/checkBrokenImage';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TablesInsert<"creators">>({
    name: '',
    url: '',
    description: '',
    imageURL: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, url, description } = formData;
    const { imageURL: validateImageURL, error: validateError } = await validateCreatorData(formData);
    if(validateError) {
      throw new Error(validateError);
    }
    const creatorRow = { name, url, description, imageURL: validateImageURL };
    const { error } = await supabase
      .from('creators')
      .insert(creatorRow);
    if (error) {
      console.error('Error adding creator:', error);
      return;
    }
    //add a Toast ?
    navigate('/'); 
  };

  return (
    <div className='add-creator-page'>
      <h1 className='add-creator-page-title'>AddCreator Form</h1>
      <CreatorForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        mode="insert"
      />
    </div>
  )
}

export default AddCreator;
