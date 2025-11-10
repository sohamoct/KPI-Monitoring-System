import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Building, Menu, X } from 'lucide-react';
import JobAlert from './JobAlert';
import FeaturedJobs from './FeaturedJobs';
import SearchByCategory from './SearchByCategory';
import SearchResults from './SearchResults';
import { GoogleGenAI } from "@google/genai";


interface HomepageProps {
  onNavigateToDashboard: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigateToDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobQuery, setJobQuery] = useState('');
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navLinks = [
    { name: 'Browse Jobs', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'For Employers', href: '#' },
    { name: 'Blogs', href: '#' },
  ];

  const handleSearch = async () => {
    if (!jobQuery.trim() || !city.trim()) {
        setError("Please enter both a job query and a city.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `
            You are a helpful job search assistant.
            Find current job openings for a "${jobQuery}" in ${city}, India, using your search tool.
            Return the results as a JSON object with a single key "jobs" which is an array of job objects.
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
        
        // Clean potential markdown formatting
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        }

        const parsedData = JSON.parse(jsonText);

        if (parsedData.jobs && parsedData.jobs.length > 0) {
            setSearchResults(parsedData.jobs);
        } else {
            setError("No jobs found for your search criteria.");
        }

    } catch (e) {
        console.error(e);
        setError("Sorry, something went wrong while searching for jobs. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-slate-900">
              Ed<span className="text-sky-500">Assist</span>
            </div>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-slate-800 z-50">
              {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>

            <nav className="hidden lg:flex items-center space-x-2">
                {navLinks.map(link => (
                     <a key={link.name} href={link.href} className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-medium">{link.name}</a>
                ))}
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
                 <a href="#" className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-medium">Login</a>
                 <button className="px-5 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors">Register</button>
                 <button onClick={onNavigateToDashboard} title="Go to Dashboard" className="p-2.5 rounded-md font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
                 </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200">
            <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map(link => (
                     <a key={link.name} href={link.href} className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-medium">{link.name}</a>
                ))}
              <hr className="my-2"/>
              <a href="#" className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-medium">Login</a>
              <button className="w-full text-left px-4 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-colors">Register</button>
              <button onClick={onNavigateToDashboard} className="w-full text-left mt-2 px-4 py-2.5 rounded-md font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-colors">Dashboard</button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 bg-gradient-to-br from-cyan-50 via-white to-sky-100 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Connecting Educators With Their
              <br />
              Dream <span className="text-cyan-500">Opportunities</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600">
              EdAssist helps educators find their perfect career match while enabling educational institutions to discover exceptional talent. The premium hiring platform for education professionals.
            </p>

            {/* Search Bar */}
            <div className="mt-12 max-w-3xl mx-auto bg-white p-2 rounded-lg sm:rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-0 border border-slate-200/80">
              <div className="w-full sm:flex-1 flex items-center pl-4 pr-2">
                <Search size={20} className="text-slate-400 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search by job title, company, or desc"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-500 caret-sky-500 text-sm md:text-base" 
                />
              </div>
               <hr className="w-full border-slate-200 sm:hidden" />
              <div className="w-full sm:flex-1 flex items-center pl-4 pr-2 sm:border-l sm:border-slate-200">
                <MapPin size={20} className="text-slate-400 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search and select city" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-500 caret-sky-500 text-sm md:text-base" 
                />
              </div>
              <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full sm:w-auto bg-sky-500 text-white font-semibold py-3 px-6 rounded-md sm:rounded-full hover:bg-sky-600 transition-colors flex-shrink-0 disabled:bg-sky-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Searching...' : 'Search job'}
              </button>
            </div>
          </div>
        </section>

        {/* Search Results Section */}
        {(isLoading || error || searchResults.length > 0) && (
            <SearchResults 
                loading={isLoading}
                error={error}
                results={searchResults}
            />
        )}


        {/* Cards Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left">
                <div className="bg-sky-100 p-4 rounded-full text-sky-500 flex-shrink-0">
                  <Building size={32}/>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900">Employers</h3>
                  <p className="text-slate-600 mt-1">Reach job seekers and fill open positions.</p>
                </div>
                <button className="mt-4 sm:mt-0 sm:ml-auto px-6 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 whitespace-nowrap transition-colors">Post a job</button>
              </div>
              <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left">
                <div className="bg-sky-100 p-4 rounded-full text-sky-500 flex-shrink-0">
                  <Briefcase size={32}/>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900">Job Seekers</h3>
                  <p className="text-slate-600 mt-1">Browse jobs from the very best companies.</p>
                </div>
                <button className="mt-4 sm:mt-0 sm:ml-auto px-6 py-2.5 rounded-md font-semibold bg-sky-500 text-white hover:bg-sky-600 whitespace-nowrap transition-colors">Find jobs</button>
              </div>
            </div>
          </div>
        </section>

        <SearchByCategory />
        <FeaturedJobs />
        <JobAlert />
        
      </main>

      {/* Footer */}
      <footer className="bg-white text-center p-6 text-slate-500 text-sm border-t border-slate-200">
        © 2025 EdAssist — Prototype Homepage.
      </footer>
    </div>
  );
};

export default Homepage;