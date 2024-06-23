import Image from "next/image"
import backgroundImage from "@/assets/image.svg";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ImageUploaderProps {
    setIsLoading: (value: boolean) => void
    setImageUrl: (value: string) => void
}

export function ImageUploader({ setIsLoading, setImageUrl }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  function imageTypeValidator(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return false
    }

    const acceptedImageTypes = [".jpeg", ".jpg", ".png"]

    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (fileExtension) {
      if (!acceptedImageTypes.includes(fileExtension)) {
        toast.error("Unsupported file type. Please select an image file")
        return false
      }
    }
    return true
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(true)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setIsDragOver(false)

    if (!file) {
      toast.error("No file selected. Please drag and drop an image file")
      return
    }
    
    try {
      await handleSupabaseUpload(file)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  async function performUpload(file: File) {
    setIsLoading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const { imageUrl, error } = await response.json()

    if (error) {
      throw new Error(error)
    }

    return imageUrl
  }

  async function handleSupabaseUpload(file: File) {
    try {
      if (imageTypeValidator(file)) {
        const imageUrl = await performUpload(file)
        setImageUrl(imageUrl)
        toast.success('Image uploaded successfully')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while uploading the image')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      try {
        await handleSupabaseUpload(file)
        toast.success('File uploaded successfully')
      } catch(error) {
        console.error(error)
        toast.error('An error occurred while uploading the file')
      }
    }
  }

    return (
      <div className="flex flex-col items-center justify-start gap-5">
        <h1 className="text-xl text-gray-600 font-medium">Upload your image</h1>
        <p className="text-xs text-gray-400 font-medium">File should be Jpeg, Png,...</p>
  
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`bg-gray-50 ${isDragOver ? 'border-green' : 'border-blue-200'} border-2 border-dashed rounded-xl p-10 flex items-center flex-col w-full justify-center gap-10`}
        >
          <Image
            src={backgroundImage}
            alt="Default image"
            width={115}
            height={100}
            priority
          />
          <h3 className="text-sm text-gray-300 font-medium">Drag & Drop your image here</h3>
        </div>
  
        <p className="text-sm text-gray-200 font-medium">Or</p>
  
        <div className="text-xs text-white bg-primary rounded-lg hover:brightness-90">
          <button 
            onClick={handleFileInput}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Choose a file
          </button>
        </div>
      </div>
    );
  }