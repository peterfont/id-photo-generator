'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Check, Maximize2, RotateCcw, FlipHorizontal2, Crop, Sun, Contrast, Palette, Type, Pencil } from 'lucide-react'

interface ImageEditorProps {
  image: File
  onSave: (editedImage: Blob) => void
  onCancel: () => void
}

export default function ImageEditor({ image, onSave, onCancel }: ImageEditorProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [cropping, setCropping] = useState(false)
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 })
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [filter, setFilter] = useState('none')
  const [text, setText] = useState('')
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 })
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawColor, setDrawColor] = useState('#000000')
  const [drawSize, setDrawSize] = useState(5)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const imageUrl = URL.createObjectURL(image)

  useEffect(() => {
    const canvas = drawingCanvasRef.current
    if (canvas && containerRef.current) {
      canvas.width = containerRef.current.offsetWidth
      canvas.height = containerRef.current.offsetHeight
    }
  }, [])

  const handleZoom = (value: number[]) => {
    setScale(value[0])
  }

  const handleCropStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCropStart({ x, y })
    setCropArea({ x, y, width: 0, height: 0 })
    setCropping(true)
  }

  const handleCropMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cropping) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const width = x - cropStart.x
    const height = y - cropStart.y
    setCropArea({
      x: width > 0 ? cropStart.x : x,
      y: height > 0 ? cropStart.y : y,
      width: Math.abs(width),
      height: Math.abs(height)
    })
  }

  const handleCropEnd = () => {
    setCropping(false)
  }

  const confirmCrop = () => {
    // Apply the crop
    applyEdits()
    setCropArea({ x: 0, y: 0, width: 0, height: 0 })
  }

  const cancelCrop = () => {
    setCropArea({ x: 0, y: 0, width: 0, height: 0 })
  }

  const handleDrawStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = drawingCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.beginPath()
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      }
    }
  }

  const handleDrawMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = drawingCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        ctx.strokeStyle = drawColor
        ctx.lineWidth = drawSize
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }
  }

  const handleDrawEnd = () => {
    setIsDrawing(false)
  }

  const applyEdits = useCallback(() => {
    if (!imageRef.current || !canvasRef.current || !drawingCanvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imageRef.current
    const container = containerRef.current

    // Set canvas size to the cropped area or full image size
    canvas.width = cropArea.width || container.offsetWidth
    canvas.height = cropArea.height || container.offsetHeight

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) ${filter !== 'none' ? filter : ''}`

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipped ? -scale : scale, scale)

    // Calculate the source and destination rectangles for drawImage
    const sourceX = cropArea.width ? cropArea.x / scale : 0
    const sourceY = cropArea.height ? cropArea.y / scale : 0
    const sourceWidth = cropArea.width ? cropArea.width / scale : img.width
    const sourceHeight = cropArea.height ? cropArea.height / scale : img.height

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    )

    ctx.restore()

    // Draw text
    ctx.font = '20px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(text, textPosition.x - cropArea.x, textPosition.y - cropArea.y)

    // Draw from drawing canvas
    const drawingCanvas = drawingCanvasRef.current
    ctx.drawImage(
      drawingCanvas, 
      cropArea.x, 
      cropArea.y, 
      cropArea.width || drawingCanvas.width, 
      cropArea.height || drawingCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    canvas.toBlob(blob => {
      if (blob) onSave(blob)
    })
  }, [cropArea, rotation, flipped, scale, brightness, contrast, filter, text, textPosition, onSave])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
          <span className="sr-only">取消</span>
        </Button>
        <h1 className="text-lg font-semibold">编辑图片</h1>
        <Button variant="ghost" size="icon" onClick={applyEdits}>
          <Check className="h-4 w-4" />
          <span className="sr-only">保存</span>
        </Button>
      </div>

      <div 
        ref={containerRef}
        className="flex-grow relative overflow-hidden"
        onMouseDown={handleCropStart}
        onMouseMove={handleCropMove}
        onMouseUp={handleCropEnd}
        onMouseLeave={handleCropEnd}
      >
        <Image
          ref={imageRef}
          src={imageUrl}
          alt="可编辑的图片"
          layout="fill"
          objectFit="contain"
          className={`transition-transform duration-300 ease-in-out ${
            flipped ? 'scale-x-[-1]' : ''
          }`}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            filter: `brightness(${brightness}%) contrast(${contrast}%) ${filter !== 'none' ? filter : ''}`,
          }}
        />
        {cropArea.width > 0 && cropArea.height > 0 && (
          <div 
            className="absolute border-2 border-white bg-black bg-opacity-40"
            style={{
              left: `${cropArea.x}px`,
              top: `${cropArea.y}px`,
              width: `${cropArea.width}px`,
              height: `${cropArea.height}px`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={confirmCrop} className="mr-2">确认裁剪</Button>
              <Button onClick={cancelCrop} variant="secondary">取消裁剪</Button>
            </div>
          </div>
        )}
        <canvas 
          ref={drawingCanvasRef}
          className="absolute top-0 left-0 w-full h-full"
          onMouseDown={handleDrawStart}
          onMouseMove={handleDrawMove}
          onMouseUp={handleDrawEnd}
          onMouseLeave={handleDrawEnd}
        />
        <div 
          className="absolute"
          style={{ left: `${textPosition.x}px`, top: `${textPosition.y}px` }}
        >
          {text}
        </div>
      </div>

      <div className="p-4 bg-white">
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">基本</TabsTrigger>
            <TabsTrigger value="adjust">调整</TabsTrigger>
            <TabsTrigger value="filter">滤镜</TabsTrigger>
            <TabsTrigger value="text">文字</TabsTrigger>
            <TabsTrigger value="draw">绘画</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">缩放</span>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={[scale]}
                onValueChange={handleZoom}
                className="w-2/3"
              />
            </div>
            <div className="flex justify-around">
              <Button variant="outline" size="sm" onClick={() => setRotation(prev => (prev + 90) % 360)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                旋转
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFlipped(prev => !prev)}>
                <FlipHorizontal2 className="h-4 w-4 mr-2" />
                翻转
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCropping(true)}>
                <Crop className="h-4 w-4 mr-2" />
                裁剪
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="adjust" className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">亮度</span>
              <Slider
                min={0}
                max={200}
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                className="w-2/3"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">对比度</span>
              <Slider
                min={0}
                max={200}
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
                className="w-2/3"
              />
            </div>
          </TabsContent>
          <TabsContent value="filter" className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => setFilter('none')}>
              无
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('grayscale(100%)')}>
              黑白
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('sepia(100%)')}>
              复古
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('invert(100%)')}>
              反色
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('blur(5px)')}>
              模糊
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFilter('saturate(200%)')}>
              饱和
            </Button>
          </TabsContent>
          <TabsContent value="text" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="text-input">文字</Label>
              <Input 
                id="text-input"
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="输入文字"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="text-x">X坐标</Label>
              <Input 
                id="text-x"
                type="number" 
                value={textPosition.x} 
                onChange={(e) => setTextPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="text-y">Y坐标</Label>
              <Input 
                id="text-y"
                type="number" 
                value={textPosition.y} 
                onChange={(e) => setTextPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
              />
            </div>
          </TabsContent>
          <TabsContent value="draw" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="draw-color">颜色</Label>
              <Input 
                id="draw-color"
                type="color" 
                value={drawColor} 
                onChange={(e) => setDrawColor(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="draw-size">大小</Label>
              <Slider
                id="draw-size"
                min={1}
                max={20}
                value={[drawSize]}
                onValueChange={(value) => setDrawSize(value[0])}
                className="w-2/3"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

