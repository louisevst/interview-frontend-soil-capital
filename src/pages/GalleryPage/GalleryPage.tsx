import { useEffect, useState } from 'react';
import photoI from '../../services/photo.api';
import { Pagination, Grid, Typography, CircularProgress } from '@mui/material';
import useGalleryPageStyles from './GalleryPage.style';
import { useTranslation } from 'react-i18next';

function Gallery() {
    const { t } = useTranslation();
    const { classes } = useGalleryPageStyles();

    const [photos, setPhotos] = useState<photoI[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPhotosCount, setTotalPhotosCount] = useState<number | null>(null);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    async function fetchTotalPhotoCount() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            setTotalPhotosCount(data.length);
            setTotalPages(Math.ceil(data.length / 12));
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchDataFromApi(start: number, limit: number) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }

    const loadPhotos = async (page: number) => {
        setLoading(true);
        try {
            const data = await fetchDataFromApi(page, 12); // Load photos for the current page
            setPhotos(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!totalPhotosCount) {
            fetchTotalPhotoCount();
        }
        loadPhotos(currentPage);
    }, [currentPage]);

    if (loading) {
        return (
            <main className={classes.loaderContainer}>
                <CircularProgress></CircularProgress>
            </main>
        );
    }

    return (
        <main className={classes.container}>
            <Typography variant="h3" color="secondary">
                {t('titles.gallery')}
            </Typography>
            <Grid container sx={{ pt: 4, px: 2 }} spacing={2} alignItems="center" justifyContent="center">
                {photos.map((photo) => (
                    <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3} className={classes.photoContainer}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <Typography variant="caption" className={classes.caption}>
                            {photo.title}
                        </Typography>
                    </Grid>
                ))}
                {totalPages !== null && (
                    <Pagination
                        count={totalPages}
                        onChange={handlePageChange}
                        page={currentPage}
                        color="primary"
                        className={classes.pages}
                    ></Pagination>
                )}
            </Grid>
        </main>
    );
}

export default Gallery;
