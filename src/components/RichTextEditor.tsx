import { useReducer, type KeyboardEvent } from "react";
import styles from "./RichTextEditor.module.scss";

type State = string;
type Action =
    | { type: "append", value: string }
    | { type: "backspace" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "append": return state + action.value;
        case "backspace": return state.slice(0, -1);
    }
}

const initialState: State = "Rich text editor";

export function RichTextEditor() {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        // TODO:
        //  * Show cursor only when focused
        //  * Move cursor back and forward with left and right arrow keys
        //  * Always keep cursor in view
        console.log(e.key);
        
        if (e.key.length === 1) {
            e.preventDefault();
            dispatch({ type: "append", value: e.key });
        }

        if (e.key === "Enter") {
            e.preventDefault();
            dispatch({ type: "append", value: "\n" });
        }

        if (e.key === "Tab") {
            e.preventDefault();
            dispatch({ type: "append", value: "\t" });
        }

        if (e.key === "Backspace") {
            e.preventDefault();
            dispatch({ type: "backspace" });
        }
    }

    return (
        <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
            {state}<span className={styles.cursor}>|</span>
        </div>
    );
}
