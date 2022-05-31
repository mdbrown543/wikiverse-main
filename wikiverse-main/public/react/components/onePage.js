import React from 'react';

export const onePage = (props) => {

  return <>
    <h3>Title: {props.onePage.title}</h3>
    <h3>Author: {props.onePage.authorId}</h3>
    <h3>Content: {props.onePage.content}</h3>
    <h3>Date: {props.onePage.createdAt}</h3>
  </>
} 