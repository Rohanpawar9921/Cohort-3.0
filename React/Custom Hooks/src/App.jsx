import { useState, useEffect } from 'react'
import './App.css'
import { usePostTitle, useFetch } from './hooks/useFetch';
import { usePrev } from './hooks/usePrev';

//custom hook 
function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return {
    count: count,
    increaseCount: increaseCount
  }
}
//component using custom hook
function Counter() {
  const { count, increaseCount } = useCounter();
  const postTitle1 = usePostTitle();


  return (
    <div>
      <button onClick={increaseCount}>Increase {count}</button>


      <p>
        using <b>Counter component</b> = {postTitle1}

      </p>


    </div>
  )

}




//useFetch using custom hook

function App() {
  // // const postTitle1 = usePostTitle();
  // // const [currPost, setCurrPost] = useState(1);
  // // const {post, loading} = useFetch("https://jsonplaceholder.typicode.com/posts/" + currPost, 5);

  // // if (loading) {
  // //   return (
  // //     <div>
  // //       Loading............
  // //     </div>
  // //   )
  // // }



  // // const [value, setValue] = useState(0);
  // // const prev = usePrev(value);

  // const [count, setCount] = useState(0);
  // const prevCount = usePrev(count); // Track the previous count value
  // const [x, setX] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     setX(x => x + 1);
  //   }, 1000)

  // }, []);


  return (
    <div>
    <div>
      {/* <Counter /> */}



      {
        /*
        useFetch()
        */
      }
      {/* <p>using <b>useCounter</b> = {postTitle1}</p>
      

      <hr />
      <h2>Trying useFetch with diff endpoints using button</h2>



      <button onClick={() => setCurrPost(1)}>Get Post 1</button>
      <button onClick={() => setCurrPost(2)}>Get Post 2</button>
      <button onClick={() => setCurrPost(3)}>Get Post 3</button>

      
      <p>using <b>useFetch</b> = {post}</p> */}







      {/* usePrev()*/}
      {/* <p>The current state value is {value}</p>
      <button onClick={() => {
        setValue((value) => value + 1)
      }}>increase</button>
      <p>the the prev value is {prev}</p>
      <p>Note : the value of prev is one less than the state becuse react have a property, it returns first and the effect is done</p> */}

      {/* <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter with usePrev Hook</h1>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount}</p>
      {x}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>Decrement</button>
    </div> */}
    </div>


    </div>



  )
}

//component using custom hook

export default App
