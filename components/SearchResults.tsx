import React from 'react';
import { MapPin, ExternalLink, AlertTriangle } from 'lucide-react';

interface Job {
    title: string;
    company: string;
    location: string;
    description: string;
    applyLink: string;
}

interface SearchResultsProps {
    loading: boolean;
    error: string | null;
    results: Job[];
}

const JobResultCard: React.FC<{ job: Job }> = ({ job }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-4 flex flex-col h-full">
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-slate-800">{job.title}</h3>
            <p className="text-md font-semibold text-sky-600">{job.company}</p>
            <div className="flex items-center text-sm text-slate-500 mt-2">
                <MapPin size={14} className="mr-1.5 flex-shrink-0" />
                <span>{job.location}</span>
            </div>
            <p className="text-sm text-slate-600 mt-4 line-clamp-3">{job.description}</p>
        </div>
        <a 
            href={job.applyLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 inline-flex items-center justify-center w-full sm:w-auto self-start px-5 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        >
            Apply Now <ExternalLink size={16} className="ml-2" />
        </a>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="space-y-2 pt-4">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded w-32 mt-4"></div>
    </div>
);


const SearchResults: React.FC<SearchResultsProps> = ({ loading, error, results }) => {
    return (
        <section className="py-16 bg-white border-t border-b border-slate-200/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12">
                     <h2 className="text-3xl font-bold text-slate-900">
                        {loading ? 'Searching for Opportunities...' : 'Job Search Results'}
                    </h2>
                </div>


                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
                    </div>
                )}

                {error && (
                    <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center flex items-center justify-center">
                         <AlertTriangle className="mr-2" size={20}/>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((job, index) => (
                            <JobResultCard key={index} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchResults;
