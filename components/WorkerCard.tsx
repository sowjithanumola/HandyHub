import React from 'react';
import { Worker, WorkerStatus } from '../types';
import { MapPin, Phone, Star } from 'lucide-react';

interface WorkerCardProps {
  worker: Worker;
  onSelect: (worker: Worker) => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(worker)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="relative">
        <img 
          src={worker.avatarUrl} 
          alt={worker.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
          worker.status === WorkerStatus.Available ? 'bg-green-500' :
          worker.status === WorkerStatus.Absent ? 'bg-red-500' : 'bg-yellow-500'
        }`}></div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900">{worker.name}</h3>
          <span className="text-sm font-medium text-teal-600">${worker.dailyRate}/day</span>
        </div>
        <p className="text-sm text-gray-500 capitalize">{worker.category} • {worker.gender}</p>
        
        <div className="flex items-center mt-2 space-x-3 text-xs text-gray-400">
           <div className="flex items-center">
             <MapPin className="w-3 h-3 mr-1" />
             {worker.distanceKm}km away
           </div>
           <div className="flex items-center text-yellow-500">
             <Star className="w-3 h-3 mr-1 fill-current" />
             {worker.rating}
           </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;