import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import useHomePageStyle from './HomePage.style';
import SideBar from './SideBar/SideBar';
import TopBar from './TopBar/TopBar';

function HomePage() {
    const [sideBarOpen, setSidebarOpen] = useState(true);
    const { classes } = useHomePageStyle({ sideBarOpen });

    const toggleSideBar = () => {
        setSidebarOpen((sideBarOpen) => !sideBarOpen);
    };

    return (
        <div className={classes.container}>
            <TopBar className={classes.topbar} />
            <div className={classes.section}>
                <div className={classes.sidebar}>
                    <SideBar toggleSideBar={toggleSideBar} isSidebarOpen={sideBarOpen} />
                </div>
                <div className={classes.content}>
                    {/* This outlet is a new way to handle sub routers within main router. 
                    Check router to see what components are user here */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
