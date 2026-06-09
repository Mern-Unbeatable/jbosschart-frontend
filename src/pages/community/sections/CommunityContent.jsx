import React, { memo } from 'react';

const CommunityContent = memo(() => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <h1 className='text-4xl font-bold mb-8'>Community</h1>
      <div className='flex space-x-8'></div>
    </div>
  );
});

CommunityContent.displayName = 'CommunityContent';

export default CommunityContent;
