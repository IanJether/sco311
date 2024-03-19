import imageCompression from 'browser-image-compression';


export const compressImage = async (file) => {
    try {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
        };

        const compressedFile = await imageCompression(file, options);

        return compressedFile;
    } catch (error) {
        alert('Image compression error:');
        return file;
    }
};