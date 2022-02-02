import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Tip, Anchor } from 'grommet';
import { Location, Cloud, Deploy, Calendar } from 'grommet-icons';
import { Link } from 'react-router-dom';
import { fToC, mphToMs, launchDateObj } from '../utils';
import { AVAILABLE_LOGOS, COUNTRY_CODES } from '../constants';
import Logo from '../components/Logo';
import Rocket from '../components/Rocket';

const Launch = ({ launch }) => {
    const [time, setTime] = useState('');
    const [relativeTime, setRelativeTime] = useState('');
    const [showRelativeTime, setShowRelativeTime] = useState(false);

    useEffect(() => {
        const launchDate = launchDateObj(launch);
        setTime(launchDate.time);
        setRelativeTime(launchDate.relativeTime);
        setShowRelativeTime(launchDate.showRelativeTime);
    }, [launch]);

    return (
        <Box background={'dark-2'} direction='row'>
            <Anchor as={Link} to={`/launch/${launch.id}`}>
                <Box flex={false} height={'medium'} width={'medium'}>
                    <Rocket slug={launch.vehicle.slug} />
                </Box>
            </Anchor>
            <Box pad={'medium'} gap='small'>
                <Heading margin={'none'}>
                    <Anchor
                        as={Link}
                        to={`/launch/${launch.id}`}
                        label={launch.name}
                        color={'light-1'}
                    />
                </Heading>
                <Box pad={{ bottom: 'small' }}>
                    {Object.values(AVAILABLE_LOGOS).includes(launch.provider.slug) ? (
                        <Logo
                            slug={launch.provider.slug}
                            link={`/company/${launch.provider.id}`}
                            tooltip={launch.provider.name}
                        />
                    ): (
                        <Anchor
                            as={Link}
                            to={`/company/${launch.provider.id}`}
                            label={launch.provider.name}
                            color={'light-1'}
                            weight={'normal'}
                        />
                    )}
                </Box>
                <Box direction='row' gap='small'>
                    <Calendar color='brand' />
                    {showRelativeTime ? (
                        <Tip
                            plain
                            content={
                                <Box background={'light-1'} pad={'small'} round="small">
                                    <Text>{time}</Text>
                                </Box>
                            }
                            dropProps={{ align: { bottom: 'top' } }}
                        >
                            <Text>{relativeTime}</Text>
                        </Tip>
                    ) : (
                        <Text>{relativeTime}</Text>
                    )}
                </Box>
                {launch.weather_temp && (
                    <Box direction='row' gap='small' align='center'>
                        <Cloud color='brand' />
                        <Box>
                            <Text>{fToC(launch.weather_temp)}°C</Text>
                            <Text>{mphToMs(launch.weather_wind_mph)} m/s</Text>
                            <Text>{launch.weather_condition}</Text>
                        </Box>
                    </Box>
                )}
                <Box direction='row' gap='small' align='center'>
                    <Location color='brand' />
                    <Box>
                        <Text>
                            <Anchor
                                as={Link}
                                to={`/pad/${launch.pad.id}`}
                                label={launch.pad.name}
                                color={'light-1'}
                                weight={'normal'}
                            />{', '}
                            <Anchor
                                as={Link}
                                to={`/location/${launch.pad.location.id}`}
                                label={launch.pad.location.name}
                                color={'light-1'}
                                weight={'normal'}
                            />
                        </Text>
                        {launch.pad.location.statename ? (
                            <Text>
                                <Anchor
                                    as={Link}
                                    to={`/state/${launch.pad.location.state}`}
                                    label={launch.pad.location.statename}
                                    color={'light-1'}
                                    weight={'normal'}
                                />{', '}
                                {Object.values(COUNTRY_CODES).includes(launch.pad.location.country) ? (
                                    <Anchor
                                        as={Link}
                                        to={`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`}
                                        label={launch.pad.location.country}
                                        color={'light-1'}
                                        weight={'normal'}
                                    />
                                ) : (
                                    <Text>{launch.pad.location.country}</Text>
                                )}
                            </Text>
                        ) : (
                            <Text>
                                {Object.values(COUNTRY_CODES).includes(launch.pad.location.country) ? (
                                    <Anchor
                                        as={Link}
                                        to={`/country/${Object.entries(COUNTRY_CODES).find(cc => cc[1] === launch.pad.location.country)[0]}`}
                                        label={launch.pad.location.country}
                                        color={'light-1'}
                                        weight={'normal'}
                                    />
                                ) : (
                                    <Text>{launch.pad.location.country}</Text>
                                )}
                            </Text>
                        )}
                    </Box>
                </Box>
                <Box direction='row' gap='small'>
                    <Deploy color='brand' />
                    <Anchor
                        as={Link}
                        to={`/rocket/${launch.vehicle.id}`}
                        label={launch.vehicle.name}
                        color={'light-1'}
                        weight={'normal'}
                    />
                </Box>
            </Box>
        </Box>
    );
};

Launch.propTypes = {
    launch: PropTypes.object.isRequired
};

export default Launch;
