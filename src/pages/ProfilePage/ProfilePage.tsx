import { useCookies } from 'react-cookie';
import { Box, Avatar, Typography, Paper, List, ListItem, ListItemText, Container } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { UserInfoI } from '@services';
import { useTranslation } from 'react-i18next';
import useProfilePageStyle from './ProfilePage.style';

function ProfilePage() {
    const { t } = useTranslation();
    const { classes } = useProfilePageStyle();

    const [cookies] = useCookies(['userData']);
    const userInfo: UserInfoI = cookies.userData;

    return (
        <Box className={classes.container} sx={{ padding: 2 }}>
            <Container sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{userInfo.username.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="h5" pl={2}>
                    {userInfo.username}
                </Typography>
            </Container>
            <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
                <Typography variant="h6">{t('profile.general')}</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={t('profile.name')} secondary={userInfo.name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.username')} secondary={userInfo.username} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.email')} secondary={userInfo.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.phone')} secondary={userInfo.phone} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.website')} secondary={userInfo.website} />
                    </ListItem>
                </List>
            </Paper>
            <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
                <Typography variant="h6">{t('profile.company')} </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={t('profile.companyName')} secondary={userInfo.company.name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.companyActivity')} secondary={userInfo.company.bs} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.companySlogan')} secondary={userInfo.company.catchPhrase} />
                    </ListItem>
                </List>
            </Paper>
            <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
                <Typography variant="h6">{t('profile.address')} </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={t('profile.street')} secondary={userInfo.address.street} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.number')} secondary={userInfo.address.suite} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.city')} secondary={userInfo.address.city} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={t('profile.zip')} secondary={userInfo.address.zipcode} />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
}

export default ProfilePage;
