import URLs from "./URLs"

function API(){
  let pathToTaskDataFile = URLs.gitAPI

  let localStorageKey = "taskio/state"

  this.GET = (isContentRequest=true)=>{
    return fetch(pathToTaskDataFile,{
      method: "GET"
    }).then((response)=>{
      if(!response.ok){
        throw("Couldn't get state from github...") 
      }
      return response.json()
    })
    .then((data)=>{
      //if were requesting github content, decode and parse that, otherwise, just parse the response JSON (to grab SHA)
      return ((isContentRequest)?JSON.parse(atob(data.content)):data)
    })
  }


  this.PUT = (state)=>{
    //set local state every time stuff is updated on server
    localStorage.setItem(localStorageKey, JSON.stringify(state))

    return this.GET(false).then(
      (data)=>{
        fetch(pathToTaskDataFile,{
        method     : "PUT",
        mode       : "cors",
        contentType: "application/json",
        body       : JSON.stringify({
          "message"  : "file updated via github API",
          "committer": {
            "name" : "auto",
            "email": "auto@auto.com"
          },
          "content": btoa(JSON.stringify(state)),
          "sha"    : data.sha
        })
      })
    })
  }

  let syncLocalWithServer = ()=>{
    fetch(pathToTaskDataFile,{method:"GET"})
    .then((response)=>{
      if(!response.ok){
        throw("Couldn't get state from github...") 
      }
      return response.json()
    })
    .then((data)=>{
      //if were requesting github content, decode and parse that, otherwise, just parse the response JSON (to grab SHA)
      return data.sha
    })
    .then((shaFileKey)=>{
      fetch(pathToTaskDataFile,{
      method     : "PUT",
      mode       : "cors",
      contentType: "application/json",
      body       : JSON.stringify(
        {
        "message"  : "local state sync via github API",
        "committer": {
          "name" : "auto",
          "email": "auto@auto.com"
        },
        "content": btoa(JSON.stringify(localStorage.getItem(localStorageKey))),
        "sha"    : shaFileKey
        })
      })
    })
  }

  //makes sure that the most recent PUT state gets sent to github on starting the app
  if(JSON.parse(localStorage.getItem(localStorageKey))){
    syncLocalWithServer()
  }
}


export default new API() 