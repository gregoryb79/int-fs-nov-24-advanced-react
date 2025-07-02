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
    | { type: "newline" }
    | { type: "move cursor horizontal", by: number };

const clamp = (min: number, num: number, max: number) => Math.max(min, Math.min(max, num));

const getAbsoluteCursorPosition = ({ cursorPosition, text }: State) => cursorPosition.x + text.split("\n").slice(0, cursorPosition.y).reduce((sum, line) => sum + line.length + 1, 0);

const getCursotPosition = (absolutePosition: number, text: string): CursorPosition => {
    const lines = text.slice(0, absolutePosition).split("\n");

    return {
        y: lines.length - 1,
        x: lines.at(-1)!.length,
    };
};

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
                x: cursorPosition.x === 0 ? text.split("\n")[cursorPosition.y - 1].length : cursorPosition.x - 1,
                y: cursorPosition.x === 0 ? cursorPosition.y - 1 : cursorPosition.y,
            },
        };
        case "delete": return absoluteCursorPosition === text.length ? state : {
            ...state,
            text: text.slice(0, absoluteCursorPosition) + text.slice(absoluteCursorPosition + 1),
        };
        case "newline": return {
            ...state,
            text: text.slice(0, absoluteCursorPosition) + "\n" + text.slice(absoluteCursorPosition),
            cursorPosition: {
                x: 0,
                y: cursorPosition.y + 1,
            },
        };
        case "move cursor horizontal": return {
            ...state,
            cursorPosition: getCursotPosition(clamp(0, absoluteCursorPosition + action.by, text.length), text),
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
        //  * Support up and down arrows (maintain horizontal position)
        //  * Support home and end
        //  * Support ctrl + stuff
        //  * Support shift
        //  * Support mouse cursor control
        //  * Support text highlighting
        //  * Support switching writing direction (ctrl + shift)
        // console.log(e.key);

        if (e.key.length === 1) {
            e.preventDefault();
            dispatch({ type: "insert", value: e.key });
        }

        if (e.key === "Enter") {
            e.preventDefault();
            dispatch({ type: "newline" });
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
            dispatch({ type: "move cursor horizontal", by: -1 });
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            dispatch({ type: "move cursor horizontal", by: 1 });
        }
    }

    return (
        <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
            {state.text.slice(0, absoluteCursorPosition)}<span className={styles.cursor} ref={cursorRef}>|</span>{state.text.slice(absoluteCursorPosition)}
        </div>
    );
}
