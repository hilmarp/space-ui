import React, { useContext } from 'react';
import { Anchor, Box, Menu, ResponsiveContext } from 'grommet';
import { Deploy, Menu as MenuIcon } from 'grommet-icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const screenSize = useContext(ResponsiveContext);
    const navigate = useNavigate();

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
            {screenSize === 'small' ? (
                <Box>
                    <Menu
                        icon={<MenuIcon />}
                        items={[
                            { label: 'Launches', onClick: () => { navigate('/launches'); } },
                            { label: 'Companies', onClick: () => { navigate('/companies'); } },
                            { label: 'Rockets', onClick: () => { navigate('/rockets'); } },
                            { label: 'Locations', onClick: () => { navigate('/locations'); } }
                        ]}
                        dropAlign={{ top: 'bottom', right: 'right' }}
                    />
                </Box>
            ) : (
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
            )}
        </Box>
    );
};

export default Navbar;
