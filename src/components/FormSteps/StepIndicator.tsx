import React from 'react';
import { Check } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

interface Step {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 0, name: 'Personal Info', icon: '👤' },
  { id: 1, name: 'Summary', icon: '📝' },
  { id: 2, name: 'Experience', icon: '💼' },
  { id: 3, name: 'Education', icon: '🎓' },
  { id: 4, name: 'Skills', icon: '🛠️' },
];

export function StepIndicator() {
  const { activeStep, setActiveStep, data } = useResumeStore();

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 0:
        return !!data.personalInfo?.fullName;
      case 1:
        return !!data.summary;
      case 2:
        return data.workExperience && data.workExperience.length > 0;
      case 3:
        return data.education && data.education.length > 0;
      case 4:
        return data.skills && data.skills.length > 0;
      default:
        return false;
    }
  };

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center space-x-8">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative">
            {isStepComplete(step.id) ? (
              <div className="group relative w-24 flex flex-col items-center">
                <span className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <button
                  onClick={() => setActiveStep(step.id)}
                  className="mt-2 text-sm font-medium text-gray-900"
                >
                  {step.name}
                </button>
              </div>
            ) : (
              <div className="group relative w-24 flex flex-col items-center">
                <span
                  className={`h-9 w-9 rounded-full flex items-center justify-center ${
                    activeStep === step.id
                      ? 'border-2 border-blue-600 bg-white'
                      : 'border-2 border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                </span>
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`mt-2 text-sm font-medium ${
                    activeStep === step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </button>
              </div>
            )}

            {stepIdx !== steps.length - 1 && (
              <div className="absolute top-4 -right-12 w-16 h-0.5 bg-gray-200" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}