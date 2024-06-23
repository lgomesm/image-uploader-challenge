import { useState } from "react";
import { toast } from "react-toastify";

interface CopyLinkProps {
    imageUrl: string;
}

const CopyLink: React.FC<CopyLinkProps> = ({ imageUrl }) => {
    const [copied, setCopied] = useState(false)

    const copyLinkToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(imageUrl)
            setCopied(true)
            toast.success("Image copied to clipboard!")
        } catch(error) {
            console.error(error)
            toast.error("Failed to copy image to clipboard!")
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <div className="text-gray-500 px-3 text-xs truncate w-4/5">
                {imageUrl}
            </div>
            <button 
                onClick={copyLinkToClipboard}
                className={`px-4 py-2 ${copied? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
            >
                {copied ? "Copied!" : "Copy Link"}
            </button>
            {copied && <span className="text-sm font-semibold">Copied to clipboard!</span>}
        </div>
    )
}

export default CopyLink