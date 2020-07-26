import { createStore, Action, Reducer } from 'redux'


const initState: AppState = {
  greeting: 'howdy'
}

function deepCopy (obj1: any): any {
  return JSON.parse(JSON.stringify(obj1))
}

const reducer: Reducer<AppState, Action> = (oldState: (AppState | undefined),action: Action) => {
  
  const newState: AppState = (oldState) ? deepCopy(oldState) : initState
  const actionType: string = action.type

  if (actionType === "SEARCH") {
    newState.greeting = "goodbye"
  }

  else if (actionType === "") {
    
  }

  return newState
}

export default () => createStore(reducer)
