const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-[#171720] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#333333] rounded-full animate-spin border-t-[#43ccf7] mx-auto mb-4"></div>
          <div className="w-8 h-8 border-2 border-[#7209b7] rounded-full animate-spin border-t-transparent absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <p className="text-[#d9ecff] text-lg">{message}</p>
        <p className="text-[#d9ecff]/60 text-sm mt-2">This won't take long...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner