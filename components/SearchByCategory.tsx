import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Landmark, BookOpenCheck, GraduationCap } from 'lucide-react';

type Category = {
  name: string;
  jobs: number;
  icon: React.ElementType;
};

const categoryData: Category[] = [
  { name: 'Education Administration', jobs: 31, icon: Landmark },
  { name: 'Middle/High School Teacher', jobs: 5, icon: BookOpenCheck },
  { name: 'Primary Teacher', jobs: 47, icon: GraduationCap },
  { name: 'Special Education', jobs: 12, icon: Landmark },
  { name: 'University Professor', jobs: 25, icon: GraduationCap },
];


const SearchByCategory = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Search By Category</h2>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        <a href="#" className="text-sky-500 font-semibold hover:underline">All jobs <span aria-hidden="true">&rsaquo;</span></a>
                        <div className="flex items-center gap-2">
                            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50" aria-label="Scroll left">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50" aria-label="Scroll right">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4" style={{scrollbarWidth: 'none'}}>
                    {categoryData.map((category, index) => (
                        <div key={index} className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)]">
                            <button className="w-full text-left bg-white p-6 rounded-xl border border-slate-200 hover:border-sky-500 hover:shadow-lg transition-all duration-300 space-y-4 h-full">
                               <category.icon className="w-8 h-8 text-slate-500" />
                                <div>
                                    <h3 className="font-bold text-slate-800">{category.name}</h3>
                                    <p className="text-sm text-slate-500">{category.jobs} Jobs</p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SearchByCategory;
