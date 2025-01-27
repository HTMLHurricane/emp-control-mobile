import { memo } from 'react';

export const SexChart = memo(({ count }: { count: [number, number] }) => {
    return (
        <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex w-full justify-between items-center gap-6">
                <div className="flex flex-col items-center justify-center w-full bg-cyan-500 rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">
                        {count[0]}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                        Мужчины
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center w-full bg-rose-500 rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">
                        {count[1]}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                        Женщины
                    </span>
                </div>
            </div>
        </div>
    );
});
