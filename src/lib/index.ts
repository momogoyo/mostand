type StateType = Object
type CreateStateType = (nextState: StateType) => StateType
type SelectorType = (state: StateType) => void
type OptionListenerType = (curr: any, prev: any) => any

export const createStore = (
  createState: CreateStateType
) => {
  let state: StateType
  // listener는 상태를 감지하고 상태 변화가 있을 때 상태 변화를 담은 집합
  const listeners = new Set<any>()
  
  const setState = (nextState: StateType) => {
    const prevState = state
    state = Object.assign({}, state, nextState)
    
    // 등록된 리스너에 대한 순회
    listeners.forEach((listener) => listener(state, prevState))
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
        
        // 두 값이 같은 값 인지 확인
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

