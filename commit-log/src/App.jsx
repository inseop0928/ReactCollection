import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [searchLog, setSearchLog] = useState(null)
  const [commitList, setCommitList] = useState(null)


  useEffect( ()=>{
    async function getGitData(){
      const res = await fetch('https://api.github.com/repos/sveltejs/svelte/commits')
      setCommitList(await res.json());
    }

    getGitData();
  },[])

  function chgCommitLogInput(e){
    setSearchLog(e.target.value);
  }

  function CommitMessage({commitList,searchLog}){

    return (
      <ul>
      
        {commitList && commitList.filter(({commit:{message}})=>{
            return searchLog && RegExp(`^${searchLog}.+`).test(message);
        }).map(({commit:{message}},idx)=>{
          return <li key={idx}>{message}</li>
        })}
      
      </ul>
    )
  }
  //{commit:{message} = item.commit.message
  return (
    <>
      <h1>hello commit log</h1>
      <input type='text' id ="commitLogInput" onChange={chgCommitLogInput}/>
      <h2>{searchLog}</h2>
      <CommitMessage commitList={commitList} searchLog = {searchLog}/>
    </>
  )
}

export default App
