// import { usePermission } from '@hooks/usePermission';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import useSideBarStyle from './SideBar.style';

interface props {
    toggleSideBar: () => void;
    isSidebarOpen: boolean;
}

function SideBar(props: props) {
    const { classes } = useSideBarStyle();
    const { t } = useTranslation();
    // const { canManageTeam } = usePermission();
    const navigate = useNavigate();

    return (
        <List aria-label="main folders" className={classes.list} component="nav">
            <ListItem component="span" button onClick={props.toggleSideBar} className={classes.closeLink}>
                <ListItemIcon>
                    {props.isSidebarOpen ? (
                        <SvgIcon
                            component={CloseOutlinedIcon}
                            className={classes.listItemIcon}
                            viewBox="0 0 24 24"
                            aria-label="collapse"
                        />
                    ) : (
                        <SvgIcon
                            component={AddOutlinedIcon}
                            className={classes.listItemIcon}
                            viewBox="0 0 24 24"
                            aria-label="collapse"
                        />
                    )}
                </ListItemIcon>
                <div className={classes.nameContainer}>
                    <ListItemText
                        primary={t('titles.close')}
                        primaryTypographyProps={{ className: classes.listItemText }}
                    />
                </div>
            </ListItem>
            <ListItem
                className={`${classes.navLink} ${useMatch('/') && classes.navLinkActive}`}
                component="span"
                button
                onClick={() => navigate('/')}
            >
                <ListItemIcon>
                    <SvgIcon className={classes.listItemIcon} component={DashboardOutlinedIcon} viewBox="0 0 24 24" />
                </ListItemIcon>
                <div className={classes.nameContainer}>
                    <ListItemText
                        primary={t('titles.overview')}
                        primaryTypographyProps={{ className: classes.listItemText }}
                    />
                </div>
            </ListItem>
            <ListItem
                className={`${classes.navLink} ${useMatch('/gallery') && classes.navLinkActive}`}
                component="span"
                button
                onClick={() => navigate('/gallery')}
            >
                <ListItemIcon>
                    <SvgIcon className={classes.listItemIcon} component={PhotoOutlinedIcon} viewBox="0 0 24 24" />
                </ListItemIcon>
                <div className={classes.nameContainer}>
                    <ListItemText
                        primary={t('titles.gallery')}
                        primaryTypographyProps={{ className: classes.listItemText }}
                    />
                </div>
            </ListItem>
        </List>
    );
}

export default SideBar;
