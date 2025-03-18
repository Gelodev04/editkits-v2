export default function Loading() {
  return (
    <div className="p-2 animate-pulse">
      <div className="bg-gray-300 h-10 w-full rounded mb-2" />

      <div className="border border-gray-200 rounded-lg">
        <div className="bg-gray-200 h-10 w-full rounded-t-lg mb-1" />

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-3 px-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
          >
            <div className="w-20 h-10 bg-gray-300 rounded" />
            <div className="w-32 h-6 bg-gray-300 rounded" />
            <div className="w-40 h-6 bg-gray-300 rounded" />
            <div className="w-24 h-6 bg-gray-300 rounded" />
            <div className="w-16 h-6 bg-gray-300 rounded" />
            <div className="w-20 h-6 bg-gray-300 rounded" />
            <div className="w-24 h-6 bg-gray-300 rounded" />
            <div className="w-20 h-6 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
