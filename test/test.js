"use strict";
// 'use client';
// import React, { useState } from 'react';
// const UploadForm = () => {
//   const [formData, setFormData] = useState({
//     audioFiles: [],
//     titles: [],
//     artists: [],
//     composer: '',
//     director: '',
//     image: null,
//     actor: '', // Adding actor field
//   });
//   console.log(formData, 'formData');
//   const handleInputChange = (index, field, value) => {
//     setFormData(prevData => {
//       const newData = { ...prevData };
//       newData[field][index] = value;
//       return newData;
//     });
//   };
//   const handleFileChange = (index, e) => {
//     const file = e.target.files[0];
//     // console.log(file, "file");
//     setFormData(prevData => {
//       const newData = { ...prevData };
//       newData.audioFiles[index] = file || null;
//       //   console.log(newData, "newData");
//       return newData;
//     });
//   };
//   const handleImageChange = e => {
//     const file = e.target.files[0];
//     setFormData(prevData => ({
//       ...prevData,
//       image: file || null,
//     }));
//   };
//   const handleSubmit = async event => {
//     event.preventDefault();
//     const form = new FormData();
//     formData.audioFiles.forEach((file, index) => {
//       console.log(file, '37');
//       form.append(`audio`, file);
//       form.append(`title`, formData.titles[index]);
//       form.append(`artist`, formData.artists[index]);
//     });
//     const othersFieldData = {
//       composer: formData.composer,
//       director: formData.director,
//       image: formData.image,
//       actor: formData.actor,
//     };
//     form.append('data', JSON.stringify(othersFieldData));
//     console.log(form, 'Form');
//     try {
//       const response = await fetch('http://localhost:5000/api/album/upload', {
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
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-8 p-4 border rounded-md"
//     >
//       {formData.audioFiles.map((_, index) => (
//         <div key={index} className="mb-4">
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={e => handleFileChange(index, e)}
//             required
//             className="mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Title"
//             value={formData.titles[index]}
//             onChange={e => handleInputChange(index, 'titles', e.target.value)}
//             required
//             className="w-full px-3 py-2 border text-black rounded-md"
//           />
//           <input
//             type="text"
//             placeholder="Artist"
//             value={formData.artists[index]}
//             onChange={e => handleInputChange(index, 'artists', e.target.value)}
//             required
//             className="w-full px-3 py-2 mt-2 text-black border rounded-md"
//           />
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() =>
//           setFormData(prevData => ({
//             ...prevData,
//             audioFiles: [...prevData.audioFiles, null],
//             titles: [...prevData.titles, ''],
//             artists: [...prevData.artists, ''],
//           }))
//         }
//         className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//       >
//         Add More
//       </button>
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded-md"
//       >
//         Upload
//       </button>
//       <input type="file" name="image" placeholder="Image" />
//       <input
//         type="text"
//         placeholder="Composer"
//         required
//         className="w-full px-3 py-2 mt-2 text-black border rounded-md"
//       />
//       <input
//         type="text"
//         placeholder="Director"
//         required
//         className="w-full px-3 py-2 mt-2 text-black border rounded-md"
//       />
//       <input
//         type="text"
//         placeholder="Actor"
//         required
//         className="w-full px-3 py-2 mt-2 text-black border rounded-md"
//       />
//     </form>
//   );
// };
// export default UploadForm;
