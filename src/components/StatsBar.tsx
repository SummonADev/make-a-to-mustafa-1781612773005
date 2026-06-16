import clsx from 'clsx';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  total: number;
};

export default function StatsBar({ activeCount, completedCount, total }: StatsBarProps) {
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>
          <span className="font-semibold text-brand">{activeCount}</span> remaining
        </span>
        <span>
          <span className={clsx('font-semibold', completedCount > 0 ? 'text-green-500' : 'text-gray-400')}>
            {completedCount}
          </span>{' '}
          completed
        </span>
        <span>
          <span className="font-semibold text-gray-700">{percent}%</span> done
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-brand h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
