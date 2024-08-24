import { useOutletContext } from "react-router-dom";
import { Tables } from "../supabase/database.types";

type CreatorContextType = [
    Tables<"creators">,
    React.Dispatch<React.SetStateAction<Tables<"creators">>>
];

export const useCreator = () => {
    return useOutletContext<CreatorContextType>();
};
