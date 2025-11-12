import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const res = await fetch('/bannerData.json'); 
                const data = await res.json();
                setBannerData(data); 
                setError(null);
            } catch (err) {
                console.error("Failed to fetch banner data:", err);
                setError(err);
                setBannerData([]);
            } finally {
                setLoading(false); 
            }
        };

        fetchBanners();
    }, []);

    const authinfo = {
        bannerData,
        loading, setLoading,
        error,setError,



    }

    return <AuthContext value={authinfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;