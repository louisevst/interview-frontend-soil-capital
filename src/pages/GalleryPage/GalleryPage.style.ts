import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => {
    return {
        photoContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        caption: {
            padding: '0 4px 0 4px',
            [theme.breakpoints.up('md')]: {
                padding: '0 8px 0 8px',
            },

            [theme.breakpoints.up('lg')]: {
                padding: '0 16px 0 16px',
            },
        },
        pages: {
            paddingTop: '16px',
            [theme.breakpoints.up('md')]: {
                paddingTop: '24px',
            },
        },
        loaderContainer: {
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            justifyContent: 'center',
        },
        container: {
            padding: '25px 0px 25px 30px;',
        },
    };
});
