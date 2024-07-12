import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

function Post() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <div>Post</div>
    )
}

export default Post