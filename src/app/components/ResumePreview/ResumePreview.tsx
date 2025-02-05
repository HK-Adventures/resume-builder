'use client';

import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Share2 } from 'lucide-react';

interface ResumePreviewProps {
  isSharedView?: boolean;
  username?: string;
}

export function ResumePreview({ isSharedView, username }: ResumePreviewProps) {
  const { data } = useResumeStore();
  const { personalInfo, summary, workExperience, education, skills, certificates, languages } = data;

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    // Dynamically import html2pdf only on client side
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 1,
      filename: `${personalInfo?.fullName}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as 'portrait' | 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const shareResume = async () => {
    if (!personalInfo?.username) return;

    const shareUrl = `${window.location.origin}/${personalInfo.username}/resume`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${personalInfo.fullName}'s Resume`,
          text: 'Check out my resume!',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('Resume link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full">
      <div id="resume-preview" className="space-y-6">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{personalInfo?.fullName}</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {personalInfo?.email && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-600">
                  {personalInfo.website}
                </a>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-600">
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-sm sm:text-base text-gray-700">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-3 sm:pl-4">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">{exp.position}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-gray-700">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                >
                  {skill.name} • {skill.level}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-medium text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isSharedView && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={downloadPDF}
              className="flex-1 inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download PDF
            </button>
            <button
              onClick={shareResume}
              className="inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
}