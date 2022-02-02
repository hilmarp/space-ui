import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, Text, Heading, TextInput, Pagination, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { getRockets } from '../api';
import { PER_PAGE } from '../constants';
import { getTitle  } from '../utils';
import FullPageLoading from '../components/FullPageLoading';

const Rockets = () => {
    const [rockets, setRockets] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const searchInputEl = useRef(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = getTitle('Rockets');
    }, []);

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        const searchQuery = searchParams.get('search') || '';
        searchInputEl.current.value = searchQuery;
        setCurrentPage(parseInt(pageQuery, 10));
        setCurrentSearchValue(searchQuery);
        const asyncGetRockets = async () => {
            const data = await getRockets(pageQuery, searchQuery);
            setRockets(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetRockets();
    }, [searchParams]);

    const handlePaginationChange = ({ page }) => {
        if (currentSearchValue) {
            navigate(`/rockets/?page=${page}&search=${currentSearchValue}`);
        } else {
            navigate(`/rockets/?page=${page}`);
        }
    };


    const handleSearchInputChange = debounce((value) => {
        navigate(`/rockets/?search=${value}`);
    }, 800);

    return (
        <Box>
            <Box align='center' pad={'large'}>
                <Heading margin="none">Rockets</Heading>
            </Box>
            <Box align='center'>
                <Box width={'large'} gap='medium'>
                    <TextInput
                        ref={searchInputEl}
                        icon={<Search />}
                        placeholder="Search for a rocket..."
                        onChange={(event) => { handleSearchInputChange(event.target.value); }}
                    />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope="col" border="bottom">
                                    <Text weight={'bold'}>Name</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    <Text weight={'bold'}>Company</Text>
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rockets.map(rocket => (
                                <TableRow key={rocket.id}>
                                    <TableCell scope="row">
                                        <Anchor
                                            as={Link}
                                            to={`/rocket/${rocket.id}`}
                                            label={rocket.name}
                                            color={'light-1'}
                                            weight={'normal'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Anchor
                                            as={Link}
                                            to={`/company/${rocket.company.id}`}
                                            label={rocket.company.name}
                                            color={'light-1'}
                                            weight={'normal'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

export default Rockets;
