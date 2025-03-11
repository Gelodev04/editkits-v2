export default function BlogLoading() {
  return (
    <div className="max-w-[1367px] mx-auto animate-pulse">
      {/* Blog Title Skeleton */}
      <div className="h-16 w-3/4 bg-gray-300 rounded mx-auto mt-[59px] mb-[27px]" />

      {/* Blog Description Skeleton */}
      <div className="h-6 w-[1032px] bg-gray-300 rounded mx-auto mb-[55px] px-[168px]" />

      {/* Blog Grid Skeleton */}
      <div className="grid grid-cols-12 gap-[34px]">
        {[...Array(3).keys()].map((i) => (
          <div key={i} className="col-span-4">
            {/* Blog Card Skeleton */}
            <div className="w-[433px] border-[1px] border-gray-300 border-opacity-65 pt-[22px] px-[22px] rounded-[4px] max-h-[478px]">
              {/* Image Skeleton */}
              <div className="w-[390px] h-[290px] bg-gray-300 rounded-[4px]" />

              {/* Title Skeleton */}
              <div className="h-6 w-3/4 bg-gray-300 rounded mt-[12px]" />

              {/* Date and Category Skeleton */}
              <div className="flex items-center gap-[4px] pt-[6.3px] pb-[20px]">
                <div className="h-4 w-4 bg-gray-300 rounded-full" />
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-300 rounded ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="h-10 w-48 bg-gray-300 rounded-lg" />
      </div>
    </div>
  )
}