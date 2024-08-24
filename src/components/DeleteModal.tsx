// Step 9: Deleting a Content Creator
// Someone might think a content creator isn't really 💫 Creatorverse-worthy...so let's give them the power to delete them! In this step, you'll need to make a request to the database to delete a given content creator from the database and home page.
import '../styles/DeleteModal.css';
import { FC, useState } from "react";
import { Tables } from "../supabase/database.types";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { getRandomImageUrl } from "../constants/constants";
import { GoAlertFill } from "react-icons/go";


// Edit the page you created for updating a content creator by:

// Adding a delete button
// Writing an asynchronous function to delete a content creator from the database
// Calling the function on the delete button

type DeleteModalProps = {
    creator: Tables<"creators">;
};

const DeleteModal:FC<DeleteModalProps> = ({ creator }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);

    const handleDeleteCreator = async () => {
        const response = await supabase
            .from('creators')
            .delete()
            .eq('id', creator.id);
        if (response.error){
            console.error(response.error);
        }else{
            onClose();
            navigate('/');
        }
    }

    return (
        <>
            <button onClick={onOpen} className='delete-button'>Delete Creator</button>
            <dialog open={open} className='delete-modal'>
            <article className='delete-modal-content'>
                <h2>Delete User</h2>
                <div className='delete-modal-description-container'>
                    <GoAlertFill className='delete-icon'/>
                    <p>
                    Are you sure you want to delete {creator.name}'s account?
                    <br /><br /><b>This action cannot be undone.</b>
                    </p>
                    <GoAlertFill className='delete-icon'/>
                </div>
                <ul>
                <img src={creator.imageURL ?? getRandomImageUrl()} alt={creator.id + '-image-delete'} />
                </ul>
                <footer>
                <div className='delete-modal-buttons'>
                    <button className="secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="primary" onClick={handleDeleteCreator}>Delete</button>
                </div>

                </footer>
            </article>
            </dialog>
        </>
    );
};

export default DeleteModal;
