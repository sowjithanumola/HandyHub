import React, { useState } from 'react';
import { Worker, WorkerStatus } from '../types';
import { Calendar, CheckCircle, Clock, DollarSign, MapPin, Edit2, Sparkles, Loader2 } from 'lucide-react';
import { improveWorkerProfile } from '../services/geminiService';

interface WorkerDashboardProps {
  // In a real app, this would come from a context or API
  workerName?: string;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ workerName = "Roberto Rodriguez" }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'profile'>('home');
  const [status, setStatus] = useState<WorkerStatus>(WorkerStatus.Available);
  
  // Profile State
  const [bio, setBio] = useState("I am a hard worker with 5 years experience in construction. I am good at painting and drywall.");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const handleImproveBio = async () => {
    setIsGeneratingBio(true);
    const improved = await improveWorkerProfile(workerName, "Construction", bio);
    setBio(improved);
    setIsGeneratingBio(false);
  };

  const MOCK_JOBS = [
    { id: 1, title: 'Site Cleanup', client: 'John Doe', date: 'Today, 9:00 AM', status: 'In Progress', pay: '$180' },
    { id: 2, title: 'Drywall Repair', client: 'Alice Smith', date: 'Tomorrow, 10:00 AM', status: 'Scheduled', pay: '$250' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome & Status Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
           <img 
            src="https://picsum.photos/id/10/200/200" 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-teal-100"
           />
           <div>
             <h2 className="text-xl font-bold text-gray-900">Hola, {workerName}</h2>
             <p className="text-gray-500 text-sm">Construction Specialist</p>
           </div>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full p-1">
          {[WorkerStatus.Available, WorkerStatus.Busy, WorkerStatus.Absent].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                status === s 
                  ? s === WorkerStatus.Available ? 'bg-green-500 text-white' 
                  : s === WorkerStatus.Busy ? 'bg-yellow-500 text-white' 
                  : 'bg-red-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-md">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-teal-100 text-sm font-medium">Weekly Earnings</p>
               <h3 className="text-3xl font-bold mt-1">$900</h3>
             </div>
             <div className="bg-white/20 p-2 rounded-lg">
               <DollarSign className="w-6 h-6 text-white" />
             </div>
           </div>
           <div className="mt-4 flex items-center text-sm text-teal-100">
             <CheckCircle className="w-4 h-4 mr-1" />
             <span>5 jobs completed</span>
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-500 text-sm font-medium">Attendance Score</p>
               <h3 className="text-3xl font-bold mt-1 text-gray-900">98%</h3>
             </div>
             <div className="bg-blue-50 p-2 rounded-lg">
               <Calendar className="w-6 h-6 text-blue-600" />
             </div>
           </div>
           <div className="mt-4 flex items-center text-sm text-green-600">
             <span className="font-medium">Great job! Keep it up.</span>
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-500 text-sm font-medium">Next Job</p>
               <h3 className="text-lg font-bold mt-1 text-gray-900 line-clamp-1">Site Cleanup</h3>
             </div>
             <div className="bg-purple-50 p-2 rounded-lg">
               <Clock className="w-6 h-6 text-purple-600" />
             </div>
           </div>
           <div className="mt-4 flex items-center text-sm text-gray-500">
             <MapPin className="w-4 h-4 mr-1" />
             <span>2.5 km away</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Jobs</h3>
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition">
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <div className="bg-teal-50 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-500">Client: {job.client}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {job.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end space-x-4 w-full md:w-auto">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{job.status}</span>
                <span className="font-bold text-gray-900">{job.pay}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Profile Editor */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">My Profile Bio</h3>
            <button onClick={() => setIsEditingBio(!isEditingBio)} className="text-teal-600 hover:text-teal-700">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            {isEditingBio ? (
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none h-32"
              />
            ) : (
              <p className="text-gray-600 text-sm italic bg-gray-50 p-3 rounded-lg border border-gray-100 min-h-[5rem]">
                "{bio}"
              </p>
            )}
            
            <div className="mt-4">
              <button 
                onClick={handleImproveBio}
                disabled={isGeneratingBio}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition disabled:opacity-50"
              >
                {isGeneratingBio ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Consulting Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Rewrite with AI
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">Make your profile stand out to employers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;