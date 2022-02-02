import React, { useState, useEffect, useRef } from 'react';
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, Text, Heading, TextInput, Pagination, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { getCompanies } from '../api';
import { PER_PAGE } from '../constants';
import FullPageLoading from '../components/FullPageLoading';
import { getTitle } from '../utils';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const searchInputEl = useRef(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = getTitle('Companies');
    }, []);

    useEffect(() => {
        const pageQuery = searchParams.get('page') || '1';
        const searchQuery = searchParams.get('search') || '';
        searchInputEl.current.value = searchQuery;
        setCurrentPage(parseInt(pageQuery, 10));
        setCurrentSearchValue(searchQuery);
        const asyncGetCompanies = async () => {
            const data = await getCompanies(pageQuery, searchQuery);
            setCompanies(data.result);
            setTotal(data.total);
            setLoading(false);
        };
        setLoading(true);
        asyncGetCompanies();
    }, [searchParams]);

    const handlePaginationChange = ({ page }) => {
        if (currentSearchValue) {
            navigate(`/companies/?page=${page}&search=${currentSearchValue}`);
        } else {
            navigate(`/companies/?page=${page}`);
        }
    };


    const handleSearchInputChange = debounce((value) => {
        navigate(`/companies/?search=${value}`);
    }, 800);

    return (
        <Box>
            <Box align='center' pad={'large'}>
                <Heading margin="none">Rocket Companies</Heading>
            </Box>
            <Box align='center'>
                <Box width={'large'} gap='medium'>
                    <TextInput
                        ref={searchInputEl}
                        icon={<Search />}
                        placeholder="Search for a company..."
                        onChange={(event) => { handleSearchInputChange(event.target.value); }}
                    />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope="col" border="bottom">
                                    <Text weight={'bold'}>Name</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    <Text weight={'bold'}>Country</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    <Text weight={'bold'}>Active</Text>
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.map(company => (
                                <TableRow key={company.id}>
                                    <TableCell scope="row">
                                        <Anchor
                                            as={Link}
                                            to={`/company/${company.id}`}
                                            label={company.name}
                                            color={'light-1'}
                                            weight={'normal'}
                                        />
                                    </TableCell>
                                    {company.country.code ? (
                                        <TableCell>
                                            <Anchor
                                                as={Link}
                                                to={`/country/${company.country.code}`}
                                                label={`${company.country.name} (${company.country.code})`}
                                                color={'light-1'}
                                                weight={'normal'}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell>{company.country.name}</TableCell>
                                    )}
                                    <TableCell>
                                        {company.inactive ? (
                                            <Text color={'status-error'}>No</Text>
                                        ) : (
                                            <Text color={'status-ok'}>Yes</Text>
                                        )}
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

export default Companies;
