import React, {  useState } from 'react';
import { X } from 'lucide-react';
import type { AddContentForm } from '../../types';

interface AddContentModalProps {
  isOpen: boolean; //modal dikhana hai ya nhi.
  onClose: () => void; // modal band karne ka callback
  onSubmit: (formData: AddContentForm) => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
}

const AddContentModal : React.FC<AddContentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting 
}) =>
   {
    

  const [formData, setFormData] = useState<AddContentForm>({
    title: '',
    type: '',
    link: '',
    why: '',
    tags: '',
    reminderDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    
    if (result.success) {
      // Reset form and close modal
      setFormData({
        title: '',
        type: '',
        link: '',
        why: '',
        tags: '',
        reminderDate: ''
      });
      onClose();
    } else if (result.error) {
      
      alert(result.error);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      type: '',
      link: '',
      why: '',
      tags: '',
      reminderDate: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">

{/* header div for title and x icon for close*/}
          <div className="flex justify-between items-center mb-6">
         
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Add New Content</h3>
              <p className="text-gray-600 mt-1">Save something interesting for later</p>
            </div>

            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter a descriptive title"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Type */}
              <div>

                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Content Type *
                </label>

                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select type</option>
                  <option value="YOUTUBE">YouTube</option>
                  <option value="TWITTER">Twitter</option>
                  <option value="DOCUMENT">Document</option>
                  <option value="STUDY">Study</option>
                  <option value="FUN">Fun</option>
                  <option value="OTHER">Other</option>
                </select>

              </div>

              {/* Reminder Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Reminder Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.reminderDate}
                  onChange={(e) => setFormData(prev => ({...prev, reminderDate: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
           
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Link <span className="text-gray-500 font-normal">(optional)</span>
              </label>

              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({...prev, link: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Why is this important? *
              </label>
              <textarea
                required
                rows={4}
                value={formData.why}
                onChange={(e) => setFormData(prev => ({...prev, why: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe why you want to save this and what you hope to learn..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Tags <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="javascript, learning, tutorial"
              />
              <p className="text-xs text-gray-500 mt-2">Separate multiple tags with commas</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
              >
                {isSubmitting ? 'Creating...' : 'Save Content'}
            
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;