import { Box, Button, Checkbox, Link, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@services';
import { setStorageToken } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLoginFormStyle from './LoginForm.style';

import { useCookies } from 'react-cookie';
import { VariantType, useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { UserInfoI } from '@services';

type LoginFormDataT = {
    email: string;
    password: string;
    remember: boolean;
};

function LoginForm() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { classes } = useLoginFormStyle();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const notify = useCallback(
        (message: string, variant: VariantType) => {
            enqueueSnackbar(message, { variant: variant });
        },
        [enqueueSnackbar],
    );

    const LoginFormSchema = yup.object({
        email: yup.string().email(t('validations.email-invalid')).required(t('validations.email-required')),
        password: yup.string().required(t('validations.password-required')),
    });

    const { register, handleSubmit, control } = useForm<LoginFormDataT>({
        reValidateMode: 'onChange',
        resolver: yupResolver(LoginFormSchema),
    });
    const [login] = useLoginMutation();
    const [cookies, setCookie] = useCookies(['userData']);

    const onSubmit = async (data: LoginFormDataT) => {
        try {
            const body = await login(data).unwrap();
            // body[0] beacause backend return 1 element
            const user = body[0] as UserInfoI;
            setCookie('userData', user, { path: '/' });
            const msg = `${t('notification.welcome')} ${user.username}`;
            notify(msg, 'success');
            navigate('/');
        } catch (err) {
            console.error(err);
            notify(t('notification.error'), 'error');
        }
    };

    return (
        <Box className={classes.container}>
            <form id="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputProps={{
                        ...register('email'),
                    }}
                    label={t('labels.email')}
                    autoComplete="current-email"
                    type="email"
                />
                <TextField
                    inputProps={{
                        ...register('password'),
                    }}
                    label={t('labels.password')}
                    type="password"
                    autoComplete="current-password"
                />
                <Link className={classes.checkbox} component={RouterLink} to="/forgot-password" variant="button">
                    {t('buttons.forgot-password')}
                </Link>
                <Box className={classes.checkbox} mb={2} textAlign="left">
                    <Controller
                        control={control}
                        name="remember"
                        render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <Checkbox
                                onBlur={onBlur} // notify when input is touched
                                onChange={onChange} // send value to hook form
                                checked={value ?? false}
                                inputRef={ref}
                                inputProps={{
                                    'aria-label': t('labels.remember-me'),
                                }}
                            ></Checkbox>
                        )}
                    />
                    <Typography>{t('labels.remember-me')}</Typography>
                </Box>
                <Box mt={6}>
                    <Button type="submit" variant="contained" disableElevation fullWidth>
                        {t('buttons.login')}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default LoginForm;
