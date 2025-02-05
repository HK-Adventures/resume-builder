'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { WorkExperience as WorkExperienceType } from '../../types/resume';

export function WorkExperience() {
  const { data, setData } = useResumeStore();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      workExperience: data.workExperience || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience"
  });

  const onSubmit = (formData: { workExperience: WorkExperienceType[] }) => {
    setData({ workExperience: formData.workExperience });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          type="button"
          onClick={() => append({
            id: crypto.randomUUID(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: ['']
          })}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium">Position {index + 1}</h3>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  {...register(`workExperience.${index}.company` as const, {
                    required: 'Company is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.workExperience?.[index]?.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.workExperience[index]?.company?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  {...register(`workExperience.${index}.position` as const, {
                    required: 'Position is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.workExperience?.[index]?.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.workExperience[index]?.position?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register(`workExperience.${index}.startDate` as const, {
                    required: 'Start date is required'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.workExperience?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.workExperience[index]?.startDate?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`workExperience.${index}.endDate` as const)}
                  disabled={field.current}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register(`workExperience.${index}.current` as const)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">I currently work here</span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Key Responsibilities</label>
                <textarea
                  {...register(`workExperience.${index}.responsibilities.0` as const, {
                    required: 'At least one responsibility is required'
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your key responsibilities and achievements..."
                />
                {errors.workExperience?.[index]?.responsibilities && (
                  <p className="mt-1 text-sm text-red-600">{errors.workExperience[index]?.responsibilities?.message}</p>
                )}
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