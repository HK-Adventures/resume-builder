'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ResumePreview } from '../../components/ResumePreview/ResumePreview';

export default function SharedResumePage() {
  const params = useParams();
  const username = params.username as string;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto w-full">
        <ResumePreview isSharedView username={username} />
      </div>
    </div>
  );
} 