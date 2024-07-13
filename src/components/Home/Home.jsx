import React from 'react'
import Post from '../Post/Post'
import { useState, useEffect } from 'react';
import './Home.scss'
import { Container } from '@mui/material';


function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error!!!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (

            <Container fixed style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#cfe8fc', height: '100vh' }}>
                {postList.map((post) => (
                    <div style={{ marginBottom: '10px', width: '80%' }}>
                        <Post key={post.id} title={post.title} text={post.text}></Post>
                    </div>
                ))}
            </Container>
        );
    }
}

export default Home