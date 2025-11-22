import {  useEffect, useState } from "react";

export function usePostTitle () {
    const [post, setPost] = useState({});

  async function getPosts() {
    const resonse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const json =  await resonse.json();

    setPost(json);
  }

  useEffect(() => {
    getPosts();
  }, []);


  return post.title; 
}

export function useFetch (url, timeout) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setPost(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  useEffect(() => {
    setInterval(() => {
      getData();
    }, timeout * 1000);
  })

  return {
    post: post.title, loading
  } //here i fixed a bug, if just you send the comma separated value then only last one actually returns, so always return object or array
}