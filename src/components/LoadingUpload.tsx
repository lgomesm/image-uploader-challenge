export function LoadingUpload() {
    return (
      <>
        <h3 className="mb-10 text-xl text-gray-500">Uploading...</h3>
        <div className="w-full h-2 bg-gray-100 rounded-lg overflow-hidden">
          <div className="h-2 w-full animate-moveHorizontal">
            <div className="w-24 h-2 bg-primary rounded-lg"></div>
          </div>
        </div>
      </>
    );
  }