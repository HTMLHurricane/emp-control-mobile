import { useGetLastDataQuery } from '@/entities/home/api';
import { Card, Title } from '@/shared';
import { useState } from 'react';
import { columnResponseText } from '@/shared/const/css';
import { Image, Spin, Table, TableProps } from 'antd';
import { ILastAttendance } from '@/entities/home/model';

const Last = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isLoading } = useGetLastDataQuery({
        page,
        page_size: limit,
    });

    const columns: TableProps<ILastAttendance>['columns'] = [
        {
            title: 'ФИО',
            key: 'full_name',
            dataIndex: 'full_name',
            render: (_, res) => <>{res.employee.full_name}</>,
            className: `${columnResponseText}`,
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
            render: (_, res) => <>{res.employee.branch.name}</>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Филиал',
            dataIndex: 'branch',
            key: 'branch',
            render: (_, res) => <>{res.employee.branch.name}</>,
            className: `${columnResponseText}`,
        },
        {
            title: 'det score',
            dataIndex: 'score',
            key: 'score',
            render: (score) => <>{Number(score.toFixed(2))}</>,
            responsive: ['md', 'lg', 'xl'],
            className: `${columnResponseText}`,
        },
        {
            title: 'Время',
            dataIndex: 'date',
            key: 'date',
            render: (time) => time.split('T')[1].slice(0, 5),
            className: `${columnResponseText} w-[50px]`,
        },
        {
            title: 'Изображение',
            dataIndex: 'url',
            key: 'url',
            render: (url) => (
                <Image
                    onClick={(e) => e.stopPropagation()}
                    src={url}
                    alt="photo"
                    className="w-[100px]"
                />
            ),
            className: `${columnResponseText}`,
        },
    ];

    if (isLoading && !data) {
        return (
            <div className="w-full flex-1 flex items-center justify-center h-[450px]">
                <Spin />
            </div>
        );
    } else {
        return (
            <Card className="flex-col flex-1 min-h-[450px] text-center">
                <Title>Последняя активность</Title>
                <Table<ILastAttendance>
                    scroll={{ y: 450 }}
                    dataSource={data?.content}
                    columns={columns}
                    size="small"
                    rowKey={(res) => res.id}
                    pagination={{
                        showSizeChanger: true,
                        current: page,
                        pageSize: limit,
                        total: data?.total_elements,
                        onChange: (page, limit) => {
                            setPage(page);
                            setLimit(limit);
                        },
                    }}
                    className="mt-4 w-full sm:w-full md:w-auto lg:w-auto xl:w-auto"
                />
            </Card>
        );
    }
};

export { Last };
