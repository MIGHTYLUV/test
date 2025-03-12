import React, { useState } from 'react';
import { useQuery, useAction, getUserUploads, uploadContent } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: uploads, isLoading, error } = useQuery(getUserUploads);
  const uploadContentFn = useAction(uploadContent);
  const [fileUrl, setFileUrl] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpload = () => {
    uploadContentFn({ fileUrl });
    setFileUrl('');
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Enter file URL'
          className='px-3 py-2 border rounded text-lg w-full'
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <button
          onClick={handleUpload}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Upload
        </button>
      </div>
      <div className='mt-6'>
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className='bg-white p-4 mb-4 rounded-lg shadow-md'
          >
            <a href={upload.fileUrl} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
              {upload.fileUrl}
            </a>
          </div>
        ))}
      </div>
      <div className='mt-6'>
        <Link to="/" className='text-blue-500 hover:underline'>Go to Home</Link>
      </div>
    </div>
  );
}

export default DashboardPage;
