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

            <Container fixed style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#cfe8fc',
                height: '100vh',
                padding: '20px'
            }}>
                {postList.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        text={post.text}
                        style={{
                            width: '80%',
                            margin: '10px 0',
                            padding: '20px',
                            boxSizing: 'border-box',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                ))}
            </Container>
        );
    }
}

export default Home