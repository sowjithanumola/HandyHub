import React, { useState } from 'react';
import Layout from './components/Layout';
import AuthScreen from './components/AuthScreen';
import WorkerDashboard from './components/WorkerDashboard';
import WorkerCard from './components/WorkerCard';
import CallAssistant from './components/CallAssistant';
import ImageEditor from './components/ImageEditor';
import { Worker, WorkerStatus, Gender, LABOR_CATEGORIES, UserRole } from './types';
import { MapPin, Phone, DollarSign, Camera, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Data
const MOCK_WORKERS: Worker[] = [
  {
    id: '1',
    name: 'Roberto Rodriguez',
    category: 'construction',
    gender: Gender.Male,
    hourlyRate: 25,
    dailyRate: 180,
    distanceKm: 2.5,
    status: WorkerStatus.Available,
    avatarUrl: 'https://picsum.photos/id/10/200/200',
    rating: 4.8,
    attendance: [true, true, true, false, true, true, true],
    phoneNumber: '+15550123'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    category: 'cleaning',
    gender: Gender.Female,
    hourlyRate: 20,
    dailyRate: 140,
    distanceKm: 0.8,
    status: WorkerStatus.Busy,
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    rating: 4.9,
    attendance: [true, true, true, true, true, true, true],
    phoneNumber: '+15550124'
  },
  {
    id: '3',
    name: 'Michael Smith',
    category: 'plumbing',
    gender: Gender.Male,
    hourlyRate: 45,
    dailyRate: 300,
    distanceKm: 5.2,
    status: WorkerStatus.Absent,
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    rating: 4.5,
    attendance: [true, true, false, true, false, true, true],
    phoneNumber: '+15550125'
  },
   {
    id: '4',
    name: 'Maria Garcia',
    category: 'gardening',
    gender: Gender.Female,
    hourlyRate: 22,
    dailyRate: 160,
    distanceKm: 1.2,
    status: WorkerStatus.Available,
    avatarUrl: 'https://picsum.photos/id/117/200/200',
    rating: 4.7,
    attendance: [true, true, true, true, true, true, true],
    phoneNumber: '+15550126'
  },
  {
    id: '5',
    name: 'David Kim',
    category: 'electrician',
    gender: Gender.Male,
    hourlyRate: 50,
    dailyRate: 350,
    distanceKm: 3.0,
    status: WorkerStatus.Available,
    avatarUrl: 'https://picsum.photos/id/177/200/200',
    rating: 4.9,
    attendance: [true, true, true, true, true, true, true],
    phoneNumber: '+15550127'
  }
];

const App: React.FC = () => {
  // Authentication & Role State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('client');
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [filterGender, setFilterGender] = useState<Gender | 'All'>('All');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  
  // Modals
  const [showCallAssistant, setShowCallAssistant] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);

  // Handle Login
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveTab('home'); // Reset tab on login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('client');
  };

  // Filter Logic
  const filteredWorkers = workers.filter(w => {
    if (selectedCategory && w.category !== selectedCategory) return false;
    if (filterGender !== 'All' && w.gender !== filterGender) return false;
    return true;
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  // Salary Logic
  const getSalaryStats = (worker: Worker) => {
    const totalDays = worker.attendance.length;
    const workedDays = worker.attendance.filter(Boolean).length;
    const salary = workedDays * worker.dailyRate;
    const deduction = (totalDays - workedDays) * worker.dailyRate;
    return { salary, deduction, workedDays, totalDays };
  };

  const handleWorkerSelect = (worker: Worker) => {
    setSelectedWorker(worker);
    setActiveTab('profile');
  };

  const handleBack = () => {
    if (activeTab === 'profile') {
      setActiveTab('workers');
      setSelectedWorker(null);
    } else if (activeTab === 'workers') {
      setActiveTab('home');
      setSelectedCategory(null);
    }
  };

  // --- RENDER ---

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      role={userRole}
      onLogout={handleLogout}
    >
      
      {/* --------------------------- */}
      {/* WORKER VIEW LOGIC           */}
      {/* --------------------------- */}
      {userRole === 'worker' && (
        <WorkerDashboard />
      )}

      {/* --------------------------- */}
      {/* CLIENT VIEW LOGIC           */}
      {/* --------------------------- */}
      {userRole === 'client' && (
        <>
          {/* HOME VIEW */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fade-in">
              <section className="bg-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Find Reliable Help Nearby</h2>
                  <p className="text-teal-100 mb-4 max-w-sm">
                    Connect with skilled laborers, construction workers, and helpers in your area instantly.
                  </p>
                  <button 
                    onClick={() => setActiveTab('workers')}
                    className="bg-white text-teal-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm"
                  >
                    Browse All Workers
                  </button>
                </div>
                 <div className="absolute right-0 bottom-0 opacity-20 transform translate-y-1/4 translate-x-1/4">
                   <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
                     <path d="M45 100a55 55 0 1 0 110 0 55 55 0 1 0 -110 0" />
                   </svg>
                 </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {LABOR_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveTab('workers');
                      }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:border-teal-500 hover:shadow-md transition group"
                    >
                      <div className="bg-teal-50 p-3 rounded-full mb-3 group-hover:bg-teal-100 transition">
                        {/* Simplified Icons based on id */}
                        {cat.id === 'construction' && <span className="text-2xl">🏗️</span>}
                        {cat.id === 'cleaning' && <span className="text-2xl">🧹</span>}
                        {cat.id === 'gardening' && <span className="text-2xl">🌱</span>}
                        {cat.id === 'moving' && <span className="text-2xl">📦</span>}
                        {cat.id === 'plumbing' && <span className="text-2xl">🔧</span>}
                        {cat.id === 'electrician' && <span className="text-2xl">⚡</span>}
                      </div>
                      <span className="font-medium text-gray-700">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Featured AI Tool</h3>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-bold">NEW</span>
                </div>
                <div 
                  onClick={() => setShowImageEditor(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition"
                >
                  <div>
                    <h4 className="font-bold text-lg">Work Site Visualizer</h4>
                    <p className="text-purple-100 text-sm">Use AI to plan cleanup or visualize changes.</p>
                  </div>
                  <Camera className="w-8 h-8 opacity-80" />
                </div>
              </section>
            </div>
          )}

          {/* WORKERS LIST VIEW */}
          {activeTab === 'workers' && (
            <div className="space-y-4 animate-fade-in">
               <div className="flex items-center space-x-2 mb-2">
                <button onClick={handleBack} className="p-2 hover:bg-gray-200 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCategory 
                    ? LABOR_CATEGORIES.find(c => c.id === selectedCategory)?.name 
                    : 'All Workers'}
                </h2>
              </div>

              {/* Filters */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                 <button 
                    onClick={() => setFilterGender('All')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filterGender === 'All' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                 >
                   All
                 </button>
                 <button 
                    onClick={() => setFilterGender(Gender.Male)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filterGender === Gender.Male ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                 >
                   Male Only
                 </button>
                 <button 
                    onClick={() => setFilterGender(Gender.Female)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filterGender === Gender.Female ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                 >
                   Female Only
                 </button>
                 <div className="border-l border-gray-300 mx-2 h-6"></div>
                 <div className="flex items-center text-sm text-gray-500">
                   <MapPin className="w-4 h-4 mr-1" />
                   <span className="whitespace-nowrap">Sorted by distance</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorkers.map(worker => (
                  <WorkerCard key={worker.id} worker={worker} onSelect={handleWorkerSelect} />
                ))}
              </div>
              
              {filteredWorkers.length === 0 && (
                 <div className="text-center py-12 text-gray-500">
                   <p>No workers found matching your filters.</p>
                 </div>
              )}
            </div>
          )}

          {/* WORKER PROFILE & SALARY VIEW (FOR CLIENT) */}
          {activeTab === 'profile' && selectedWorker && (
            <div className="animate-fade-in space-y-6">
               <div className="flex items-center space-x-2">
                <button onClick={handleBack} className="p-2 hover:bg-gray-200 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-800">Worker Profile</h2>
              </div>

              {/* Profile Header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <img 
                  src={selectedWorker.avatarUrl} 
                  alt={selectedWorker.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-teal-50 shadow-sm"
                />
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedWorker.name}</h1>
                  <p className="text-gray-500 capitalize">{selectedWorker.category} Specialist</p>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-4 mt-3">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                       selectedWorker.status === WorkerStatus.Available ? 'bg-green-100 text-green-700' :
                       selectedWorker.status === WorkerStatus.Absent ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                     }`}>
                       {selectedWorker.status}
                     </span>
                     <span className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1 text-teal-500" />
                        {selectedWorker.distanceKm} km away
                     </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 w-full md:w-auto">
                   <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center justify-center">
                     <Phone className="w-4 h-4 mr-2" />
                     Call
                   </button>
                   {selectedWorker.status === WorkerStatus.Absent && (
                     <button 
                      onClick={() => setShowCallAssistant(true)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-6 py-2 rounded-lg font-medium transition flex items-center justify-center"
                     >
                       <AlertCircle className="w-4 h-4 mr-2" />
                       Report Absence
                     </button>
                   )}
                </div>
              </div>

              {/* Salary Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-teal-600" />
                    Salary & Attendance
                  </h3>
                  
                  <div className="flex justify-between items-center mb-6">
                     <div>
                       <p className="text-sm text-gray-500">Current Salary Due</p>
                       <p className="text-3xl font-bold text-gray-900">${getSalaryStats(selectedWorker).salary}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-sm text-red-500">Deductions (Absence)</p>
                       <p className="text-xl font-bold text-red-500">-${getSalaryStats(selectedWorker).deduction}</p>
                     </div>
                  </div>

                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedWorker.attendance.map((present, i) => ({ day: `Day ${i+1}`, present: present ? 1 : 0 }))}>
                        <XAxis dataKey="day" hide />
                        <Tooltip 
                          cursor={{fill: 'transparent'}}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-gray-800 text-white text-xs p-2 rounded">
                                  {payload[0].value === 1 ? 'Present' : 'Absent'}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="present" radius={[4, 4, 0, 0]}>
                          {selectedWorker.attendance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry ? '#14b8a6' : '#ef4444'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-2">Last 7 Days Attendance</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                   <div className="space-y-3">
                     <button 
                      onClick={() => setShowImageEditor(true)}
                      className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition text-left group"
                     >
                       <div className="bg-purple-100 p-2 rounded-lg mr-3 group-hover:bg-purple-200 transition">
                         <Camera className="w-5 h-5 text-purple-600" />
                       </div>
                       <div>
                         <p className="font-medium text-gray-900">Visualize Work Site</p>
                         <p className="text-xs text-gray-500">Use AI to edit/cleanup site photos</p>
                       </div>
                     </button>

                     <div className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition text-left group">
                       <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition">
                         <Calendar className="w-5 h-5 text-blue-600" />
                       </div>
                       <div>
                         <p className="font-medium text-gray-900">Schedule Work</p>
                         <p className="text-xs text-gray-500">Book for next week</p>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD VIEW - Admin Summary */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-6">
               <h2 className="text-2xl font-bold text-gray-900">Management Dashboard</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm">Total Workers</p>
                    <p className="text-3xl font-bold text-gray-900">{workers.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm">Active Today</p>
                    <p className="text-3xl font-bold text-teal-600">{workers.filter(w => w.status !== WorkerStatus.Absent).length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm">Absence Rate</p>
                    <p className="text-3xl font-bold text-red-500">20%</p>
                  </div>
               </div>

               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                 <h3 className="font-bold mb-4">Today's Attendance</h3>
                 <div className="space-y-4">
                   {workers.map(worker => (
                     <div key={worker.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-3">
                           <img src={worker.avatarUrl} className="w-10 h-10 rounded-full bg-gray-100" />
                           <div>
                             <p className="font-medium text-gray-900">{worker.name}</p>
                             <p className="text-xs text-gray-500 capitalize">{worker.category}</p>
                           </div>
                        </div>
                        <div>
                           {worker.status === WorkerStatus.Absent ? (
                             <span className="flex items-center text-red-600 text-sm font-medium">
                               <XCircle className="w-4 h-4 mr-1" /> Absent
                             </span>
                           ) : (
                             <span className="flex items-center text-green-600 text-sm font-medium">
                               <CheckCircle className="w-4 h-4 mr-1" /> Present
                             </span>
                           )}
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}
        </>
      )}

      {/* MODALS */}
      {showCallAssistant && selectedWorker && (
        <CallAssistant 
          workerName={selectedWorker.name} 
          onClose={() => setShowCallAssistant(false)} 
        />
      )}

      {showImageEditor && (
        <ImageEditor onClose={() => setShowImageEditor(false)} />
      )}

    </Layout>
  );
};

export default App;