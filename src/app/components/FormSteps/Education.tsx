'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Education as EducationType } from '../../types/resume';

export function Education() {
  const { data, setData } = useResumeStore();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      education: data.education || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  const onSubmit = (formData: { education: EducationType[] }) => {
    setData({ education: formData.education });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          type="button"
          onClick={() => append({
            id: crypto.randomUUID(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
          })}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium">Education {index + 1}</h3>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  {...register(`education.${index}.institution` as const, {
                    required: 'Institution is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.education?.[index]?.institution && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.institution?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  {...register(`education.${index}.degree` as const, {
                    required: 'Degree is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.education?.[index]?.degree && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.degree?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                <input
                  type="text"
                  {...register(`education.${index}.field` as const, {
                    required: 'Field of study is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.education?.[index]?.field && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.field?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate` as const, {
                    required: 'Start date is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.education?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.startDate?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate` as const, {
                    required: 'End date is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.education?.[index]?.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.education[index]?.endDate?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">GPA (Optional)</label>
                <input
                  type="text"
                  {...register(`education.${index}.gpa` as const)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
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