import { useEffect, useState, useReducer } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const startingCount = { count: 0 };

const countReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return startingCount;
    default:
      throw new Error();
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(countReducer, startingCount);
  const [currentColor, setCurrentColor] = useState(colors.yellow);

  const handleCount = (e) => {
    e.preventDefault();
    dispatch();
  };

  useEffect(() => {
    if (state.count === 0) {
      setCurrentColor(colors.yellow);
    }

    if (state.count > 0) {
      setCurrentColor(colors.green);
    }

    if (state.count < 0) {
      setCurrentColor(colors.red);
    }
  }, [state.count]);

  return (
    <main className={styles.main}>
      <h1 style={{ color: currentColor }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'decrement' })}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={() => dispatch({ type: 'reset' })}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
