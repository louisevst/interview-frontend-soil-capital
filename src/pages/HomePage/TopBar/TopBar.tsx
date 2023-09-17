import clsx from 'clsx';
import logo from '../../../assets/images/logo-my-soilcapital.png';
import { Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useTopBarStyle from './TopBar.style';
import { useTranslation } from 'react-i18next';

function TobBar({ className }: TopBarT) {
    const { classes } = useTopBarStyle();
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const changeLanguage = (event: SelectChangeEvent<string>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div className={clsx(className, classes.container)}>
            <div className={classes.menuContainer}>
                <Box component="img" sx={{ height: 54 }} alt="Logo" src={logo} />
                <Select
                    defaultValue={language}
                    labelId="change-language"
                    id="change-language-select"
                    value={language}
                    label={t('app.language')}
                    onChange={changeLanguage}
                >
                    <MenuItem value="fr">Fr</MenuItem>
                    <MenuItem value="en">En</MenuItem>
                    <MenuItem value="nl">Nl</MenuItem>
                </Select>
            </div>
        </div>
    );
}

type TopBarT = {
    className?: string;
};

export default TobBar;
