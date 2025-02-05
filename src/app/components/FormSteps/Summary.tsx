'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FileText } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

interface SummaryForm {
  summary: string;
}

export function Summary() {
  const { data, setData } = useResumeStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SummaryForm>({
    defaultValues: {
      summary: data.summary || ''
    }
  });

  const summary = watch('summary');
  const characterCount = summary?.length || 0;
  const maxCharacters = 500;

  const onSubmit = (formData: SummaryForm) => {
    setData({ summary: formData.summary });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
        <span className="text-sm text-gray-500">
          {characterCount}/{maxCharacters} characters
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-4">
            <FileText className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-grow">
              <textarea
                {...register('summary', {
                  required: 'Professional summary is required',
                  maxLength: {
                    value: maxCharacters,
                    message: `Summary cannot exceed ${maxCharacters} characters`
                  }
                })}
                rows={6}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for a great summary:</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Keep it concise and focused on your most relevant achievements</li>
            <li>Highlight your unique value proposition</li>
            <li>Include keywords relevant to your target role</li>
            <li>Quantify achievements where possible</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}