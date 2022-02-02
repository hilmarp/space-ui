import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Text } from 'grommet';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { PER_PAGE, US_STATES } from '../constants';
import { getLaunchesByState } from '../api';
import { getTitle } from '../utils';
import FullPageLoading from '../components/FullPageLoading';
import Launch from '../components/Launch';

const State = () => {
    const [launches, setLaunches] = useState([]);
    const [state, setState] = useState(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    

    let { code } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesByState(pageQuery, code);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
            setEmpty(data.total === 0);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [searchParams, code]);

    useEffect(() => {
        const stateName = US_STATES[code];
        setState(stateName);
        document.title = getTitle(stateName);
    }, [code]);

    const handlePaginationChange = ({ page }) => {
        navigate(`/state/${code}/?page=${page}`);
    };

    return (
        <Box>
            <Box align='center' pad={'large'}>
                {state ? (
                    <Heading margin="none">Upcoming {state} Launches</Heading>
                ) : (
                    <Heading margin="none">Upcoming Launches</Heading>
                )}
            </Box>
            <Box align='center'>
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
            {empty && (
                <Box align='center' pad={{ bottom: 'large' }}>
                    <Text size='large' color={'status-error'}>No Upcoming Launches</Text>
                </Box>
            )}
            {total > 0 && (
                <Box align='center' pad={'large'}>
                    <Pagination
                        numberItems={total}
                        step={PER_PAGE}
                        onChange={handlePaginationChange}
                        page={currentPage}
                    />
                </Box>
            )}
            {loading && (
                <FullPageLoading />
            )}
        </Box>
    );
};

export default State;