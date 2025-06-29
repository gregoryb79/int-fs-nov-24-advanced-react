import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./MyForm.module.scss";

type MyFormProps = {
    onCancelClick(): void;
};

export function MyForm({ onCancelClick }: MyFormProps) {
    const [originalActiveElement] = useState(document.activeElement);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function preventScroll(e: WheelEvent) {
            const el = e.target as Element;
            const isInsideModal = formRef.current?.contains(el);

            if (!isInsideModal) {
                e.preventDefault();
                return;
            }

            const canScrollDown = el.scrollHeight - el.scrollTop - 1 > el.clientHeight;
            const canScrollUp = el.scrollTop > 0;
            const isScrollingDown = e.deltaY > 0;

            if ((isScrollingDown && canScrollDown) || (!isScrollingDown && canScrollUp)) {
                return;
            }

            e.preventDefault();
        }

        document.addEventListener("wheel", preventScroll, { passive: false });

        return () => {
            document.removeEventListener("wheel", preventScroll);
        };
    }, []);

    useEffect(() => {
        return () => {
            (originalActiveElement as HTMLElement).focus();
        };
    }, [originalActiveElement]);

    function saveCharacter(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        console.log(Object.fromEntries(formData));
    }

    function cancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        onCancelClick();
    }

    return (
        <>
            <div className={styles.backdrop}></div>
            <form className={styles.container} onSubmit={saveCharacter} ref={formRef}>
                <h2>Create character</h2>
                <div className={styles.formField}>
                    <label htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" required minLength={5} maxLength={30} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="class">Class</label>
                    <select className={styles.input} id="class" name="class">
                        <option value="warrior">Warrior</option>
                        <option value="mage">Mage</option>
                        <option value="thief">Thief</option>
                        <option value="cleric">Cleric</option>
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="bio">Bio</label>
                    <textarea className={styles.input} name="bio" id="bio" rows={5}></textarea>
                </div>
                <article>
                    <h3>Stats</h3>
                    <div className={styles.inlineFormField}>
                        <label htmlFor="strength">Strength</label>
                        <input className={styles.input} type="number" id="strength" name="strength" defaultValue={0} />
                    </div>
                    <div className={styles.inlineFormField}>
                        <label htmlFor="intelligence">Intelligence</label>
                        <input className={styles.input} type="number" id="intelligence" name="intelligence" defaultValue={0} />
                    </div>
                    <div className={styles.inlineFormField}>
                        <label htmlFor="agility">Agility</label>
                        <input className={styles.input} type="number" id="agility" name="agility" defaultValue={0} />
                    </div>
                    <div className={styles.inlineFormField}>
                        <label htmlFor="dexterity">Dexterity</label>
                        <input className={styles.input} type="number" id="dexterity" name="dexterity" defaultValue={0} />
                    </div>
                    <div className={styles.inlineFormField}>
                        <label htmlFor="luck">Luck</label>
                        <input className={styles.input} type="number" id="luck" name="luck" defaultValue={0} />
                    </div>
                    <p>Remaining points: <span>35</span></p>
                </article>
                <div className={styles.formActions}>
                    <button className={styles.primaryButton}>Create</button>
                    <button className={styles.secondaryButton} onClick={cancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}
