import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => {
    return {
        list: {
            padding: '0',
            overflow: 'hidden',
        },
        navLinkActive: {
            borderRadius: '10px',
            backgroundColor: '#f6f3E5',
            cursor: 'default',
            '&:hover': {
                backgroundColor: '#f6f3E5',
            },
            [theme.breakpoints.up('lg')]: {
                borderRadius: '10px 0 0 10px',
            },
        },
        closeLink: {
            display: 'none',
            color: theme.palette.primary.light,
            textDecoration: 'none',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '10px 0 0 10px',
            [theme.breakpoints.up('lg')]: {
                display: 'flex',
            },
        },
        navLink: {
            color: theme.palette.primary.light,
            textDecoration: 'none',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '10px',
            [theme.breakpoints.up('lg')]: {
                borderRadius: '10px 0 0 10px',
            },
        },
        listItemText: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '16px',
        },
        listItemIcon: {
            fontSize: '20px',
            color: theme.palette.primary.light,
        },
        nameContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
    };
});
