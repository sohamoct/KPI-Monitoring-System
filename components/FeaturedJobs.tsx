import React, { useRef, useState } from 'react';
import { Briefcase, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  experience: string;
  location: string;
  posted: string;
  details: string[];
};

const jobData: Job[] = [
  {
    id: 1,
    title: 'Sales Manager',
    company: 'HRassistance India Consultancy LLP',
    experience: '4+ years',
    location: 'Bengaluru, India',
    posted: '3 months ago',
    details: [
      'MBA Sales & Marketing with 4-6 years of experience in education/retail/franchising.',
      'Sales Knowledge-- Influencing and Convincing, Self-Management -- result orientation.',
    ],
  },
  {
    id: 2,
    title: 'Assistant Relationship Manager',
    company: 'HRassistance India Consultancy LLP',
    experience: '5+ years',
    location: 'Mumbai, Maharashtra, India',
    posted: '24 days ago',
    details: [
      'Candidates from Retail and Banking industry are preferred.',
      'International BPO experience but with good end to end Operations exposure.',
      'Verbal Communication',
    ],
  },
  {
    id: 3,
    title: 'Sales Manager - Alternate Chan...',
    company: 'HRassistance India Consultancy LLP',
    experience: '3+ years',
    location: 'Mumbai, Maharashtra, India',
    posted: '24 days ago',
    details: [
      'Experience 3+ years in Franchise Sales, Curriculum Sales, or Business Development in the Preschool / K-12 / Education / Timeshare / Telecom sectors.',
      'Age: Below 35 years.',
    ],
  },
  {
    id: 4,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    experience: '5+ years',
    location: 'Remote',
    posted: '2 days ago',
    details: [
        'Proficient in React, TypeScript, and Tailwind CSS.',
        'Experience with state management libraries like Redux or Zustand.',
        'Strong understanding of web performance and accessibility.',
    ]
  }
];

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-4">
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
            
            <div className="flex flex-wrap justify-between items-center text-sm text-slate-500">
                <div className="flex items-center"><Briefcase size={14} className="mr-1.5" /> {job.experience}</div>
                <div>{job.posted}</div>
            </div>

             <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside marker:text-slate-400">
                <li>{job.location}</li>
                {job.details.slice(0, 2).map((detail, index) => (
                    <li key={index} className="truncate" title={detail}>{detail}</li>
                ))}
            </ul>
        </div>
    );
};


const FeaturedJobs = () => {
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
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Featured Jobs</h2>
                        <div className="mt-2">
                             <span className="inline-block bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-md">Sponsored Jobs</span>
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
                    {jobData.map((job) => (
                        <JobCard key={job.id} job={job} />
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
