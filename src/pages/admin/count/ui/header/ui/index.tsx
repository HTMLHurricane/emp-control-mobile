import { useGetAllBranchesQuery } from '@/entities/branch/api';
import { useAppActions, useAppSelector } from '@/shared';
import { mapToOptions } from '@/shared/lib/mapToOptions';
import { Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
    setDates: React.Dispatch<
        React.SetStateAction<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>
    >;
    setFilter: (value: 'week' | 'month' | null) => void;
    filter: 'week' | 'month' | null;
}

export const Header: FC<IHeaderProps> = ({ setDates, setFilter, filter }) => {
    const { attendanceBranch } = useAppSelector();
    const { setAttendanceBranch } = useAppActions();
    const { data: branches } = useGetAllBranchesQuery();
    const branchOptions = useMemo(() => mapToOptions(branches), [branches]);
    const navigate = useNavigate();
    useEffect(() => {
        if (branchOptions && branchOptions.length) {
            setAttendanceBranch(branchOptions[0].value as number);
        }
    }, [branchOptions, setAttendanceBranch]);
    const applyFilter = (filter: 'week' | 'month') => {
        if (filter === 'week') {
            const startOfWeek = dayjs().startOf('week');
            const endOfWeek = dayjs().endOf('week');
            setDates([startOfWeek, endOfWeek]);
        } else if (filter === 'month') {
            const startOfMonth = dayjs().startOf('month');
            const endOfMonth = dayjs().endOf('month');
            setDates([startOfMonth, endOfMonth]);
        }
        setFilter(filter);
    };
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4">
            <div className="flex w-full justify-between">
                <h2 className="flex items-center text-lg font-semibold">
                    <FaArrowLeft
                        size={18}
                        className="mr-3 cursor-pointer hover:text-blue-500 transition-colors duration-150"
                        onClick={() => navigate(-1)}
                    />
                    Статистика
                </h2>

                <Select
                    options={branchOptions}
                    value={attendanceBranch}
                    placeholder="Филиал"
                    onSelect={(e) => setAttendanceBranch(e)}
                    allowClear
                    onClear={() => setAttendanceBranch(undefined)}
                    className="w-[150px]"
                />
            </div>
            <Radio.Group
                value={filter}
                onChange={(e) => applyFilter(e.target.value)}
                className="flex-shrink-0"
            >
                <Radio.Button
                    value="week"
                    className="text-[12px] w-[150px] text-center"
                >
                    {' '}
                    неделя
                </Radio.Button>
                <Radio.Button
                    value="month"
                    className="text-[12px] w-[150px] text-center"
                >
                    {' '}
                    месяц
                </Radio.Button>
            </Radio.Group>
        </div>
    );
};
