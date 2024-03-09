import { useEffect, useRef } from 'react';

const useCloudinaryUpload = (onSuccess) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dkdpaugkn',
          uploadPreset: 'Navana',
        },
        function (error, result) {
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.secure_url;
            onSuccess(imageUrl);
          }
        }
      );
    } else {
      console.error('Cloudinary library or createUploadWidget method is not available');
    }
  }, [onSuccess]); // Dependency array
  
  

  const openWidget = () => {
    widgetRef.current.open();
  };

  return { openWidget };
};

export default useCloudinaryUpload;
