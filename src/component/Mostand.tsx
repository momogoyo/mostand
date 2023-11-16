import { useRef, useEffect, useState } from 'preact/hooks'
import { createStore } from '../lib'

export const Mostand = () => {
  const storeRef = useRef<any>(null)
  const [name, setName] = useState<string>('미더덕')
  const [age, setAge] = useState<number>(0)

  useEffect(() => {
    storeRef.current = createStore((set) => ({
      name,
      age
    }))

    storeRef.current.subscribe(
      (state: any) => state.name,
      (curr: any, prev: any) => {
        console.log(curr, prev)
      }
    )
  }, [])

  const inputName = () => {
    storeRef.current.setState({ name: '현화백' })

    setName(storeRef.current.getState())
  }
  
  const inputAge = () => {
    storeRef.current.setState({ age: 27 })
    setAge(storeRef.current.getState())
  }

  return (
    <div>
      <button onClick={inputName}>이름 입력</button>
      <button onClick={inputAge}>나이 입력</button>
    </div>
  )
}
