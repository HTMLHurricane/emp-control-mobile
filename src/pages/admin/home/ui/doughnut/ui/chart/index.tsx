import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IDoughnutChartProps } from '../../model';
import { useAppActions } from '@/shared';

ChartJS.register(ArcElement, Tooltip, Legend);
const cardTextClasses = 'text-gray-400 lg:text-base max-lg:text-sm';

const DoughnutChart: FC<IDoughnutChartProps> = ({ datasets }) => {
    const { setIsNotComeModal, setIsLateModal, setIsComeModal } =
        useAppActions();

    return (
        <div className="gap-8 flex relative items-center flex-col justify-between w-full">
            <div className="flex items-center justify-between w-full px-5">
                <div
                    onClick={() => setIsComeModal(true)}
                    className="flex flex-col justify-center items-center "
                >
                    <span className={`${cardTextClasses} text-green-500`}>
                        Пришли
                    </span>
                    <span>{datasets[2]}</span>
                </div>
                <div
                    onClick={() => setIsLateModal(true)}
                    className="flex flex-col justify-center items-center "
                >
                    <span className={`${cardTextClasses} text-yellow-500`}>
                        Опоздали
                    </span>
                    <span>{datasets[1]}</span>
                </div>
                <div
                    onClick={() => setIsNotComeModal(true)}
                    className="flex flex-col justify-center items-center "
                >
                    <span className={`${cardTextClasses} text-red-500`}>
                        Не пришли
                    </span>
                    <span>{datasets[0]}</span>
                </div>
            </div>
        </div>
    );
};

export { DoughnutChart };
