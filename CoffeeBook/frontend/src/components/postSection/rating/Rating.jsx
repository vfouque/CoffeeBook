import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function BasicRating({ voteAvg }) {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            <div className='d-flex align-items-center justify-content-around mt-2'>
                <div className='me-2'>
                    <Typography component='legend'>Moyenne des votes : {voteAvg}</Typography>
                </div>
                <div className='ml-6 d-flex align-items-center'>
                    <span>votre vote : </span>
                    <Rating
                        name='simple-controlled'
                        value={value}
                        emptyIcon={<StarBorderIcon fontSize='inherit' sx={{ color: 'white' }} />}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
            </div>
        </Box>
    );
}
