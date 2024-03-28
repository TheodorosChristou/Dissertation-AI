import React, { useState } from 'react';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const [imagePath, setImagePath] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');

  // Function to resize and convert image to CIFAR-100 format
  const convertToCIFAR100Format = (inputPath: string): string => {
    // Create a new image object
    const image = new Image();

    // Set up a load event listener
    image.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Resize the image to 32x32 pixels
      canvas.width = 32;
      canvas.height = 32;
      ctx.imageSmoothingEnabled = false; // Disable image smoothing
      ctx.drawImage(image, 0, 0, 32, 32);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, 32, 32);
      
      // CIFAR-100 Style Preprocessing (you may need to adjust based on your model requirements)
      const normalizedData = normalizeCIFAR100(imageData);

      // Update the processed image state
      setProcessedImage(normalizedData);
    };

    // Load the image
    image.src = inputPath;

    return '';
  };

  // Function to normalize the image data (you may need to adjust this function)
  const normalizeCIFAR100 = (imageData: ImageData): string => {
    const { data } = imageData;
    // Perform normalization here, e.g., subtract mean, divide by standard deviation, etc.
    // This step depends on your model requirements and how the CIFAR-100 dataset was preprocessed.
    // You should also ensure that the output format matches what your model expects.

    // For simplicity, let's just convert the ImageData to base64 for display purposes
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  };

  const handleImageProcessing = () => {
    // Assuming you have a function to preprocess the image
    convertToCIFAR100Format(imagePath);
  };

  const handleImageChange = () => {
    // Set the imagePath to the local path of the image inside public/images folder
    const imagePath = '/img/dog.PNG'; // Replace 'your_image_filename.jpg' with your actual image file name
    setImagePath(imagePath);
  };

  return (
    <div className="">
      <h1>Image Preprocessing</h1>
      <button onClick={handleImageChange}>Load Local Image</button>
      <button onClick={handleImageProcessing} disabled={!imagePath}>
        Process Image
      </button>
      {processedImage && (
        <div>
          <h2>Processed Image</h2>
          {/* Set width and height to display the image bigger */}
          <img
            src={processedImage}
            alt="Processed"
            style={{ width: '32px', height: '32px'}}
          />
        </div>
      )}
    </div>
  );
};

export default IndexPage;