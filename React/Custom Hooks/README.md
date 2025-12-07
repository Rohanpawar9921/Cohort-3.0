# Custom Hooks Notes

A lightweight playground for practicing React custom hooks inside a Vite project. These notes capture how each hook works, what problems it solves, and gotchas discovered while experimenting.

## Project Setup
- `npm install` to pull React, Vite, and ESLint deps.
- `npm run dev` serves the demo at `http://localhost:5173` with HMR.
- Hooks live in `src/hooks/`; `App.jsx` toggles between experiments, most of which are currently commented out so you can focus on one hook at a time.

## Hook Catalog

### `useCounter`
Simple stateful counter extracted for reuse inside `Counter`.

```jsx
function useCounter() {
	const [count, setCount] = useState(0);
	const increaseCount = () => setCount(count + 1);
	return { count, increaseCount };
}
```

`Counter` consumes it, so any component can get an isolated counter without rewriting state logic.

### `usePostTitle`
Fetches a single post (`/posts/1`) from JSONPlaceholder and returns only the title, keeping fetch logic outside the component.

**Usage**
```jsx
const title = usePostTitle();
return <p>Latest title: {title}</p>;
```

**Notes**
- Runs once on mount due to the empty dependency array.
- Currently hard-codes the endpoint; extend it by passing an id or URL argument.

### `useFetch(url, timeout)`
Generalized polling hook that:
1. Fetches `url` immediately.
2. Re-fetches every `timeout` seconds.
3. Returns `{ post, loading }`, where `post` is the fetched object's `title` for convenience.

**Usage**
```jsx
const { post, loading } = useFetch(`https://jsonplaceholder.typicode.com/posts/${currPost}`, 5);

if (loading) return <p>Loading…</p>;
return <p>Post title: {post}</p>;
```

**Implementation Notes**
- The polling interval uses `setInterval` without cleanup; add `clearInterval` in an effect cleanup to prevent duplicate timers when `timeout` changes or the component unmounts.
- If you need the entire response body, return `data` instead of only `data.title`.
- Always guard `timeout` (e.g., default to `10`) so `setInterval` is not called with `undefined`.

### `usePrev(value)`
Stores the previous value of any piece of state by combining `useRef` with an effect.

```jsx
const count = useCounter();
const prevCount = usePrev(count);
```

Use it when you need to compare current vs. previous values (animations, analytics, diffing logic, etc.). Remember that `prevCount` is `undefined` on the first render because the effect that copies the value runs after paint.

### `useDebounce`
`src/hooks/useDebounce.js` is currently empty, so treat this as a placeholder for a future hook that delays reacting to rapid input. A typical signature would look like `useDebounce(value, delay)` returning the debounced value. Consider wiring it up next to practice cleanup timers.

## Study Notes & Next Steps
- Clean up timers inside `useFetch` and consider exposing an abort controller for race-safe fetches.
- Move repeated fetch logic (e.g., `usePostTitle`) to `useFetch` by allowing consumers to pass a `select` function.
- Flesh out `useDebounce` and document it alongside the rest of the hooks.
- Add lightweight tests (React Testing Library + Vitest) for hooks that contain timing logic to catch regressions early.
