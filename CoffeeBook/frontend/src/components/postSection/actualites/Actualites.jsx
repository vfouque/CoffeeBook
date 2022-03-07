import React from 'react';
import PostActu from '../postActu/PostActu.jsx';
import './actualites.css';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Actualites({ feedMessage, posts, addActualites }) {
    return (
        <div className='container'>
            <p className='actuTitle'>{feedMessage}</p>
            {posts.map((p) => (
                <PostActu key={p.id} post={p} />
            ))}
            {posts.length % 10 === 0 && posts.length > 0 ? (
                <IconButton onClick={addActualites} sx={{ color: 'orange', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                    <AddBoxIcon fontSize='large' />
                </IconButton>
            ) : (
                ''
            )}
        </div>
    );
}
