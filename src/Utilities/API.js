import URLs from "./URLs"

function API(){
  let pathToTaskDataFile = URLs.gitAPI

  this.GET_STATE = ()=>{
    return fetch(pathToTaskDataFile,{
      method:"GET"

    }).then((response)=>{
      console.log(response.json())
    })
  }


}


export default new API() 