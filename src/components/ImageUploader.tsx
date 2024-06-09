import Image from "next/image"
import backgroundImage from "@/assets/image.svg";

interface ImageUploaderProps {
    setIsLoading: (value: boolean) => void
    setImageUrl: (value: string) => void
}

export function ImageUploader({ setIsLoading, setImageUrl }: ImageUploaderProps) {
    return (
      <div className="flex flex-col items-center justify-start gap-5">
        <h1 className="text-xl text-gray-500">Upload your image</h1>
        <p className="text-xs text-gray-400">File should be Jpeg, Png,...</p>
  
        <div className="flex flex-col items-center justify-center w-full gap-10 p-10 border-2 border-dashed border-light-blue rounded-xl bg-gray-50">
          <Image
            src={backgroundImage}
            alt="Default image"
            width={115}
            height={100}
            priority
          />
          <h3 className="text-sm text-gray-300">Drag & Drop your image here</h3>
        </div>
  
        <p className="text-sm text-gray-200">Or</p>
  
        <div className="text-xs text-white bg-primary rounded-lg hover:brightness-90">
          <label className="block py-3 px-5 cursor-pointer" htmlFor="fileInput">
            Choose a file
          </label>
          <input type="file" className="hidden" id="fileInput" />
        </div>
      </div>
    );
  }