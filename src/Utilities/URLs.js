import GIT_CREDENTIALS from "./GIT_TOKEN" 

let strings = {
  iconURL:{
    addTask:"/img/icon/add-task.png",
    chevron:"/img/icon/chevron.png", 
    completeTask:"/img/icon/complete-task.png",
    filters:"/img/icon/filters.png",
    grabber:"/img/icon/grabber.png",
    incompleteTask:"/img/icon/incomplete-task.png",
    menu:"/img/icon/menu.png",
    tag:"/img/icon/tag.png",
    time:"/img/icon/time.png",
    zen:"/img/icon/Z.png",
  },
  gitAPI:"https://api.github.com/repos/"+ GIT_CREDENTIALS.username+"/"+GIT_CREDENTIALS.repoName+"/contents/src/TASK_DATA.json?access_token=" + GIT_CREDENTIALS.token
}

export default strings