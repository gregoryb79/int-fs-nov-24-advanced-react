import { useReducer, useRef, type KeyboardEvent } from "react";
import styles from "./RichTextEditor.module.scss";

type CursorPosition = { x: number, y: number };

type State = {
    text: string,
    cursorPosition: CursorPosition,
};
type Action =
    | { type: "insert", value: string }
    | { type: "backspace" }
    | { type: "delete" }
    | { type: "move cursor", by: number };

const clamp = (min: number, num: number, max: number) => Math.max(min, Math.min(max, num));

const getAbsoluteCursorPosition = (state: State) => state.cursorPosition.x;

function reducer(state: State, action: Action): State {
    const { text, cursorPosition } = state;
    const absoluteCursorPosition = getAbsoluteCursorPosition(state);

    switch (action.type) {
        case "insert": return {
            ...state,
            text: text.slice(0, absoluteCursorPosition) + action.value + text.slice(absoluteCursorPosition),
            cursorPosition: {
                ...cursorPosition,
                x: cursorPosition.x + 1,
            },
        };
        case "backspace": return absoluteCursorPosition === 0 ? state : {
            ...state,
            text: text.slice(0, absoluteCursorPosition - 1) + text.slice(absoluteCursorPosition),
            cursorPosition: {
                ...cursorPosition,
                x: cursorPosition.x - 1,
            },
        };
        case "delete": return absoluteCursorPosition === text.length ? state : {
            ...state,
            text: text.slice(0, absoluteCursorPosition) + text.slice(absoluteCursorPosition + 1),
        };
        case "move cursor": return {
            ...state,
            cursorPosition: {
                ...cursorPosition,
                x: clamp(0, cursorPosition.x + action.by, text.length)
            },
        };
    }
}

const initialState: State = {
    text: "",
    cursorPosition: { x: 0, y: 0 },
};

export function RichTextEditor() {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );
    const absoluteCursorPosition = getAbsoluteCursorPosition(state);
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

        if (e.key === "Delete") {
            e.preventDefault();
            dispatch({ type: "delete" });
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
            {state.text.slice(0, absoluteCursorPosition)}<span className={styles.cursor} ref={cursorRef}>|</span>{state.text.slice(absoluteCursorPosition)}
        </div>
    );
}
