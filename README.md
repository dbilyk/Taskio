##Task.io
Task.io is React App that implements state persistence via simple github commit API, drag and drop task re-ordering, and has a few other features like adding points value.  Due dates and tags are not implemented.  Zen mode condenses the toolbar attached to each task into a clean list.  

The network PUT requests are efficiently batched after 1.5 seconds of inactivity so that you don't spam github on every change in the state of your tasks list.






## To set up locally
Clone this repo.
Create a file called GIT_TOKEN.js in /src folder as follows:
```
let GIT_CREDENTIALS = {
  token:'YOUR GITHUB REPO TOKEN', // this can be acquired from github settings
  username: "YOUR GITHUB USERNAME",
  repoName: "YOUR REPO NAME"
}
export default GIT_CREDENTIALS
```

after that, just run npm run start to start create-react-app dev server.  Your tasks will sync to the github repo after any action you perform.
