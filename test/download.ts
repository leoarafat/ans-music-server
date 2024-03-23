// import React, { useState } from 'react';

// const AudioPlayer = ({ audioSrc }) => {
//   const [audioSource, setAudioSource] = useState(audioSrc);

//   const handleDownload = () => {
//     const fileName = audioSource.split('/').pop(); // Extracting filename from the URL

//     // Creating a temporary anchor element to trigger download
//     const downloadLink = document.createElement('a');
//     downloadLink.href = audioSource;
//     downloadLink.download = fileName;

//     // Appending the anchor element to the body and triggering the click event
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink); // Removing the anchor element after download
//   };

//   return (
//     <div>
//       <audio controls>
//         <source src={audioSource} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//       <button onClick={handleDownload}>Download Audio</button>
//     </div>
//   );
// };

// export default AudioPlayer;
