import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination } from 'grommet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PER_PAGE } from '../constants';
import { getLaunches } from '../api';
import { getTitle  } from '../utils';
import FullPageLoading from '../components/FullPageLoading';
import Launch from '../components/Launch';

const Launches = () => {
    const [launches, setLaunches] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = getTitle('Launches');
    }, []);

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunches(pageQuery);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [searchParams]);

    const handlePaginationChange = ({ page }) => {
        navigate(`/launches/?page=${page}`);
    };

    return (
        <Box pad={{ horizontal: 'medium' }}>
            <Box align='center' pad={'large'}>
                <Heading margin="none">Upcoming Launches</Heading>
                {/* <Box pad={{ top: 'small' }}>
                    <Anchor
                        as={Link}
                        to={'/launches'}
                        label={'See Past Launches'}
                    />
                </Box> */}
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

export default Launches;
