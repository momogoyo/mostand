type StateType = any
type CreateStateType = (nextState: StateType) => StateType
type SelectorType = (state: StateType) => void
type OptionListenerType = (curr?: any, prev?: any) => any

export const createStore = (
  createState: CreateStateType
) => {
  let state: StateType
  const listeners = new Set<any>()

  const setState = (nextState: StateType) => {
    // const prevState = state
    // state = Object.assign({}, prevState, nextState)
    state = Object.assign({}, state, nextState)
    
    listeners.forEach((listener) => listener(state))
  }
  
  const getState = (): StateType => {
    return state
  }

  const subscribe = (
    selector: SelectorType,
    optListener?: OptionListenerType
  ) => {
    let listener = selector
    
    if (optListener) {
      let currentSlice = selector(api.getState())
      listener = (state: StateType) => {
        const nextSlice = selector(state)
        
        if (!Object.is(currentSlice, nextSlice)) {
          const prevSlice = currentSlice
          optListener((currentSlice = prevSlice), prevSlice)
        }
      }
    }

    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const api = {
    setState,
    getState,
    subscribe
  }
  state = createState(setState)

  return api
}

