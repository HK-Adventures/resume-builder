'use client';

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
  const { activeStep, setActiveStep } = useResumeStore();

  return (
    <nav aria-label="Progress" className="px-4 sm:px-6 py-4">
      {/* Desktop view */}
      <ol className="hidden sm:flex items-center justify-center space-x-8">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <li key={step.id} className="relative">
              <button
                onClick={() => setActiveStep(step.id)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <span 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${isActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <span className={`text-xl ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      {step.icon}
                    </span>
                  )}
                </span>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive 
                      ? 'text-blue-500' 
                      : isCompleted 
                        ? 'text-green-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </button>
              {step.id !== steps.length - 1 && (
                <div 
                  className={`hidden sm:block absolute left-full top-5 -translate-y-1/2 w-16 h-0.5 
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`p-2 rounded-full ${
              activeStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Step {activeStep + 1} of {steps.length}
          </span>
          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className={`p-2 rounded-full ${
              activeStep === steps.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            Next
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">{steps[activeStep].icon}</span>
            <span className="font-medium text-gray-900">{steps[activeStep].name}</span>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}