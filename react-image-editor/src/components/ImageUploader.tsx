import React, { useState, useRef, useEffect } from 'react';
import { Upload, Button, Image, message, Slider, Select, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { Step } = Steps;

const ImageUploader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [preprocessedImageUrl, setPreprocessedImageUrl] = useState<string | null>(null);
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [flip, setFlip] = useState<string>('none');
  const [background, setBackground] = useState<string>('none');
  const [gradient, setGradient] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePreprocess = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/uploads/preprocess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setPreprocessedImageUrl(url);
      setCurrentStep(1);
      message.success('Image preprocessed successfully');
    } catch {
      message.error('Failed to preprocess image');
    }
  };

  const applyCanvasOperations = () => {
    if (!canvasRef.current || !preprocessedImageUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new window.Image();
    image.src = preprocessedImageUrl;
    image.onload = () => {
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (background !== 'none') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (flip === 'horizontal') {
        ctx.scale(-1, 1);
      } else if (flip === 'vertical') {
        ctx.scale(1, -1);
      }
      ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();

      if (gradient > 0) {
        ctx.globalAlpha = gradient / 100;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }

      setCanvasUrl(canvas.toDataURL());
    };
  };

  useEffect(() => {
    applyCanvasOperations();
  }, [rotation, scale, flip, background, gradient, preprocessedImageUrl]);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-4">
      <Steps current={currentStep}>
        <Step title="Upload and Preprocess" />
        <Step title="Crop" />
        <Step title="Edit" />
      </Steps>
      {currentStep === 0 && (
        <Upload
          customRequest={({ file }) => handlePreprocess(file as File)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload and Preprocess Image</Button>
        </Upload>
      )}
      {currentStep === 1 && preprocessedImageUrl && (
        <div className="mt-4">
          <Image src={preprocessedImageUrl} alt="Preprocessed Image" />
          <div className="mt-4">
            <h3>Crop</h3>
            <Slider
              min={0}
              max={360}
              value={rotation}
              onChange={setRotation}
              tooltipVisible
              tipFormatter={(value) => `${value}°`}
            />
            <Slider
              min={0.1}
              max={3}
              step={0.1}
              value={scale}
              onChange={setScale}
              tooltipVisible
              tipFormatter={(value) => `${value}x`}
            />
            <Select value={flip} onChange={setFlip}>
              <Option value="none">None</Option>
              <Option value="horizontal">Horizontal</Option>
              <Option value="vertical">Vertical</Option>
            </Select>
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
            <Button onClick={prevStep} className="ml-2">
              Previous
            </Button>
          </div>
        </div>
      )}
      {currentStep === 2 && canvasUrl && (
        <div className="mt-4">
          <Image src={canvasUrl} alt="Edited Image" />
          <div className="mt-4">
            <h3>Edit</h3>
            <Select value={background} onChange={setBackground}>
              <Option value="none">None</Option>
              <Option value="white">White</Option>
              <Option value="black">Black</Option>
            </Select>
            <Slider
              min={0}
              max={100}
              value={gradient}
              onChange={setGradient}
              tooltipVisible
              tipFormatter={(value) => `${value}%`}
            />
            <Button onClick={prevStep} className="ml-2">
              Previous
            </Button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageUploader;