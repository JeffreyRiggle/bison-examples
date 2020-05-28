import React from 'react';

export const Post = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.body}</p>
            {
                Object.keys(props.comments || {}).map(comment => {
                    return <p>{comment}</p>
                })
            }
        </div>
    )
}