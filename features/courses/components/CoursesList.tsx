"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "boneyard-js/react";
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
  enrollments?: { count: number }[];
  course_level?: string;
  category?: string;
};

export default function CoursesList({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Component mounted
  }, []);

  // Dynamically collect unique categories from the fetched courses
  const categoriesList = [
    "All",
    ...Array.from(
      new Set(
        initialCourses
          .map((c) => c.category)
          .filter((cat): cat is string => !!cat)
      )
    ).sort()
  ];

  // Advanced client-side search and category filtering
  const filteredCourses = initialCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      {/* Enhanced Search Section */}
      <div className="mb-8 flex justify-center">
        <div className="group relative w-full max-w-xl">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search for courses by name or description..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-800 text-xs md:text-sm transition-all duration-300 placeholder:text-slate-400"
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

      {/* Category Filter Chips */}
      {categoriesList.length > 1 && (
        <div className="flex flex-wrap gap-2.5 justify-center mb-8 animate-in fade-in slide-in-from-top-3 duration-500">
          {categoriesList.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-500/20 scale-[1.03]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <Skeleton name="courses-list" loading={isLoading}>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {filteredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden fill-mode-both"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {course.image_url && (
                  <div className="relative w-full h-36 overflow-hidden">
                    <Image
                      src={course.image_url}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    {/* Floating Course Level Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-emerald-100/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm border border-emerald-200/50 uppercase tracking-wide">
                      {course.course_level || 'Beginner'}
                    </span>
                    {/* Floating Category Badge */}
                    {course.category && (
                      <span className="absolute top-2.5 right-2.5 bg-slate-900/75 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        {course.category}
                      </span>
                    )}
                  </div>
                )}
                <CardHeader className="bg-gradient-to-b from-blue-50/40 to-transparent pt-5 pb-3 border-b border-slate-100/50">
                  <CardTitle className="text-sm md:text-base font-semibold text-black group-hover:text-blue-700 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow pt-4">
                  {/* Category Tag */}
                  {course.category && (
                    <div className="mb-3">
                      <span className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded uppercase tracking-wider">
                        {course.category}
                      </span>
                    </div>
                  )}
                  {/* Course Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-3.5 mb-4">
                    {/* Duration Tag */}
                    <span className="font-semibold text-slate-600 text-[11px] uppercase tracking-wide flex items-center gap-1">
                      ⏱ {course.duration || 'Flexible'}
                    </span>
                  </div>

                  <div className="flex gap-2.5 mt-auto border-t border-slate-100/80 pt-3">
                    <Button
                      href={`/courses/${course.id}`}
                      variant="outline"
                      size="sm"
                      className="rounded-lg flex-1 font-semibold text-slate-700 border-slate-200 bg-white/50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 py-1.5 text-[11px] md:text-xs"
                    >
                      Details
                    </Button>
                    <Button
                      href={`/admissions?courseId=${course.id}`}
                      variant="primary"
                      size="sm"
                      className="rounded-lg flex-1 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 border-none py-1.5 text-[11px] md:text-xs"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
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
              We couldn't find any courses matching "{searchTerm}". Try adjusting your search terms.
            </p>
            <Button variant="secondary" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </Skeleton>
    </div>
  );
}
