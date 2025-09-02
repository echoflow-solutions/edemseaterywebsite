'use client';

import { X, Download, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuPDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuPDFViewer = ({ isOpen, onClose }: MenuPDFViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Edems-Eatery-Menu-2025.pdf';
    link.download = 'Edems-Eatery-Menu-2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Full Screen Container */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          style={{
            position: 'relative',
            width: isFullscreen ? 'calc(100vw - 32px)' : '90vw',
            maxWidth: isFullscreen ? 'none' : '1200px',
            height: isFullscreen ? 'calc(100vh - 32px)' : '85vh',
            maxHeight: isFullscreen ? 'none' : '800px',
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Header */}
          <div 
            style={{
              backgroundColor: '#3E2723',
              color: 'white',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
              Edem&apos;s Eatery Full Menu
            </h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={handleDownload}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: 'white',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Download Menu PDF"
              >
                <Download size={20} />
              </button>
              <button
                onClick={toggleFullscreen}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: 'white',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  color: 'white',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div 
            style={{
              width: '100%',
              height: 'calc(100% - 65px)',
              backgroundColor: '#f3f4f6',
              position: 'relative',
            }}
          >
            <iframe
              src="/Edems-Eatery-Menu-2025.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Edem&apos;s Eatery Menu PDF"
            />
            
            {/* Mobile Download Button */}
            <div 
              className="md:hidden"
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
              }}
            >
              <button
                onClick={handleDownload}
                style={{
                  backgroundColor: '#FFC107',
                  color: '#3E2723',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Download size={20} />
                Download
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MenuPDFViewer;