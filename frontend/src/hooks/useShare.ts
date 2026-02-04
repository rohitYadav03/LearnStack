
import { useContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { authContext } from '../context/authContext';

export const useShare = () => {
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { user, login } = useContext(authContext);

  const enableSharing = async () => {
    setIsLoadingShare(true);
    try {
      const response = await axiosInstance.post('/share/enable');
      login({
        ...user!,
        isShared: response.data.data.isShared,
        shareLink: response.data.data.shareLink,
      });
      return { success: true };
    } catch (error) {
      console.error("Error enabling sharing:", error);
      return { success: false, error: "Failed to enable sharing" };
    } finally {
      setIsLoadingShare(false);
    }
  };

  const disableSharing = async () => {
    setIsLoadingShare(true);
    try {
      await axiosInstance.post('/share/disable');
      login({
        ...user!,
        isShared: false,
        shareLink: null,
      });
      return { success: true };
    } catch (error) {
      console.error("Error disabling sharing:", error);
      return { success: false, error: "Failed to disable sharing" };
    } finally {
      setIsLoadingShare(false);
    }
  };

  const copyShareLink = async () => {
    if (user?.shareLink) {
      const shareUrl = `${window.location.origin}/shared/${user.shareLink}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (error) {
        // fallback
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      return { success: true };
    }
    return { success: false };
  };

  return {
    isLoadingShare,
    copySuccess,
    enableSharing,
    disableSharing,
    copyShareLink,
  };
};
