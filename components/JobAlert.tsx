import React, { useState } from 'react';

const JobAlert = () => {
  const [frequency, setFrequency] = useState('daily');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here
    console.log({
      frequency,
      jobType: 'Not implemented',
      category: 'Not implemented',
      location: 'Not implemented',
      email,
    });
    alert('Job alert created! Check the console for details.');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900">Job alert</h2>
          <p className="mt-2 text-slate-600">Transform your inbox into a career launchpad</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Frequency Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${
                    frequency === 'daily'
                      ? 'bg-sky-500 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${
                    frequency === 'weekly'
                      ? 'bg-sky-500 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Weekly
                </button>
              </div>

              {/* Select Fields */}
              <div>
                <select className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option>Select job type</option>
                </select>
              </div>
              <div>
                <select className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option>Select category</option>
                </select>
              </div>
              <div>
                 <select className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option>Select Location</option>
                </select>
              </div>
            </div>

            {/* Email and Submit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-500 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Create alert
                </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobAlert;
