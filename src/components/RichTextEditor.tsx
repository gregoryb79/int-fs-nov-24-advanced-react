import { useReducer, type KeyboardEvent } from "react";
import styles from "./RichTextEditor.module.scss";

type State = string;
type Action = string;

function reducer(state: State, action: Action): State {
    return state + action;
}

const initialState: State = "Rich text editor";

export function RichTextEditor() {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        // TODO:
        //  * Handle uppercase letters
        //  * Handle space
        //  * Handle tab
        //  * Handle return
        //------------------------------
        //  * Handle backspace
        console.log(e.key);
        
        if (e.key >= "a" && e.key <= "z") {
            e.preventDefault();
            dispatch(e.key);
        }
    }

    return (
        <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
            {state}
        </div>
    );
}
