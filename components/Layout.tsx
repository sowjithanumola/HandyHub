import React from 'react';
import { Menu, User, MapPin, Search, Briefcase, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-teal-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">HandyHub <span className="text-xs font-normal opacity-75 uppercase ml-1 border-l border-teal-400 pl-2">{role}</span></h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {role === 'client' && (
              <button className="p-2 hover:bg-teal-700 rounded-full transition md:block hidden">
                <Search className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-teal-700 rounded-full transition flex items-center text-xs font-medium"
            >
              <LogOut className="w-5 h-5 md:mr-1" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-4 pb-24 md:pb-4">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 pb-safe">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'home' ? 'text-teal-600' : 'text-gray-500'}`}
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          {role === 'client' ? (
            <>
              <button 
                onClick={() => setActiveTab('workers')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'workers' ? 'text-teal-600' : 'text-gray-500'}`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Workers</span>
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'dashboard' ? 'text-teal-600' : 'text-gray-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 01-2 2h2a2 2 0 012 2zm0 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6a2 2 0 012-2zm4 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
                <span className="text-xs mt-1">Manage</span>
              </button>
            </>
          ) : (
             <>
              <button 
                onClick={() => setActiveTab('my-jobs')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'my-jobs' ? 'text-teal-600' : 'text-gray-500'}`}
              >
                <Briefcase className="w-6 h-6" />
                <span className="text-xs mt-1">My Jobs</span>
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'profile' ? 'text-teal-600' : 'text-gray-500'}`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Layout;