import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, Space, message, Spin } from 'antd';
import { CameraOutlined, SyncOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { ia_recetas } from '@/src/config';

const RecipeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null); // Almacena la imagen en Base64 para previsualización
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Iniciar la cámara al montar el componente
  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Limpiar el stream al desmontar
  }, []);

  const startCamera = async () => {
    try {
      setPhoto(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }, // Prioriza la cámara trasera
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setCameraReady(true);
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      message.error("No se pudo acceder a la cámara. Revisa los permisos.");
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

    // Ajustar dimensiones del canvas al tamaño real del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar el cuadro actual en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir a formato base64 para previsualización inmediata
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setPhoto(imageDataUrl);

    // Apagar la cámara temporalmente mientras se revisa la foto
    stopCamera();
  };

const sendToServer = async () => {
  if (!photo) return;
  setLoading(true);

  try {
    // En lugar de convertir a Blob y usar FormData, enviamos el string Base64 directamente
    const serverResponse = await fetch(ia_recetas, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': 'true',
        'Bypass-Tunnel-Reminder': 'true' // Obligatorio para el túnel de VS Code
      },
      body: JSON.stringify({
        imagen_base64: photo // Aquí viaja el string de la foto
      }),
    });

    const textoCrudo = await serverResponse.text();

   // alert(textoCrudo)
    
    if (!serverResponse.ok) {
      console.error("Respuesta de error del servidor:", textoCrudo);
      throw new Error('Error en el servidor');
    }

    const data = JSON.parse(textoCrudo);
    message.success('¡Receta procesada con éxito!');
    alert(JSON.stringify(data));

  } catch (error) {
    console.error(error);
    message.error('Hubo un error al enviar la imagen: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  const retakePhoto = () => {
    startCamera();
  };

  return (
    <Card
      title="Escanear Receta de Graduación"
      style={{ maxWidth: 500, margin: '20px auto', textAlign: 'center' }}
    >
      <div style={{ position: 'relative', width: '100%', minHeight: 300, background: '#f0f2f5', marginBottom: 20, borderRadius: 8, overflow: 'hidden' }}>

        {/* Renderizado de la Cámara en vivo */}
        {!photo && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', display: cameraReady ? 'block' : 'none', objectFit: 'cover' }}
          />
        )}

        {/* Mensaje de carga mientras la cámara inicia */}
        {!photo && !cameraReady && (
          <div style={{ padding: '100px 0' }}>
            <Spin tip="Iniciando cámara..." />
          </div>
        )}

        {/* Previsualización de la foto capturada */}
        {photo && (
          <img
            src={photo}
            alt="Receta capturada"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}

        {/* Canvas oculto para el procesado de la imagen */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Controles de Acción */}
      <Space size="middle">
        {!photo ? (
          <Button
            type="primary"
            icon={<CameraOutlined />}
            size="large"
            onClick={takePicture}
            disabled={!cameraReady}
          >
            Capturar Receta
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
              Repetir
            </Button>
            <Button
              type="primary"
              icon={loading ? <SyncOutlined spin /> : <UploadOutlined />}
              size="large"
              onClick={sendToServer}
              loading={loading}
            >
              Analizar Receta
            </Button>
          </>
        )}
      </Space>
    </Card>
  );
};

export default RecipeScanner;
