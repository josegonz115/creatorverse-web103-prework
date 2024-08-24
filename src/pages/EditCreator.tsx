// an EditCreator page to allow the user to update a content creator's information
import "../styles/EditCreator.css";
import { useEffect, useState } from "react";
import { TablesUpdate } from "../supabase/database.types";
import CreatorForm from "../components/CreatorForm";
import { useCreator } from "../hooks/useCreator";
import supabase from "../supabase/client";
import { Link } from "react-router-dom";
import { validateCreatorData } from "../utils/checkBrokenImage";

const EditCreator = () => {
  const [creator, setCreator] = useCreator();
  const [formData, setFormData] = useState<TablesUpdate<"creators">>(creator);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, url, description } = formData;
    const { imageURL: validateImageURL, error: validateError } = await validateCreatorData(formData);
    if(validateError) {
      throw new Error(validateError);
    }
    const creatorRow = { name, url, description, imageURL: validateImageURL };
    const { data, error } = await supabase
      .from('creators')
      .update(creatorRow)
      .eq('id', creator.id)
      .select();
    if (error) {
      console.error('Error updating creator:', error);
      return;
    }
    console.log('Creator updated:', data);
    //add a Toast ?
    setCreator(data[0]);
  };

  useEffect(() => {
    if (creator) {
      setFormData(creator);
    }
  }, [creator]);


  if (!creator) {
    return <progress />;
  }

    return (
        <dialog open>
            <article className="article">
                <header>
                  <Link to={`/creator/${creator.id}`} ><button aria-label="Close" rel="prev" className="close debug"></button></Link>
                    <h1>
                        <strong>📝 Edit Creator</strong>
                    </h1>
                </header>
                <CreatorForm
                  formData={formData}
                  setFormData={setFormData}
                  // handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  mode="update"
                  className='editCreatorForm'
                />
            </article>
        </dialog>
    );
};

export default EditCreator;
