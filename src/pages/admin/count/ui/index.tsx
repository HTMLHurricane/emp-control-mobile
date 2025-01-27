import { SexChart } from './pie/ui';
import { ClientTypeChart } from './ClientTypeChart';
import { Header } from './header/ui';
import {
    useGetClientsByIntervalQuery,
    useGetClientsStatisticQuery,
} from '@/entities/count/api';
import { Spin } from 'antd';
import { useAppSelector } from '@/shared';
import dayjs from 'dayjs';
import { useState } from 'react';

const AdminCount = () => {
    const [filter, setFilter] = useState<'week' | 'month' | null>(null);
    const [dates, setDates] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
    >(null);
    const { attendanceBranch, homeDate } = useAppSelector();
    const date = homeDate.format('YYYY-MM-DD');
    const { data, isLoading } = useGetClientsStatisticQuery(
        {
            branch_id: attendanceBranch,
            date,
        },
        { skip: attendanceBranch === undefined },
    );
    const { data: intervalData } = useGetClientsByIntervalQuery(
        {
            branch_id: attendanceBranch,
            start_date: dates ? dates?.[0]?.format('YYYY-MM-DD') : date,
            end_date: dates ? dates?.[1]?.format('YYYY-MM-DD') : date,
        },
        { skip: attendanceBranch === undefined },
    );

    if (isLoading) {
        return <Spin />;
    }

    return (
        <div className="w-full">
            <Header
                dates={dates}
                setDates={setDates}
                setFilter={setFilter}
                filter={filter}
            />
            <div className="flex flex-col xl:flex-row">
                <SexChart
                    count={
                        dates
                            ? [
                                  intervalData
                                      ? intervalData.gender_count.count.Male
                                      : 0,
                                  intervalData
                                      ? intervalData.gender_count.count.Female
                                      : 0,
                              ]
                            : [
                                  data ? data.gender_count.count.Male : 0,
                                  data ? data.gender_count.count.Female : 0,
                              ]
                    }
                />
                <ClientTypeChart
                    data={
                        dates
                            ? [
                                  intervalData
                                      ? intervalData.client_type_count.count.old
                                      : 0,
                                  intervalData
                                      ? intervalData.client_type_count.count.new
                                      : 0,
                              ]
                            : [
                                  data ? data.client_type_count.count.old : 0,
                                  data ? data.client_type_count.count.new : 0,
                              ]
                    }
                />
            </div>
        </div>
    );
};

export { AdminCount };
