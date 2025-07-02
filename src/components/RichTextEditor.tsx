import { useReducer, useRef, type KeyboardEvent } from "react";
import styles from "./RichTextEditor.module.scss";

type State = {
    text: string,
    cursorPosition: number,
};
type Action =
    | { type: "insert", value: string }
    | { type: "backspace" }
    | { type: "move cursor", by: number };

const clamp = (min: number, num: number, max: number) => Math.max(min, Math.min(max, num));

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "insert": return {
            ...state,
            text: state.text.slice(0, state.cursorPosition) + action.value + state.text.slice(state.cursorPosition),
            cursorPosition: state.cursorPosition + 1,
        };
        case "backspace": return state.cursorPosition === 0 ? state : {
            ...state,
            text: state.text.slice(0, state.cursorPosition - 1) + state.text.slice(state.cursorPosition),
            cursorPosition: state.cursorPosition - 1,
        };
        case "move cursor": return {
            ...state,
            cursorPosition: clamp(0, state.cursorPosition + action.by, state.text.length),
        };
    }
}

const initialState: State = {
    text: "",
    cursorPosition: 0,
};

export function RichTextEditor() {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );
    const cursorRef = useRef<HTMLSpanElement>(null);

    cursorRef.current?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
    });

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        // TODO:
        //  * Support Delete button
        //  * Support up and down arrows (maintain horizontal position)
        //  * Support home and end
        // console.log(e.key);
        
        if (e.key.length === 1) {
            e.preventDefault();
            dispatch({ type: "insert", value: e.key });
        }

        if (e.key === "Enter") {
            e.preventDefault();
            dispatch({ type: "insert", value: "\n" });
        }

        if (e.key === "Tab") {
            e.preventDefault();
            dispatch({ type: "insert", value: "\t" });
        }

        if (e.key === "Backspace") {
            e.preventDefault();
            dispatch({ type: "backspace" });
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            dispatch({ type: "move cursor", by: -1 });
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            dispatch({ type: "move cursor", by: 1 });
        }
    }

    console.log(state.cursorPosition);

    return (
        <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
            {state.text.slice(0, state.cursorPosition)}<span className={styles.cursor} ref={cursorRef}>|</span>{state.text.slice(state.cursorPosition)}
        </div>
    );
}
