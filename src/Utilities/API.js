import URLs from "./URLs"

function API(){
  let pathToTaskDataFile = URLs.gitAPI

  let localStorageKey = "taskio/state"

  let timeoutID
  let timeoutDelay = 1500
  let timeout = ()=>{
    timeoutID = setTimeout(()=>{
      console.log("sent another PUT")
      _networkPUT(JSON.parse(localStorage.getItem(localStorageKey)))
      timeoutSet = false
    },timeoutDelay)
  }
  let timeoutSet = false

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

  let _networkPUT = (state)=>{
    //do the request
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

  this.PUT = (state)=>{
    //set local state every time stuff is updated on server
    localStorage.setItem(localStorageKey, JSON.stringify(state))

    //only do a request if we don't have one queued up already.   
    if(!timeoutSet){
      timeoutSet = true

      //do the request
      _networkPUT(state)
    }
    else{
      //reset the update interval to x seconds from this last request.
      clearInterval(timeoutID)
      timeout()
    }
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
        "sha"    : data.sha
        })
      })
    })
  }
  

  // //makes sure that the most recent PUT state gets sent to github on starting the app
  // if(localStorage.getItem(localStorageKey) != undefined){
  //   syncLocalWithServer()
  // }
}


export default new API() 