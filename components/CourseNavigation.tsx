import React from 'react';
import Link from 'next/link';
import InteractiveButton from './InteractiveButton';

interface CourseNavigationProps {
  currentSlug: string;
  courseList: string[];
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({ currentSlug, courseList }) => {
  const currentIndex = courseList.indexOf(currentSlug);
  const prevCourse = currentIndex > 0 ? courseList[currentIndex - 1] : null;
  const nextCourse = currentIndex < courseList.length - 1 ? courseList[currentIndex + 1] : null;

  return (
    <nav className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Previous lesson button */}
        <div className="flex items-center">
          {prevCourse ? (
            <Link href={`/courses/${prevCourse}`}>
              <InteractiveButton variant="outline" size="md">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </InteractiveButton>
            </Link>
          ) : (
            <div className="w-20"></div>
          )}
        </div>

        {/* Course list indicator */}
        <div className="flex items-center space-x-2">
          {courseList.map((course, index) => (
            <Link key={course} href={`/courses/${course}`}>
              <div
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : index < currentIndex
                    ? 'bg-green-500 hover:scale-110'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                title={`Course ${index + 1}: ${course}`}
              />
            </Link>
          ))}
        </div>

        {/* Next lesson button */}
        <div className="flex items-center">
          {nextCourse ? (
            <Link href={`/courses/${nextCourse}`}>
              <InteractiveButton variant="primary" size="md">
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </InteractiveButton>
            </Link>
          ) : (
            <Link href="/">
              <InteractiveButton variant="primary" size="md">
                Course Complete 🎉
              </InteractiveButton>
            </Link>
          )}
        </div>
      </div>

      {/* Progress information */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Course Progress: {currentIndex + 1} / {courseList.length}</span>
          <span>{Math.round(((currentIndex + 1) / courseList.length) * 100)}% Complete</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / courseList.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default CourseNavigation;