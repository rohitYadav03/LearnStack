import React, {  useContext } from 'react';
import { X, Share2, Globe, Eye, Lock, Copy, CheckCircle } from 'lucide-react';
import { useShare } from '../../hooks/useShare';
import { authContext } from '../../context/authContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {

  const {
    isLoadingShare,
    copySuccess,
    enableSharing,
    disableSharing,
    copyShareLink
  } = useShare();

  const {user} = useContext(authContext)

  const handleEnableSharing = async () => {
    const result = await enableSharing();
    if (!result.success && result.error) {
      alert(result.error);
    }
  };

  const handleDisableSharing = async () => {
    const result = await disableSharing();
    if (!result.success && result.error) {
      alert(result.error);
    }
  };

  const handleCopyLink = async () => {
    const result = await copyShareLink();
    if (!result.success) {
      alert('Failed to copy link');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
       
        <div className="p-6">
{/* header and button for close  */}
          <div className="flex justify-between items-center mb-6">
           
            <div>
              <h3 className="text-xl font-bold text-gray-900">Share Your Brain</h3>
              <p className="text-gray-600 text-sm mt-1">Let others see your learning collection</p>
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>


          {! user!.isShared ? (

            <div className="text-center">
            
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="text-blue-600" size={32} />
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">Share Your Learning Journey</h4>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Create a public link to share your content collection with friends, colleagues, or the community. 
                Others will be able to see what you're learning and get inspired!
              </p>
              
              {/* div for showing the 3 points after the p  */}
              <div className="space-y-3 mb-6">
              
                <div className="flex items-center text-sm text-gray-600">
                  <Eye size={16} className="text-green-500 mr-3" />
                  <span>Others can view your content and learning goals</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Lock size={16} className="text-blue-500 mr-3" />
                  <span>Your personal data remains private</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Globe size={16} className="text-purple-500 mr-3" />
                  <span>Get a unique shareable link</span>
                </div>
              </div>

              <button
                onClick={handleEnableSharing}
                disabled={isLoadingShare}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium disabled:opacity-50 transition-all"
              >
                {isLoadingShare ? 'Creating Link...' : 'Enable Sharing'}
              </button>
            </div>
          )
           : 
           
           (
            <div className="text-center">
             
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ">
                <Globe className="text-green-600" size={32} />
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">Sharing is Active!</h4>
              <p className="text-gray-600 text-sm mb-6">
                Your brain is now public. Anyone with the link can view your learning collection.
              </p>

              <div className="bg-gray-100 p-4 rounded-xl mb-6">

                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Your Share Link
                </label>
                
                <div className="flex items-center gap-2">

                  <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 font-mono break-all">
                    {`${window.location.origin}/shared/${user!.shareLink}`}
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className={`p-2 rounded-lg transition-all ${
                      copySuccess 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                    title="Copy link"
                  >
                    {copySuccess ? (
                      <CheckCircle size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>

                </div>
                {copySuccess && (
                  <p className="text-green-600 text-xs mt-2">✓ Link copied to clipboard!</p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-4 rounded-lg font-medium transition-colors border border-blue-200"
                >
                  Copy Share Link
                </button>
                
                <button
                  onClick={handleDisableSharing}
                  disabled={isLoadingShare}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2.5 px-4 rounded-lg font-medium transition-colors border border-red-200 disabled:opacity-50"
                >
                  {isLoadingShare ? 'Disabling...' : 'Disable Sharing'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ShareModal;