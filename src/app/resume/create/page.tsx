'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { PersonalInfo } from '../../components/FormSteps/PersonalInfo';
import { Summary } from '../../components/FormSteps/Summary';
import { WorkExperience } from '../../components/FormSteps/WorkExperience';
import { Education } from '../../components/FormSteps/Education';
import { Skills } from '../../components/FormSteps/Skills';
import { StepIndicator } from '../../components/FormSteps/StepIndicator';
import { ResumePreview } from '../../components/ResumePreview/ResumePreview';
import { useResumeStore } from '../../store/useResumeStore';

export default function CreateResume() {
  const [showPreview, setShowPreview] = React.useState(false);
  const { activeStep } = useResumeStore();

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <Summary />;
      case 2:
        return <WorkExperience />;
      case 3:
        return <Education />;
      case 4:
        return <Skills />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showPreview ? 'Edit Resume' : 'Preview Resume'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {showPreview ? (
            <ResumePreview />
          ) : (
            <>
              <StepIndicator />
              <div className="bg-white shadow rounded-lg p-6">
                {renderStep()}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 