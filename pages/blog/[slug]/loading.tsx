export default function ArticleLoading() {
  return (
    <div className="max-w-[1280px] mx-auto p-6 animate-pulse">
      <div className="h-10 w-3/4 bg-gray-300 rounded mb-8" />
      <div className="w-full h-96 bg-gray-300 rounded-md mb-8" />
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-10 w-10 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-9/12 bg-gray-300 rounded" />
        <div className="h-5 w-full bg-gray-300 rounded" />
        <div className="h-5 w-8/12 bg-gray-300 rounded" />
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-5 w-full bg-gray-300 rounded" />
        <div className="h-5 w-11/12 bg-gray-300 rounded" />
        <div className="h-5 w-10/12 bg-gray-300 rounded" />
        <div className="h-5 w-9/12 bg-gray-300 rounded" />
      </div>

      <div className="mt-8 h-6 w-1/3 bg-gray-300 rounded mb-4" />

      <ul className="mt-4 space-y-3">
        {[...Array(4).keys()].map((i) => (
          <li key={i} className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
            <div className="h-5 w-5/6 bg-gray-300 rounded" />
          </li>
        ))}
      </ul>

      <div className="mt-8 border-l-4 border-gray-300 pl-4">
        <div className="h-5 w-full bg-gray-300 rounded" />
        <div className="h-5 w-11/12 bg-gray-300 rounded mt-2" />
      </div>

      <div className="mt-8 w-full h-64 bg-gray-300 rounded-md" />

      <div className="mt-8 space-y-4">
        <div className="h-5 w-full bg-gray-300 rounded" />
        <div className="h-5 w-11/12 bg-gray-300 rounded" />
        <div className="h-5 w-10/12 bg-gray-300 rounded" />
        <div className="h-5 w-9/12 bg-gray-300 rounded" />
      </div>

      {/* Call-to-Action Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="h-12 w-48 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
