import React, { useState } from 'react';
import {
  FiShare2,
  FiLink,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiMessageCircle,
  FiMail,
  FiX,
} from 'react-icons/fi';
import { Button, Badge } from '../index';

interface ShareDropdownProps {
  course: {
    title: string;
    description?: string;
    image?: string;
  };
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Check out "${course.title}" on Mentorly!`;

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: FiLink,
      color: 'text-gray-600 hover:text-indigo-600',
      bgColor: 'hover:bg-indigo-50',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          setIsOpen(false);
        } catch (error) {
          console.error('Failed to copy:', error);
        }
      },
    },
    {
      name: 'Twitter',
      icon: FiTwitter,
      color: 'text-blue-400 hover:text-blue-500',
      bgColor: 'hover:bg-blue-50',
      onClick: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setIsOpen(false);
      },
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setIsOpen(false);
      },
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'hover:bg-blue-50',
      onClick: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        setIsOpen(false);
      },
    },
    {
      name: 'WhatsApp',
      icon: FiMessageCircle,
      color: 'text-green-500 hover:text-green-600',
      bgColor: 'hover:bg-green-50',
      onClick: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        window.open(url, '_blank');
        setIsOpen(false);
      },
    },
    {
      name: 'Email',
      icon: FiMail,
      color: 'text-gray-600 hover:text-red-500',
      bgColor: 'hover:bg-red-50',
      onClick: () => {
        const subject = `Check out: ${course.title}`;
        const body = `${shareText}\n\n${shareUrl}`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
        setIsOpen(false);
      },
    },
  ];

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: shareUrl,
        });
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <Button
        variant="outline"
        size="small"
        onClick={handleNativeShare}
        className="flex items-center gap-2 group relative"
      >
        <FiShare2 className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span>Share</span>
        {isCopied && (
          <Badge variant="success" size="sm" className="absolute -top-2 -right-2">
            Copied!
          </Badge>
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-12 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Share this course</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map(option => (
                <button
                  key={option.name}
                  onClick={option.onClick}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${option.bgColor} hover:scale-105 hover:shadow-md group`}
                >
                  <option.icon
                    className={`w-5 h-5 mb-2 transition-transform group-hover:scale-110 ${option.color}`}
                  />
                  <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Copy Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 truncate"
                />
                <Button
                  variant="primary"
                  size="small"
                  onClick={shareOptions[0].onClick}
                  className="whitespace-nowrap"
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareDropdown;
