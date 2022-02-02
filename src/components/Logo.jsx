import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image, Tip, Box, Text } from 'grommet';
import { Link } from 'react-router-dom';
import { AVAILABLE_LOGOS } from '../constants';
import abl_space_systems from '../images/logos/abl_space_systems.png';
import aevum from '../images/logos/aevum.png';
import Airbus_Defence_and_Space from '../images/logos/Airbus_Defence_and_Space.jpg';
import albaorbital from '../images/logos/albaorbital.png';
import arianespace from '../images/logos/arianespace.png';
import astra from '../images/logos/astra.png';
import astrobotic from '../images/logos/astrobotic.jpg';
import blue_origin from '../images/logos/blue_origin.png';
import energia from '../images/logos/energia.jpeg';
import expace from '../images/logos/expace.jpeg';
import Firefly_logo from '../images/logos/Firefly_logo.jpg';
import fleet_space from '../images/logos/fleet_space.png';
import ISAS_logo from '../images/logos/ISAS_logo.png';
import isro from '../images/logos/isro.png';
import nasa from '../images/logos/nasa.png';
import rocket_lab from '../images/logos/rocket_lab.png';
import roscosmos_logo from '../images/logos/roscosmos_logo.png';
import spacex from '../images/logos/spacex.png';
import virgin_galactic from '../images/logos/virgin_galactic.png';
import virgin_orbit from '../images/logos/virgin_orbit.png';

const Logo = ({ slug, link, tooltip }) => {
    const getImage = () => {
        switch (slug) {
            case AVAILABLE_LOGOS.ABL_SPACE:
                return <Image height={'20'} src={abl_space_systems} />;
            case AVAILABLE_LOGOS.AEVUM:
                return <Image height={'25'} src={aevum} />;
            case AVAILABLE_LOGOS.AIRBUS_DEFENSE:
                return <Image height={'40'} src={Airbus_Defence_and_Space} />;
            case AVAILABLE_LOGOS.ALBA_ORBITAL:
                return <Image height={'50'} src={albaorbital} />;
            case AVAILABLE_LOGOS.ARIANESPACE:
                return <Image height={'50'} src={arianespace} />;
            case AVAILABLE_LOGOS.ASTRA_SPACE:
                return <Image height={'25'} src={astra} />;
            case AVAILABLE_LOGOS.ASTROBOTIC:
                return <Image height={'40'} src={astrobotic} />;
            case AVAILABLE_LOGOS.BLUE_ORIGIN:
                return <Image height={'40'} src={blue_origin} />;
            case AVAILABLE_LOGOS.ENERGIA:
                return <Image height={'40'} src={energia} />;
            case AVAILABLE_LOGOS.EXPACE:
                return <Image height={'40'} src={expace} />;
            case AVAILABLE_LOGOS.FIREFLY:
                return <Image height={'50'} src={Firefly_logo} />;
            case AVAILABLE_LOGOS.FLEET_SPACE:
                return <Image height={'30'} src={fleet_space} />;
            case AVAILABLE_LOGOS.ISAS:
                return <Image height={'30'} src={ISAS_logo} />;
            case AVAILABLE_LOGOS.ISRO:
                return <Image height={'50'} src={isro} />;
            case AVAILABLE_LOGOS.NASA:
                return <Image height={'50'} src={nasa} />;
            case AVAILABLE_LOGOS.ROCKET_LAB:
                return <Image height={'30'} src={rocket_lab} />;
            case AVAILABLE_LOGOS.ROSCOSMOS:
                return <Image height={'50'} src={roscosmos_logo} />;
            case AVAILABLE_LOGOS.SPACEX:
                return <Image height={'20'} src={spacex} />;
            case AVAILABLE_LOGOS.VIRGIN_GALACTIC:
                return <Image height={'50'} src={virgin_galactic} />;
            case AVAILABLE_LOGOS.VIRGIN_ORBIT:
                return <Image height={'50'} src={virgin_orbit} />;
            default:
                return <></>;
        }
    };
    return (
        link ? (
            <Anchor as={Link} to={link}>
                {tooltip ? (
                    <Tip
                        plain
                        content={
                            <Box background={'light-1'} pad={'small'} round="small">
                                <Text>{tooltip}</Text>
                            </Box>
                        }
                        dropProps={{ align: { bottom: 'top' } }}
                    >
                        {getImage()}
                    </Tip>
                ) : (
                    <>
                        {getImage()}
                    </>
                )}
            </Anchor>
        ) : (
            <>
                {getImage()}
            </>
        )
    );
};

Logo.propTypes = {
    slug: PropTypes.string.isRequired,
    link: PropTypes.string,
    tooltip: PropTypes.string
};

export default Logo;
