'use client'
import { ImageDisplay } from '@/components/ImageDisplay';
import { ImageUploader } from '@/components/ImageUploader';
import { LoadingUpload } from '@/components/LoadingUpload';
import { Toast } from '@/components/Toast';
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <Toast />
      <main className="bg-background w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          {isLoading ? (
            <LoadingUpload/>
          ) : imageUrl ? (
            <ImageDisplay imageUrl={imageUrl} />
          ) : (
          <ImageUploader setIsLoading={setIsLoading} setImageUrl={setImageUrl} />
          )}
          </div>
      </main>
    </>
  )
}
