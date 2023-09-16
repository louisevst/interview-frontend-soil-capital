import { useEffect, useState } from 'react';
import photoI from '../../services/photo.api';

function Gallery() {
    const [photos, setPhotos] = useState<photoI[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [totalPhotosCount, setTotalPhotosCount] = useState<number | null>(null);

    async function fetchTotalPhotoCount() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            setTotalPhotosCount(data.length);
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

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const data = await fetchDataFromApi(currentPage * 10, 10); // Load photos for the current page
            setPhotos(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        fetchTotalPhotoCount(); // Fetch the total photo count
        loadPhotos();
    }, [currentPage]);

    if (loading) {
        return <main>Loading...</main>;
    }

    return (
        <main>
            <h1>Photo Gallery</h1>
            <div className="gallery">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo">
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage * 10 + 10 >= totalPhotosCount!}>
                    Next
                </button>
            </div>
        </main>
    );
}

export default Gallery;
