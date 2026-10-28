import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, Space, message, Spin } from 'antd';
import { CameraOutlined, SyncOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const RecipeScannerV2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      setPhoto(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 }, // High resolution target for text legibility
          height: { ideal: 1080 }
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setCameraReady(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      message.error("Could not access the camera. Please check your permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraReady(false);
  };

  const takePicture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9); // 90% quality compression
    setPhoto(imageDataUrl);
    stopCamera();
  };

  const sendToServer = async () => {
    if (!photo) return;
    setLoading(true);

    try {
      // Convert Base64 dataURL back into a raw Binary Blob
      const response = await fetch(photo);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('recipe_image', blob, 'prescription.jpg');

      // Update URL route to match your target route
      const serverResponse = await fetch('/api/upload-recipe', {
        method: 'POST',
        body: formData,
      });

      if (!serverResponse.ok) throw new Error('Server processing failed');

      const data = await serverResponse.json();
      message.success('Prescription image processed successfully!');
      console.log('Graduation Data:', data);

    } catch (error) {
      console.error(error);
      message.error('Failed to analyze the image on the server.');
    } finally {
      setLoading(false);
    }
  };

  const retakePhoto = () => {
    startCamera();
  };

  return (
    <Card 
      title="Scan Rx Prescription" 
      style={{ maxWidth: 500, margin: '20px auto', textAlign: 'center' }}
    >
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '75%', // 4:3 Aspect ratio container
        background: '#000', 
        marginBottom: 20, 
        borderRadius: 8, 
        overflow: 'hidden' 
      }}>
        
        {/* Live Camera Feed */}
        {!photo && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ 
              position: 'absolute', top: 0, left: 0, 
              width: '100%', height: '100%', 
              display: cameraReady ? 'block' : 'none', 
              objectFit: 'cover' 
            }}
          />
        )}

        {/* Visual Guide Box Overlay (Only visible when active scanning) */}
        {!photo && cameraReady && (
          <div style={{
            position: 'absolute',
            top: '12.5%',
            left: '10%',
            width: '80%',
            height: '75%',
            border: '3px dashed #52c41a', // Ant Design Success green
            borderRadius: '12px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)', // Dims the outside boundaries
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ 
              color: '#52c41a', 
              background: 'rgba(0,0,0,0.6)', 
              padding: '4px 10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ALIGN PRESCRIPTION HERE
            </span>
          </div>
        )}

        {/* Loading Spinner */}
        {!photo && !cameraReady && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spin tip="Initializing optical camera..." />
          </div>
        )}

        {/* Captured Preview */}
        {photo && (
          <img 
            src={photo} 
            alt="Captured prescription" 
            style={{ 
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', 
              objectFit: 'contain',
              background: '#141414'
            }}
          />
        )}
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Action Controls */}
      <Space size="middle">
        {!photo ? (
          <Button 
            type="primary" 
            icon={<CameraOutlined />} 
            size="large" 
            onClick={takePicture}
            disabled={!cameraReady}
          >
            Capture Document
          </Button>
        ) : (
          <>
            <Button 
              icon={<DeleteOutlined />} 
              danger 
              size="large" 
              onClick={retakePhoto}
              disabled={loading}
            >
              Retake
            </Button>
            <Button 
              type="primary" 
              icon={loading ? <SyncOutlined spin /> : <UploadOutlined />} 
              size="large" 
              onClick={sendToServer}
              loading={loading}
            >
              Analyze Metrics
            </Button>
          </>
        )}
      </Space>
    </Card>
  );
};

export default RecipeScannerV2;
