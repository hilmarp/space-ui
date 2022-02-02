import React, { useContext } from 'react';
import { Anchor, Box, ResponsiveContext } from 'grommet';
import { Deploy } from 'grommet-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const size = useContext(ResponsiveContext);

    return (
        <Box
            as={'footer'}
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
            <Box>
                <Anchor
                    as={Link}
                    to="/about"
                    label="About"
                    color={'light-1'}
                    weight={'normal'}
                />
            </Box>
        </Box>
    );
};

export default Footer;
