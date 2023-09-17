import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => {
    return {
        container: {
            width: '280px',
            margin: 'auto',
        },
        checkbox: {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            '& > div': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
        button: {
            width: '200px',
            [theme.breakpoints.up('md')]: {
                width: '100%',
            },
        },
    };
});
