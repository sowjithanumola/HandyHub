import React, { useState } from 'react';
import { generateAbsenceCallScript } from '../services/geminiService';
import { PhoneCall, MessageSquare, Loader2 } from 'lucide-react';

interface CallAssistantProps {
  workerName: string;
  onClose: () => void;
}

const CallAssistant: React.FC<CallAssistantProps> = ({ workerName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);

  const handleGenerateScript = async () => {
    setLoading(true);
    const result = await generateAbsenceCallScript(workerName);
    setScript(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-teal-600 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <PhoneCall className="mr-2" />
            Automated Contact
          </h2>
          <p className="text-teal-100 text-sm mt-1">
            Reaching out to {workerName} regarding absence.
          </p>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {!script ? (
            <div className="text-center py-8">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-gray-600 mb-6">
                Generate a professional, multi-language script to ask {workerName} why they are absent today using AI.
              </p>
              <button
                onClick={handleGenerateScript}
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <span className="mr-2">✨</span>}
                {loading ? 'Consulting Gemini...' : 'Generate Call Script'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">AI Generated Script</h3>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                  {script}
                </div>
              </div>
              <div className="flex space-x-2">
                 <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center">
                   <PhoneCall className="w-4 h-4 mr-2" /> Call Now
                 </button>
                 <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center">
                   <MessageSquare className="w-4 h-4 mr-2" /> Send SMS
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallAssistant;