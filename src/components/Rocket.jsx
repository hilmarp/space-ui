import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'grommet';
import { random } from 'lodash';
import { AVAILABLE_ROCKETS, TOTAL_MISC_ROCKETS } from '../constants';
import falcon9 from '../images/rockets/falcon9.jpg';
import soyuz from '../images/rockets/soyuz.jpg';
import misc1 from '../images/rockets/misc1.jpg';
import misc2 from '../images/rockets/misc2.jpg';
import misc3 from '../images/rockets/misc3.jpg';
import misc4 from '../images/rockets/misc4.jpg';
import misc5 from '../images/rockets/misc5.jpg';
import misc6 from '../images/rockets/misc6.jpg';
import misc7 from '../images/rockets/misc7.jpg';

const Rocket = ({ slug }) => {
    if (Object.values(AVAILABLE_ROCKETS).includes(slug)) {
        switch (slug) {
            case AVAILABLE_ROCKETS.FALCON_9:
                return <Image fit='cover' src={falcon9} />;
            case AVAILABLE_ROCKETS.SOYUZ:
                return <Image fit='cover' src={soyuz} />;
        }
    }
    const randomMisc = random(1, TOTAL_MISC_ROCKETS);
    switch (randomMisc) {
        case 1:
            return <Image fit='cover' src={misc1} />;
        case 2:
            return <Image fit='cover' src={misc2} />;
        case 3:
            return <Image fit='cover' src={misc3} />;
        case 4:
            return <Image fit='cover' src={misc4} />;
        case 5:
            return <Image fit='cover' src={misc5} />;
        case 6:
            return <Image fit='cover' src={misc6} />;
        case 7:
            return <Image fit='cover' src={misc7} />;
    }
    return <Image fit='cover' src={misc1} />;
};

Rocket.propTypes = {
    slug: PropTypes.string.isRequired
};

export default Rocket;
