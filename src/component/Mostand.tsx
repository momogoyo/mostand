import { useState } from 'preact/hooks'
import { createStore } from '../lib'

export const Mostand = () => {
  const [name, setName] = useState<string>('미더덕')
  const [age, setAge] = useState<string>('unknown')
  
  const useStore = createStore((set) => ({
    name,
    age
  }))

  useStore.subscribe(
    (state) => state.name,
    () => {
      const { name } = useStore.getState()
      setName(name)
    }
  )
  
  useStore.subscribe(
    (state) => state.age,
    (curr, prev) => {
      const { age } = useStore.getState()
      setAge(age)
    }
  )

  const onClickName = () => {
    useStore.setState({ name : '현화백' })
  }

  const onClickAge = () => {
    useStore.setState({ age : '27' })
  }

  return (
    <div>
      <table>
        <tr>
          <th>이름</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>나이</th>
          <td>{age}</td>
        </tr>
      </table>

      <br />

      <button onClick={onClickName}>이름 입력</button>
      <button onClick={onClickAge}>나이 입력</button>
    </div>
  )
}
