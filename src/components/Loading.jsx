import React from 'react';
import { Box, Spinner, Text } from 'grommet';

const Loading = () => {
    return (
        <Box direction='row' align='center' gap='small'>
            <Spinner />
            <Text>Loading...</Text>
        </Box>
    );
};

export default Loading;
