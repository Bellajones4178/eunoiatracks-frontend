// import React, { useState, useEffect } from 'react';

// function Upload() {
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState('');
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     const fetchFiles = async () => {
//         const response = await fetch('${process.env.REACT_APP_API_URL}/files');
//         const data = await response.json();
//         setFiles(data);
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setMessage("Please select a file first");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('${process.env.REACT_APP_API_URL}/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 fetchFiles(); // Refresh file list
//                 setMessage(result.message);
//             } else {
//                 setMessage(result.error || 'Upload failed');
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setMessage('Error uploading file');
//         }
//     };

//     return (
//         <div>
//             <h3>Uploaded Files</h3>
//             <ul>
//                 {files.map((filename, index) => (
//                     <li key={index}>
//                         <a href={`${process.env.REACT_APP_API_URL}/uploads/${filename}`} target="_blank" rel="noopener noreferrer">
//                             {filename}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" onChange={handleFileChange} />
//                 <button type="submit">Upload</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// }

// export default Upload;