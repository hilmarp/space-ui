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
// import { DEV_LAUNCHES } from '../fixtures';

const Home = () => {
    const [launches, setLaunches] = useState([]);
    const [featuredLaunches, setFeaturedLaunches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const asyncGetLaunches = async () => {
            const data = await getLaunches();
            // const data = DEV_LAUNCHES;
            let result = [];
            if (data.result.length >= PER_HOME_PAGE) {
                for (let i = 0; i < PER_HOME_PAGE; i++) {
                    result.push(data.result[i]);
                }
            } else {
                result = data.result;
            }
            const featured = result.filter(r => r.win_open && isToday(new Date(r.win_open)));
            const notFeatured = result.filter(r => !featured.find(f => f.id === r.id));
            setFeaturedLaunches(featured);
            setLaunches(notFeatured);
            setLoading(false);
        };
        document.title = getTitle();
        setLoading(true);
        asyncGetLaunches();
    }, []);

    return (
        <Box pad={{ bottom: 'large', left: 'medium', right: 'medium' }}>
            {launches && launches.length > 0 && (
                <Box>
                    <Box align='center' pad={'large'}>
                        {featuredLaunches.length > 0 ? (
                            <Heading margin="none">It&apos;s Launch Day!</Heading>
                        ) : (
                            <Heading margin="none">Upcoming Launches</Heading>
                        )}
                    </Box>
                    <Box align='center'>
                        {featuredLaunches.length > 0 && (
                            featuredLaunches.map(featuredLaunch => (
                                <Box key={featuredLaunch.id} align='center'>
                                    <Box width={'xxlarge'} pad={{ bottom: 'medium' }}>
                                        <FeaturedLaunch launch={featuredLaunch} linkToLaunch />
                                    </Box>
                                    {featuredLaunch.media && featuredLaunch.media.length > 0 && (
                                        <Box width={'xlarge'} gap='medium' pad={{ bottom: 'medium' }}>
                                            <LaunchMedia launch={featuredLaunch} />
                                        </Box>
                                    )}
                                </Box>
                            ))
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
