'use client';

import React from 'react';

export default function Page() {
  const [showPreview, setShowPreview] = React.useState(false);
  const { activeStep } = useResumeStore();

  // ... rest of your App component code ...
}