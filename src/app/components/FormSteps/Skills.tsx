'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Skill as SkillType } from '../../types/resume';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export function Skills() {
  const { data, setData } = useResumeStore();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      skills: data.skills || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = (formData: { skills: SkillType[] }) => {
    setData({ skills: formData.skills });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={() => append({
            id: crypto.randomUUID(),
            name: '',
            level: 'Intermediate'
          })}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <Wrench className="h-5 w-5 text-gray-400 flex-shrink-0" />
            
            <div className="flex-grow">
              <input
                type="text"
                {...register(`skills.${index}.name` as const, {
                  required: 'Skill name is required'
                })}
                placeholder="Enter skill name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.skills?.[index]?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.skills[index]?.name?.message}</p>
              )}
            </div>

            <select
              {...register(`skills.${index}.level` as const, {
                required: 'Skill level is required'
              })}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
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