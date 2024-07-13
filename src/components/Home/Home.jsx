import React from 'react'
import Post from '../Post/Post'
import { useState, useEffect } from 'react';
import './Home.scss'
import { Container } from '@mui/material';
import PostForm from '../Post/PostForm';


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

            <div fixed style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f5ff' }}>
                <div style={{ margin: '20px', width: '50%' }}>
                    <PostForm userName={'Safar'} title={'Title'} text={'text'} />
                </div>

                {postList.map((post) => (
                    <div style={{ margin: '20px', width: '50%' }}>
                        <Post key={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                    </div>
                ))}
            </div>
        );
    }
}

export default Home