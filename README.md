# mostand
mostand는 React와 함께 자주 사용되는 zustand 상태관리 라이브러리의 구조를 반영해서 만들었습니다.

**'상태'** 란 애플리케이션에서 시간에 따라 변경될 수 있는 데이터를 의미합니다.
사용자 입력에 따른 UI, 서버에 대한 응답 등이 이에 해당되는데요,
데이터를 추적하고 갱신하고 관리하는 과정으로 프론트엔드 분야에서 핵심적인 부분입니다.
애플리케이션을 효율적으로 개발하고 관리하기 위해서는 필수로 알아야하는 중요한 개념으로 내부 동작을 잘 이해하기 위해 작성하였습니다.

### createStore
- 상태 변경 역할을 해주는 `setState` 함수를 인자값으로 가집니다.
- 객체 리터럴`({})`을 반환합니다.

```jsx
const useStore = createStore((set) => ({}))
```

set은 setState와 같은 역할을 합니다.

```jsx
const useStore = createStore((set) => ({
	count: 1,
	increase: set((state) => ({ count: state.count + 1 }))
}))
```

#### setState 
- 함수 본문을 나타내는 구조로, 객체 리터럴을 반환하지 않습니다.
- 즉, setState는 리턴 값 없이 함수 본문을 실행하는 함수입니다.

```jsx
const setState = (nextState) => {}
```

- nextState는 `(state) => ({ count: state.count + 1 })` 이고, `{ count: state.count + 1 }`를 리턴합니다.
  
- 이전 state 저장하기
- state 업데이트 쳐주기
- 등록된 리스너들에 대한 순회를 하며 state가 업데이트 되었을 때의 로직을 처리할 수 있도록 합니다.

```jsx
const setState = (nextState) => {
	const prevState = state

	// state를 업데이트
	// nextState는 { count: 1 }
	state = Object.assign({}, state, nextState)

	// 등록된 listeners 순회하며 listener 함수 실행
	listeners.forEach((listener) => listener(state))
}
```

#### subscribe
- 상태가 변경될 때마다 실행됩니다.
- 사용자가 정의한 selector 함수 또는 optListener 함수가 있는 경우 변경된 listener(state 변경을 관리할 함수)를 listeners에 등록

```jsx
const subscribe = (
	selector,
	optListener
) => {
	let listener = selector

	// 현재 state
	const currentSlice = selector(api.getState())
	listener = (state) => {
		// 변경된 state
		const nextSlice = selector(state)
		
		// 값이 변경된게 맞는지 체크
		if (!Object.is(currentSlice, nextSlice)) {}
	}

	listeners.add(listener)

	// 더 이상 상태 변화에 반응할 필요가 없을 때 해당 listener 함수를 제거
	return () => listeners.delete(listener)
}
```
