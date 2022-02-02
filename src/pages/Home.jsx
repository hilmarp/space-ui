import React, { useEffect, useState } from 'react';
import { Box, Heading } from 'grommet';
import { isToday } from 'date-fns';
import { PER_HOME_PAGE } from '../constants';
import { getLaunches } from '../api';
import FullPageLoading from '../components/FullPageLoading';
import Launch from '../components/Launch';
import LaunchMedia from '../components/LaunchMedia';
import FeaturedLaunch from '../components/FeaturedLaunch';
import { getTitle } from '../utils';

const Home = () => {
    const [launches, setLaunches] = useState([]);
    const [launchToday, setLaunchToday] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const asyncGetLaunches = async () => {
            const data = await getLaunches();
            let result = [];
            if (data.result.length >= PER_HOME_PAGE) {
                for (let i = 0; i < PER_HOME_PAGE; i++) {
                    result.push(data.result[i]);
                }
            } else {
                result = data.result;
            }
            if (result.length && result[0].win_open && isToday(new Date(result[0].win_open))) {
                setLaunchToday(result[0]);
                result.shift();
            }
            setLaunches(result);
            setLoading(false);
        };
        document.title = getTitle();
        setLoading(true);
        asyncGetLaunches();
    }, []);

    return (
        <Box pad={{ bottom: 'large' }}>
            {launches && launches.length > 0 && (
                <Box>
                    <Box align='center' pad={'large'}>
                        {launchToday ? (
                            <Heading margin="none">It&apos;s Launch Day!</Heading>
                        ) : (
                            <Heading margin="none">Upcoming Launches</Heading>
                        )}
                    </Box>
                    <Box align='center'>
                        {launchToday && (
                            <Box align='center'>
                                <Box width={'xxlarge'} pad={{ bottom: 'medium' }}>
                                    <FeaturedLaunch launch={launchToday} linkToLaunch />
                                </Box>
                                {launchToday.media && launchToday.media.length > 0 && (
                                    <Box width={'xlarge'} gap='medium' pad={{ bottom: 'xlarge' }}>
                                        <LaunchMedia launch={launchToday} />
                                    </Box>
                                )}
                            </Box>
                        )}
                        <Box width={'xlarge'}>
                            <Box gap='medium'>
                                {launches.map(launch => (
                                    <Box key={launch.id}>
                                        <Launch launch={launch} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            {loading && (
                <FullPageLoading />
            )}
        </Box>
    );
};

export default Home;
