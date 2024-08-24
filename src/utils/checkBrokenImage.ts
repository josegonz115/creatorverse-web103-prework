import { TablesInsert, TablesUpdate } from "../supabase/database.types";


type TValidateImage = 
    | { imageURL: string | null; error?: undefined }
    | { imageURL: null; error: string };

const isImageURLValid = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

export const validateCreatorData = async (creator: TablesInsert<"creators"> | TablesUpdate<"creators">):Promise<TValidateImage> => {
    if (!creator.name) {
        return { imageURL: null, error: "Creator name is missing" };
    }
    if (!creator.imageURL || creator.imageURL.length === 0) {
        return { imageURL: null, error: undefined };
    }
    const isImageURlValid = await isImageURLValid(creator.imageURL);
    if (!isImageURlValid) {
        return { imageURL: null, error: "Image URL is invalid" };
    }
    return { imageURL: creator.imageURL, error: undefined };
};
