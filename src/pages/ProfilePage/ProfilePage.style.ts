import { makeStyles } from 'tss-react/mui';

const useProfilePageStyle = makeStyles()((theme) => ({
    container: {
        borderRadius: '20px',
        backgroundColor: '#f6f3E5',
        [theme.breakpoints.up('lg')]: {
            borderRadius: '0 20px 20px 0',
        },
    },
}));

export default useProfilePageStyle;
