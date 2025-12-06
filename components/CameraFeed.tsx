import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

interface CameraFeedProps {
  isActive: boolean;
  onFrameCapture: (base64: string) => void;
  intervalMs: number;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ isActive, onFrameCapture, intervalMs }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setStreamError(null);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setStreamError("Camera access required for safety monitoring.");
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      // Stop stream if monitoring paused
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
    return () => {
       const stream = videoRef.current?.srcObject as MediaStream;
       stream?.getTracks().forEach(track => track.stop());
    };
  }, [isActive, startCamera]);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setInterval> to avoid NodeJS.Timeout error in browser environments
    let intervalId: ReturnType<typeof setInterval>;

    if (isActive && hasPermission) {
      intervalId = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              // Compress slightly to save bandwidth/processing time
              const base64 = canvas.toDataURL('image/jpeg', 0.6).split(',')[1];
              onFrameCapture(base64);
            }
          }
        }
      }, intervalMs);
    }

    return () => clearInterval(intervalId);
  }, [isActive, hasPermission, intervalMs, onFrameCapture]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-inner border border-gray-800">
      {streamError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gray-900 text-white">
          <CameraOff className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-xl font-bold text-red-400">{streamError}</p>
          <button 
            onClick={startCamera}
            className="mt-4 px-6 py-2 bg-blue-600 rounded-lg font-bold active:scale-95 transition-transform"
          >
            Retry Permission
          </button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          {/* Hidden canvas for capturing frames */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Overlay elements for "HUD" feel */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-mono text-white uppercase">{isActive ? 'LIVE MONITORING' : 'PAUSED'}</span>
          </div>
          
          <div className="absolute bottom-4 left-4 text-xs font-mono text-green-400 opacity-70">
            SafeSight SYSTEMS v1.0
          </div>
        </>
      )}
    </div>
  );
};

export default CameraFeed;