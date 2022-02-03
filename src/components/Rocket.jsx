import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'grommet';
import { random } from 'lodash';
import misc1 from '../images/rockets/misc1.jpg';
import misc2 from '../images/rockets/misc2.jpg';
import misc3 from '../images/rockets/misc3.jpg';
import misc4 from '../images/rockets/misc4.jpg';
import misc5 from '../images/rockets/misc5.jpg';
import misc6 from '../images/rockets/misc6.jpg';
import misc7 from '../images/rockets/misc7.jpg';
import misc8 from '../images/rockets/misc8.jpg';
import misc9 from '../images/rockets/misc9.jpg';
import falcon9_1 from '../images/rockets/falcon9_1.jpg';
import falcon9_2 from '../images/rockets/falcon9_2.jpg';
import falcon9_3 from '../images/rockets/falcon9_3.jpg';
import falcon9_4 from '../images/rockets/falcon9_4.jpg';
import soyuz_1 from '../images/rockets/soyuz_1.jpg';
import soyuz_2 from '../images/rockets/soyuz_2.jpg';
import soyuz_3 from '../images/rockets/soyuz_3.jpg';
import soyuz_4 from '../images/rockets/soyuz_4.jpg';
import falcon_heavy_1 from '../images/rockets/falcon_heavy_1.jpg';
import falcon_heavy_2 from '../images/rockets/falcon_heavy_2.jpg';

const TOTAL_MISC_ROCKETS = 9;
const TOTAL_FALCON9_ROCKETS = 4;
const TOTAL_FALCON_HEAVY_ROCKETS = 2;
const TOTAL_SOYUZ_ROCKETS = 4;

const AVAILABLE_ROCKETS = {
    FALCON_9: 'falcon-9',
    SOYUZ: 'soyuz-2',
    FALCON_HEAVY: 'falcon-heavy'
};

const Rocket = ({ slug }) => {
    if (Object.values(AVAILABLE_ROCKETS).includes(slug)) {
        if (slug === AVAILABLE_ROCKETS.FALCON_9) {
            const rnd = random(1, TOTAL_FALCON9_ROCKETS);
            switch (rnd) {
                case 1:
                    return <Image fit='cover' src={falcon9_1} />;
                case 2:
                    return <Image fit='cover' src={falcon9_2} />;
                case 3:
                    return <Image fit='cover' src={falcon9_3} />;
                case 4:
                    return <Image fit='cover' src={falcon9_4} />;
            }
        }

        if (slug === AVAILABLE_ROCKETS.SOYUZ) {
            const rnd = random(1, TOTAL_SOYUZ_ROCKETS);
            switch (rnd) {
                case 1:
                    return <Image fit='cover' src={soyuz_1} />;
                case 2:
                    return <Image fit='cover' src={soyuz_2} />;
                case 3:
                    return <Image fit='cover' src={soyuz_3} />;
                case 4:
                    return <Image fit='cover' src={soyuz_4} />;
            }
        }

        if (slug === AVAILABLE_ROCKETS.FALCON_HEAVY) {
            const rnd = random(1, TOTAL_FALCON_HEAVY_ROCKETS);
            switch (rnd) {
                case 1:
                    return <Image fit='cover' src={falcon_heavy_1} />;
                case 2:
                    return <Image fit='cover' src={falcon_heavy_2} />;
            }
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
        case 8:
            return <Image fit='cover' src={misc8} />;
        case 9:
            return <Image fit='cover' src={misc9} />;
    }
    return <Image fit='cover' src={misc1} />;
};

Rocket.propTypes = {
    slug: PropTypes.string.isRequired
};

export default Rocket;
