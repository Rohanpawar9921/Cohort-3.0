# Recoil Notes

Quick refresher on the pieces you need to wire up Recoil in a React + Vite app.

## Why Recoil?
- Minimal boilerplate for shared state with React Suspense support
- Atom-based updates keep renders localized
- Selectors make derived/async state easy to express

## Install
```bash
npm install recoil
```

## Minimum Setup Checklist
1. Wrap the app with `RecoilRoot` in `main.jsx`.
2. Define atoms/selectors in dedicated files under `src/state/` (or similar).
3. Use `useRecoilState`/`useRecoilValue` hooks inside components.

```jsx
// src/main.jsx
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</StrictMode>
);
```

## Core Concepts
| Concept | Notes |
| --- | --- |
| Atom | Single source of truth; update triggers subscribers. |
| Selector | Pure or async derived value; memoized based on dependencies. |
| `RecoilRoot` | Context provider; one per React tree. |
| Family | Factory for parameterized atoms/selectors. |

### Atom Example
```jsx
// src/state/todoState.js
import { atom } from 'recoil';

export const todoListState = atom({
	key: 'todoListState',
	default: [],
});
```

### Selector Example
```jsx
import { selector } from 'recoil';
import { todoListState } from './todoState';

export const completedTodoState = selector({
	key: 'completedTodoState',
	get: ({ get }) => get(todoListState).filter((todo) => todo.done),
});
```

## Hooks Cheat Sheet
- `useRecoilState(atom)` -> read/write (like `useState`).
- `useRecoilValue(atomOrSelector)` -> read only.
- `useSetRecoilState(atom)` -> write only.
- `useResetRecoilState(atom)` -> reset to `default`.
- `useRecoilCallback(cb)` -> imperative access for events or async flows.

## Async Selectors
```jsx
export const userQuery = selector({
	key: 'userQuery',
	get: async ({ get }) => {
		const id = get(selectedUserIdState);
		const res = await fetch(`/api/users/${id}`);
		if (!res.ok) throw new Error('Failed to load user');
		return res.json();
	},
});
```
Wrap consumers with `<Suspense fallback="..." />` or use `useRecoilValueLoadable` for manual loading/error handling.

## Common Patterns
- **Atom effects** for persistence (localStorage), logging, or bridging to other stores.
- **Selector families** for dynamic queries (`selectorFamily({ key, get: (id) => ... })`).
- **Split atoms** to avoid megastores; keep default values serializable.

## Debugging & Testing
- Install Recoil DevTools browser extension for live atom inspection.
- `useRecoilTransactionObserver_UNSTABLE` helps trace complex updates.
- For tests, wrap components with `RecoilRoot` and provide mock defaults via `<RecoilRoot initializeState={...} />`.

## Helpful Links
- Docs: https://recoiljs.org
- API Reference: https://recoiljs.org/docs/api-reference/core/atom
- Patterns & Recipes: https://recoiljs.org/docs/guides
