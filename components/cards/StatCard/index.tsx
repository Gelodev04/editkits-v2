type StatData = {
  label: string;
  data: any;
}

export default function StatCard(props: any) {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Overview
            </h3>
          </div>
        </div>
        <div
          className="grid rounded-2xl border border-gray-200 bg-white sm:grid-cols-2 xl:grid-cols-2 dark:border-gray-800 dark:bg-gray-900">
          {props.stat.map(((s: StatData) => (

            <div className="border-b border-gray-200 px-6 py-5 sm:border-r xl:border-b-0 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {s.label}
              </span>
              <div className="mt-2 flex items-end gap-3">
                <h4 className="text-title-xs sm:text-title-sm font-bold text-gray-800 dark:text-white/90">
                  {s.data[0].value}
                </h4>
              </div>
            </div>
          )))}
        </div>
      </div>
    </>
  )
}