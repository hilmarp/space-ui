import React, { useEffect, useState } from 'react';
import { Box, Heading, Pagination, Text } from 'grommet';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { PER_PAGE } from '../constants';
import { getLaunchesByPadId, getPadById } from '../api';
import { getTitle } from '../utils';
import FullPageLoading from '../components/FullPageLoading';
import Launch from '../components/Launch';

const Pad = () => {
    const [launches, setLaunches] = useState([]);
    const [pad, setPad] = useState(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    let { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageQuery, 10));
        const asyncGetLaunches = async () => {
            const data = await getLaunchesByPadId(pageQuery, id);
            setLaunches(data.result);
            setTotal(data.total);
            setLoading(false);
            setEmpty(data.total === 0);
        };
        setLoading(true);
        asyncGetLaunches();
    }, [searchParams, id]);

    useEffect(() => {
        const asyncGetPadById = async () => {
            const data = await getPadById(id);
            setPad(data.result[0]);
            document.title = getTitle(data.result[0].name);
        };
        asyncGetPadById();
    }, [id]);

    const handlePaginationChange = ({ page }) => {
        navigate(`/pad/${id}/?page=${page}`);
    };

    return (
        <Box>
            <Box align='center' pad={'large'}>
                {pad ? (
                    <Heading margin="none">Upcoming {pad.name} Launches</Heading>
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

export default Pad;