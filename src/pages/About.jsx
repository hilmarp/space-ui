import React, { useEffect } from 'react';
import { Box, Paragraph, Heading, Anchor } from 'grommet';
import { getTitle } from '../utils';

const About = () => {
    // const todos = [
    //     'Rocket Specifications',
    //     'Company Information',
    //     'Location Information',
    //     'Launch Pad Information',
    //     'Filter By Date'
    // ];

    useEffect(() => {
        document.title = getTitle('About');
    }, []);

    return (
        <Box>
            <Box align='center' pad={'large'}>
                <Heading margin="none">About</Heading>
            </Box>
            <Box align='center' pad={{ bottom: 'large' }}>
                <Box width={'large'} gap='medium'>
                    <Box>
                        <Paragraph fill margin={'none'}>See upcoming, or past, rocket launches using a straight to the point, clutter-free, easy on the eyes UI.</Paragraph>
                    </Box>
                    {/* <Box width={'medium'}>
                        <Text margin={{ bottom: 'small' }}>Todo:</Text>
                        <List data={todos} />
                    </Box> */}
                    <Box>
                        <Paragraph fill margin={'none'}>
                            Any questions or comments? Send me an email at{' '}
                            <Anchor href="mailto:hilmar@hilmarp.com" label="hilmar@hilmarp.com" />.
                        </Paragraph>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
