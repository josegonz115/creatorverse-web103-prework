import '../styles/CreatorForm.css';
import { useNavigate } from "react-router-dom";
import { TablesInsert, TablesUpdate } from "../supabase/database.types";

type CreatorFormData<T extends "insert" | "update"> = T extends "insert"
    ? TablesInsert<"creators">
    : TablesUpdate<"creators">;
type CreatorFormDataDispatch<T extends "insert" | "update"> = React.Dispatch<
    React.SetStateAction<CreatorFormData<T>>
>;
type CreatorFormProps<T extends "insert" | "update"> = {
    formData: CreatorFormData<T>;
    setFormData: CreatorFormDataDispatch<T>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    mode: T;
    className?: string;
};
const CreatorForm = <T extends "insert" | "update">({
    formData,
    setFormData,
    handleSubmit,
    mode,
    className,
}: CreatorFormProps<T>) => {
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmission = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleSubmit(e);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

    return (
        <form method="post" onSubmit={handleSubmission} className={className}>
            <fieldset>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    autoComplete="given-name"
                    required
                />
                <hr />
                <label htmlFor="url">URL:</label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="URL"
                    autoComplete="url"
                />
                <hr />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    autoComplete="description"
                />
                <hr />
                <label htmlFor="imageURL">Image URL:</label>
                <input
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    value={formData.imageURL || ""}
                    onChange={handleChange}
                    placeholder="Image URL"
                    autoComplete="imageURL"
                />
                <hr />
                <input
                    type="submit"
                    value={mode === "insert" ? "Create" : "Update"}
                />
            </fieldset>
            {/* <input type="submit" value="Submit" /> */}

        </form>
    );
};

export default CreatorForm;
