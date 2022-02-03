import React, { useContext } from 'react';
import { Anchor, Box, ResponsiveContext } from 'grommet';
import { Deploy } from 'grommet-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const screenSize = useContext(ResponsiveContext);

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
                {screenSize === 'small' ? (
                    <Anchor
                        as={Link}
                        to="/"
                        color={'light-1'}
                        icon={<Deploy color={'brand'} />}
                    />
                ) : (
                    <Anchor
                        as={Link}
                        to="/"
                        label="Rocket Launches"
                        color={'light-1'}
                        icon={<Deploy color={'brand'} />}
                    />
                )}
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
