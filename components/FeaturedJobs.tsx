import React, { useRef, useState, useEffect } from 'react';
import { Briefcase, Bookmark, ChevronLeft, ChevronRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  applyLink: string;
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-4 flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-sky-500">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 truncate" title={job.title}>{job.title}</h3>
                        <p className="text-sm text-slate-500">{job.company}</p>
                    </div>
                </div>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)} 
                  className="text-slate-400 hover:text-sky-500 transition-colors"
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    <Bookmark size={20} className={isBookmarked ? 'fill-sky-500 text-sky-500' : ''} />
                </button>
            </div>
            
            <div className="flex items-center text-sm text-slate-500">
                <Briefcase size={14} className="mr-1.5" /> {job.location}
            </div>

            <p className="text-sm text-slate-600 line-clamp-3 flex-grow">{job.description}</p>
            
             <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-auto inline-flex items-center justify-center w-full sm:w-auto self-start px-5 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors"
            >
                Apply Now <ExternalLink size={16} className="ml-2" />
            </a>
        </div>
    );
};

const LoadingSkeleton: React.FC = () => (
    <div className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="space-y-2 pt-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded w-32 mt-4"></div>
    </div>
);


const FeaturedJobs = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedJobs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `
                    Find 5 recent job openings from big tech companies (e.g., Google, Microsoft, Amazon, Apple, Meta) in India.
                    Focus on software engineering or related tech roles.
                    Return the results as a JSON object with a single key "jobs", which is an array of job objects.
                    Each job object must have the following keys: "title", "company", "location", "description", and "applyLink".
                    The description should be a brief summary of 1-2 sentences.
                    If no jobs are found, return a JSON object with an empty "jobs" array.
                    Do not include any text, markdown, or code block syntax outside of the JSON object itself.
                `;
                
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-pro",
                    contents: prompt,
                    config: {
                        tools: [{ googleSearch: {} }],
                    },
                });

                let jsonText = response.text.trim();
                if (jsonText.startsWith('```json')) {
                    jsonText = jsonText.substring(7, jsonText.length - 3).trim();
                }

                const parsedData = JSON.parse(jsonText);

                if (parsedData.jobs && parsedData.jobs.length > 0) {
                    setJobs(parsedData.jobs);
                } else {
                    setError("Could not find any featured jobs at the moment.");
                }
            } catch (e) {
                console.error("Failed to fetch featured jobs:", e);
                setError("Failed to load featured jobs. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedJobs();
    }, []);


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
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Featured Jobs</h2>
                        <div className="mt-2">
                             <span className="inline-block bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-md">From Top Companies</span>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-2">
                        <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50" aria-label="Scroll left">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50" aria-label="Scroll right">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4" style={{scrollbarWidth: 'none'}}>
                    {isLoading && (
                        [...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)
                    )}
                    {error && !isLoading && (
                         <div className="w-full flex items-center justify-center bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                            <AlertTriangle className="mr-2" size={20}/>
                            <span className="font-medium">{error}</span>
                        </div>
                    )}
                    {!isLoading && !error && jobs.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-lg font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                        All job offers
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FeaturedJobs;