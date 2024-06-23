import Image from "next/image"
import { MdCheckCircle } from "react-icons/md"
import CopyLink from "./CopyLink"

interface ImageDisplayProps {
    imageUrl: string
}

export function ImageDisplay({ imageUrl }: ImageDisplayProps) {
    return (
        <div className="flex flex-col gap-5 items-center">
            <MdCheckCircle size={43} className="text-green-500" />

            <Image 
                src={imageUrl}
                className="rounded-xl"
                alt="Uploaded image"
                width={500}
                height={300}
                loading="lazy"
            />

            <CopyLink imageUrl={imageUrl} />
        </div>
    )
}