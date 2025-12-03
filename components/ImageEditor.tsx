import React, { useState, useRef } from 'react';
import { editWorkSiteImage } from '../services/geminiService';
import { Loader2, Wand2, Upload, X, ImageIcon } from 'lucide-react';

interface ImageEditorProps {
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    
    // Call Gemini 2.5 Flash Image
    const result = await editWorkSiteImage(image, prompt);
    
    setResultImage(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
             <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Wand2 className="mr-2 text-purple-600" />
              AI Site Visualizer
            </h2>
            <p className="text-sm text-gray-500">Use text prompts to edit work site photos or worker profiles.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition ${
                image ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
              }`}
            >
              {image ? (
                <img src={image} alt="Original" className="h-full w-full object-contain rounded-lg" />
              ) : (
                <div className="text-center p-4">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Click to upload photo</p>
                  <p className="text-xs text-gray-400">Worker profile or Work site</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange} 
              />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Edit Instruction</label>
                <div className="relative">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='e.g., "Add a safety hat", "Remove the debris"'
                        className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    />
                    <button 
                        onClick={handleEdit}
                        disabled={!image || !prompt || loading}
                        className="absolute right-2 top-1.5 bottom-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                    >
                         {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-gray-400">Powered by Gemini 2.5 Flash Image</p>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-gray-100 rounded-xl h-64 md:h-auto flex items-center justify-center border border-gray-200 relative overflow-hidden">
             {loading ? (
                 <div className="text-center">
                     <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
                     <p className="text-sm text-gray-500 animate-pulse">Processing pixels...</p>
                 </div>
             ) : resultImage ? (
                 <div className="relative w-full h-full group">
                    <img src={resultImage} alt="Edited" className="w-full h-full object-contain" />
                    <a 
                      href={resultImage} 
                      download="handyhub-edited.png"
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      Download
                    </a>
                 </div>
             ) : (
                 <div className="text-center text-gray-400">
                     <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                     <p className="text-sm">Edited image will appear here</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;