"use strict";
// import React, { useState } from 'react';
// const UploadForm = () => {
//   const [formData, setFormData] = useState({
//     audioFiles: [],
//     titles: [],
//     artists: [],
//   });
//   const handleInputChange = (index, field, value) => {
//     setFormData((prevData) => {
//       const newData = { ...prevData };
//       newData[field][index] = value;
//       return newData;
//     });
//   };
//   const handleFileChange = (index, file) => {
//     setFormData((prevData) => {
//       const newData = { ...prevData };
//       newData.audioFiles[index] = file;
//       return newData;
//     });
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = new FormData();
//     formData.audioFiles.forEach((file, index) => {
//       form.append(`audio${index + 1}`, file);
//       form.append(`title${index + 1}`, formData.titles[index]);
//       form.append(`artist${index + 1}`, formData.artists[index]);
//     });
//     try {
//       const response = await fetch('/api/upload-multiple', {
//         method: 'POST',
//         body: form,
//       });
//       if (!response.ok) {
//         // Handle error
//         console.error('Upload failed:', response.statusText);
//         return;
//       }
//       const result = await response.json();
//       console.log('Upload successful:', result);
//     } catch (error) {
//       console.error('Error during upload:', error.message);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       {formData.audioFiles.map((_, index) => (
//         <div key={index}>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => handleFileChange(index, e.target.files[0])}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Title"
//             onChange={(e) => handleInputChange(index, 'titles', e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Artist"
//             onChange={(e) => handleInputChange(index, 'artists', e.target.value)}
//             required
//           />
//         </div>
//       ))}
//       <button type="button" onClick={() => setFormData((prevData) => ({ ...prevData, audioFiles: [...prevData.audioFiles, null], titles: [...prevData.titles, ''], artists: [...prevData.artists, ''] }))}>
//         Add More
//       </button>
//       <button type="submit">Upload</button>
//     </form>
//   );
// };
// export default UploadForm;
