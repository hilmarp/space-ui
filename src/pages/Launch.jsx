import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getLaunchById, getPadById } from '../api';
import { getTitle } from '../utils';
import FullPageLoading from '../components/FullPageLoading';
import LaunchMedia from '../components/LaunchMedia';
import FeaturedLaunch from '../components/FeaturedLaunch';

const Launch = () => {
    const [launch, setLaunch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [padLatLon, setPadLatLon] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        const asyncGetLaunchById = async () => {
            const data = await getLaunchById(id);
            setLaunch(data.result[0]);
            setLoading(false);
            document.title = getTitle(data.result[0].name);
        };
        setLoading(true);
        asyncGetLaunchById();
    }, [id]);

    useEffect(() => {
        if (!launch) {
            return;
        }
        const asyncGetPadById = async () => {
            const data = await getPadById(launch.pad.id);
            setPadLatLon({
                lat: data.result[0].location.latitude,
                lon: data.result[0].location.longitude
            });
        };
        asyncGetPadById();
    }, [launch]);

    return (
        <Box pad={{ top: 'large', bottom: 'large' }}>
            {launch && (
                <Box align='center' gap='medium'>
                    <Box width={'xxlarge'}>
                        <FeaturedLaunch launch={launch} />
                    </Box>
                    {launch.media && launch.media.length > 0 && (
                        <Box width={'xlarge'} gap='medium'>
                            <LaunchMedia launch={launch} />
                        </Box>
                    )}
                    {padLatLon && (
                        <Box width={'xlarge'}>
                            <MapContainer center={[padLatLon.lat, padLatLon.lon]} zoom={10} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[padLatLon.lat, padLatLon.lon]}>
                                    <Popup>{launch.pad.name}, {launch.pad.location.name}</Popup>
                                </Marker>
                            </MapContainer>
                        </Box>
                    )}
                </Box>
            )}
            {loading && (
                <FullPageLoading />
            )}
        </Box>
    );
};

export default Launch;
