import { memo } from 'react';

export const ClientTypeChart = memo(
    ({ data }: { data: number[] | undefined }) => {
        return (
            <div className="flex flex-col gap-6 pb-6 px-6">
                <div className="flex flex-col items-center justify-center w-full bg-blue-500 rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">
                        {data ? data[0] : 0}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                        Постоянные клиенты
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center w-full bg-green-500 rounded-2xl p-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">
                        {data ? data[1] : 0}
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                        Новые клиенты
                    </span>
                </div>
            </div>
        );
    },
);
