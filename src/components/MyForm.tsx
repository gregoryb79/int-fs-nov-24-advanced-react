import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
import styles from "./MyForm.module.scss";
import { Dropdown, Option } from "./Dropdown";

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
                    {/* <select className={styles.input} id="class" name="class">
                        <option value="warrior">Warrior</option>
                        <option value="mage">Mage</option>
                        <option value="thief">Thief</option>
                        <option value="cleric">Cleric</option>
                    </select> */}
                    <Dropdown id="class" name="class">
                        <Option value="warrior">Warrior</Option>
                        <Option value="mage">Mage</Option>
                        <Option value="thief">Thief</Option>
                        <Option value="cleric">Cleric</Option>
                    </Dropdown>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="bio">Bio</label>
                    <textarea className={styles.input} name="bio" id="bio" rows={5}></textarea>
                </div>
                <CharacterStats />
                <div className={styles.formActions}>
                    <button className={styles.primaryButton}>Create</button>
                    <button className={styles.secondaryButton} onClick={cancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}

const pointsToDistribute = 35;

type Stat = "strength" | "intelligence" | "agility" | "dexterity" | "luck";
type Distribution = Record<Stat, number>;
type Action = { stat: Stat, newValue: number };


function isValidDistribution(stats: Record<Stat, number>) {
    return stats.agility + stats.dexterity + stats.intelligence + stats.luck + stats.strength <= pointsToDistribute;
}

function updateDistribution(distribution: Distribution, action: Action): Distribution {
    const updatedDistribution: Distribution = {
        ...distribution,
        [action.stat]: action.newValue,
    };

    return isValidDistribution(updatedDistribution) ? updatedDistribution : distribution;
}

const startingDistribution: Distribution = {
    strength: 5,
    intelligence: 5,
    agility: 5,
    dexterity: 5,
    luck: 5
};

function CharacterStats() {
    const [distribution, dispatch] = useReducer(updateDistribution, startingDistribution);

    const remainingPoints = pointsToDistribute - (distribution.strength + distribution.intelligence + distribution.agility + distribution.dexterity + distribution.luck);

    const updateStat = (stat: Stat) => (e: FormEvent<HTMLInputElement>) => {
        dispatch({ stat, newValue: e.currentTarget.valueAsNumber ?? 0 });
    };

    return (
        <article>
            <h3>Stats</h3>
            <div className={styles.inlineFormField}>
                <label htmlFor="strength">Strength</label>
                <input className={styles.input} type="number" min={0} id="strength" name="strength" value={distribution.strength} onInput={updateStat("strength")} />
            </div>
            <div className={styles.inlineFormField}>
                <label htmlFor="intelligence">Intelligence</label>
                <input className={styles.input} type="number" min={0} id="intelligence" name="intelligence" value={distribution.intelligence} onInput={updateStat("intelligence")} />
            </div>
            <div className={styles.inlineFormField}>
                <label htmlFor="agility">Agility</label>
                <input className={styles.input} type="number" min={0} id="agility" name="agility" value={distribution.agility} onInput={updateStat("agility")} />
            </div>
            <div className={styles.inlineFormField}>
                <label htmlFor="dexterity">Dexterity</label>
                <input className={styles.input} type="number" min={0} id="dexterity" name="dexterity" value={distribution.dexterity} onInput={updateStat("dexterity")} />
            </div>
            <div className={styles.inlineFormField}>
                <label htmlFor="luck">Luck</label>
                <input className={styles.input} type="number" min={0} id="luck" name="luck" value={distribution.luck} onInput={updateStat("luck")} />
            </div>
            <p>Remaining points: <span>{remainingPoints}</span></p>
        </article>
    );
}
