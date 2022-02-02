import React, { useContext } from 'react';
import { Anchor, Box, ResponsiveContext } from 'grommet';
import { Deploy } from 'grommet-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const size = useContext(ResponsiveContext);

    return (
        <Box
            as={'nav'}
            direction="row"
            justify="between"
            align="center"
            pad={'large'}
            background={'dark-1'}
        >
            <Box>
                <Box
                    direction="row"
                    align="center"
                    gap="small"
                >
                    <Deploy color="brand" />
                    {size !== 'small' && (
                        <Anchor
                            as={Link}
                            to="/"
                            label="Rocket Launches"
                            color={'light-1'}
                        />
                    )}
                </Box>
            </Box>
            <Box direction="row" gap="small">
                <Anchor
                    as={Link}
                    to="/launches"
                    label="Launches"
                    color={'light-1'}
                    weight={'normal'}
                />
                <Anchor
                    as={Link}
                    to="/companies"
                    label="Companies"
                    color={'light-1'}
                    weight={'normal'}
                />
                <Anchor
                    as={Link}
                    to="/rockets"
                    label="Rockets"
                    color={'light-1'}
                    weight={'normal'}
                />
                <Anchor
                    as={Link}
                    to="/locations"
                    label="Locations"
                    color={'light-1'}
                    weight={'normal'}
                />
            </Box>
        </Box>
    );
};

export default Navbar;
