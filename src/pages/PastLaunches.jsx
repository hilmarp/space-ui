import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination } from 'grommet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PER_PAGE } from '../constants';
import { getLaunchesBefore } from '../api';
import { getTitle  } from '../utils';
import FullPageLoading from '../components/FullPageLoading';
import Launch from '../components/Launch';

const today = format(new Date(), 'yyyy-MM-dd');

const PastLaunches = () => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = getTitle('Past Launches');
    }, []);

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesBefore(pageQuery, today);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [searchParams]);

    const handlePaginationChange = ({ page }) => {
        navigate(`/past-launches/?page=${page}`);
    };

    return (
        <Box pad={{ horizontal: 'medium' }}>
            <Box align='center' pad={'large'}>
                <Heading margin="none">Past Launches</Heading>
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
            <Box align='center' pad={'large'}>
                <Pagination
                    numberItems={total}
                    step={PER_PAGE}
                    onChange={handlePaginationChange}
                    page={currentPage}
                />
            </Box>
            {loading && (
                <FullPageLoading />
            )}
        </Box>
    );
};

export default PastLaunches;
