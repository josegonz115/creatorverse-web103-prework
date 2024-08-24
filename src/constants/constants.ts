export const DEFAULT_IMAGE_URL = 'https://cdn.discordapp.com/embed/avatars/0.png';
export const DEFAULT_IMAGE_URL2 = 'https://cdn.discordapp.com/embed/avatars/1.png';
export const DEFAULT_IMAGE_URL3 = 'https://cdn.discordapp.com/embed/avatars/2.png';
export const DEFAULT_IMAGE_URL4 = 'https://cdn.discordapp.com/embed/avatars/3.png';
export const DEFAULT_IMAGE_URL5 = 'https://cdn.discordapp.com/embed/avatars/4.png';
const DEFAULT_IMAGE_URLS = [
    DEFAULT_IMAGE_URL,
    DEFAULT_IMAGE_URL2,
    DEFAULT_IMAGE_URL3,
    DEFAULT_IMAGE_URL4,
    DEFAULT_IMAGE_URL5,
];
export const getRandomImageUrl = (): string => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGE_URLS.length);
    return DEFAULT_IMAGE_URLS[randomIndex];
};