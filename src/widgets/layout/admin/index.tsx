import { Button, Layout } from 'antd';
import { FC } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBuildingUser } from 'react-icons/fa6';
import { VscGraphLine } from 'react-icons/vsc';
import { TOKEN, TOKEN_KEY, useAppActions, useAppSelector } from '@/shared';
import { LuLogOut } from 'react-icons/lu';

type MenuItem = Required<MenuProps>['items'][number];
const { Content, Sider } = Layout;
const items: MenuItem[] = [
    {
        key: '1',
        label: <Link to="/">Главная</Link>,
        icon: <FaBuildingUser />,
    },
    {
        key: '2',
        label: <Link to="/count">Статистика</Link>,
        icon: <VscGraphLine />,
    },
];

const AdminLayout: FC = () => {
    const { collapsed } = useAppSelector();
    const { setCollapsed } = useAppActions();
    const navigate = useNavigate();
    const onLogout = () => {
        TOKEN.remove(TOKEN_KEY);
        navigate('/login');
    };
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="relative h-screen overflow-hidden">
            <Sider
                theme="light"
                width={250}
                collapsedWidth={50}
                collapsed={collapsed}
                breakpoint="lg"
                className="fixed h-full sm:w-16 md:w-20 lg:w-60 xl:w-72 z-50"
            >
                <div className="text-center text-slate-950 text-2xl py-5">
                    <Link to="/">{collapsed ? 'A' : 'AralHUB'}</Link>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    items={items}
                />
                <div className="flex flex-col absolute bottom-0 w-full">
                    <Button
                        icon={!collapsed && <LuLogOut />}
                        onClick={onLogout}
                        type="link"
                        className="text-slate-950"
                    >
                        {collapsed ? <LuLogOut /> : 'Выйти'}
                    </Button>
                    <Button
                        onClick={handleCollapsed}
                        className="bg-transparent text-slate-950 hover:!bg-transparent hover:!text-slate-950 border-none w-full py-8"
                    >
                        {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                    </Button>
                </div>
            </Sider>

            <Layout>
                <Content
                    className={`relative transition-all duration-300 ${
                        collapsed ? 'ml-[10px]' : 'ml-[0px]'
                    } md:ml-[0px] h-screen overflow-hidden`}
                >
                    <div className="p-2 h-full overflow-y-auto custom-scroll xl:p-5 bg-white rounded-lg shadow-sm">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export { AdminLayout };
