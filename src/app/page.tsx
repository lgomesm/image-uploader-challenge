'use client'
import { ImageUploader } from '@/components/ImageUploader';
import { LoadingUpload } from '@/components/LoadingUpload';
import { Toast } from '@/components/Toast';
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [isLoading, setisLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <Toast />
      <main className="bg-background w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-[420px] bg-white rounded-xl drop-shadow-md p-8">
          <ImageUploader />
        </div>
      </main>
    </>
  )
}