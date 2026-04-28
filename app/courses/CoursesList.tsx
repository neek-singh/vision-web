"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  fee?: number;
  discount_fee?: number;
  learning_format?: string;
  rating?: number;
  image_url?: string;
};

export default function CoursesList({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple client-side filter
  const filteredCourses = initialCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full">
      {/* Enhanced Search Section */}
      <div className="mb-12 flex justify-center">
        <div className="group relative w-full max-w-2xl">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search for courses by name or description..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-800 text-base md:text-lg transition-all duration-300 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {course.image_url && (
                <div className="relative w-full h-48 border-b border-slate-100 overflow-hidden">
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-100/50 pb-4">
                <CardTitle className="line-clamp-2 leading-snug">{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow pt-5">
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                {/* Course Metadata Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {/* Duration Tag */}
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md text-xs border border-slate-200/60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {course.duration || 'Flexible'}
                  </span>

                  {/* Format Tag */}
                  <span className="inline-flex items-center gap-1.5 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md text-xs border border-indigo-100/60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                    {course.learning_format || 'Offline'}
                  </span>

                  {/* Pricing Tag */}
                  {course.discount_fee && course.discount_fee > 0 ? (
                    <div className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md text-xs border border-emerald-100/60">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                      <span>₹{course.discount_fee.toLocaleString()}</span>
                      <span className="text-emerald-700/50 line-through text-[10px] ml-0.5">
                        ₹{course.fee?.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    course.fee && (
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md text-xs border border-slate-200/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        ₹{course.fee.toLocaleString()}
                      </span>
                    )
                  )}
                </div>
              </CardContent>

              {/* Action Buttons */}
              <CardFooter className="flex gap-3 border-t border-slate-100 pt-5">
                <Button
                  href={`/courses/${course.id}`}
                  variant="outline"
                  className="flex-1 w-full"
                >
                  View Details
                </Button>
                <Button
                  href={`/admissions?courseId=${course.id}`}
                  variant="primary"
                  className="flex-1 w-full"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Enhanced Empty State */
        <div className="text-center py-24 px-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            We couldn't find any courses matching "<span className="text-slate-900 font-medium">{searchTerm}</span>". Try adjusting your search terms.
          </p>
          <Button variant="secondary" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}