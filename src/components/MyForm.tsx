import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./MyForm.module.scss";

type MyFormProps = {
    onCancelClick(): void;
};

export function MyForm({ onCancelClick }: MyFormProps) {
    const [originalActiveElement] = useState(document.activeElement);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function preventScroll(e: Event) {
            if (formRef.current?.contains(e.target as Element)) {
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
                <p style={{ height: 100, overflow: "auto" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eligendi natus suscipit aperiam! Iste, neque. Repellat, reprehenderit porro laudantium sint perferendis, ipsum reiciendis illo consectetur et temporibus ipsa voluptates iure alias suscipit, adipisci praesentium laboriosam velit consequuntur nihil delectus dolor neque tempore eum. Ex sit aliquam rem maxime id optio, eum temporibus inventore. Aspernatur ipsam consequatur dicta distinctio numquam, minima voluptatem labore vel fugiat, molestias natus ipsum ullam saepe qui! Distinctio ratione quam eveniet quae possimus quo velit consequuntur corporis rerum voluptatibus? Cupiditate, recusandae non quisquam quam soluta sapiente deserunt nihil accusantium molestiae ipsum porro, reiciendis aliquid fuga quis nesciunt asperiores culpa ullam! Eum fuga ipsum temporibus vel facere eligendi, expedita accusantium nemo libero cum illo a eos quaerat in recusandae est maiores architecto minus natus commodi similique quis? Ut quaerat excepturi quis vel ad consequuntur at quod fuga sed distinctio illo nulla sapiente totam et, iste officia consectetur rerum atque. Corrupti ratione consectetur, provident laboriosam vel recusandae rem porro reprehenderit, sed et fugiat suscipit error optio illo. Facilis ratione minus, quaerat deleniti fugiat enim eligendi nemo ipsum ut nostrum temporibus voluptatum odio aliquid cupiditate obcaecati explicabo modi delectus iste odit vero doloremque iusto maxime tenetur! Expedita placeat dolores iure quia ipsam veniam fugit facilis laudantium. Eum unde delectus corporis sint architecto alias aspernatur? Dolore ipsam deserunt eaque aspernatur veritatis, voluptatum recusandae unde nostrum natus suscipit dolorem quam ipsum cum numquam quibusdam vero quidem quod. Explicabo veritatis expedita corrupti iure optio blanditiis adipisci, voluptate a mollitia debitis, nemo fuga magni eaque odit officiis officia, necessitatibus voluptatem quaerat esse similique dicta possimus. Praesentium ad recusandae quos reprehenderit qui, culpa voluptatem error sed minima eum non numquam iusto placeat laboriosam, doloribus fugiat deleniti quidem cum incidunt sit architecto. Explicabo eaque reiciendis magni, libero doloremque velit modi dolorem accusamus accusantium ut eligendi deserunt tenetur optio praesentium distinctio eos est rerum aperiam labore nemo vel adipisci pariatur blanditiis. Quos aut nemo modi earum magnam distinctio ipsa, tenetur, facere placeat possimus eius repellat magni blanditiis nobis corporis ex sequi autem! Culpa quo veritatis illum fugiat eum similique obcaecati nisi nostrum blanditiis doloremque voluptates fuga quas, quisquam molestiae odit quaerat? Temporibus repellendus minus dolor vitae quod nostrum sit, quam ea suscipit deleniti eum corporis in labore nihil. Possimus, quasi voluptate esse eaque sunt voluptas unde laborum impedit, tempore illo, modi dignissimos quos quisquam ut voluptatem quod quas dolore architecto vel quaerat quidem! Illo, dicta? Maiores necessitatibus tempore vero facilis doloremque molestias iusto iste porro consequatur expedita amet, magnam debitis quas veritatis sapiente repellendus rem. Praesentium, laudantium. Quibusdam voluptate asperiores neque non ratione quas. Ipsa ipsam voluptate, impedit perspiciatis ad molestias sint odio tenetur magnam officiis dolor nam aspernatur exercitationem, ab vero enim? Fugiat ratione voluptates adipisci quaerat magni voluptatibus maxime! Soluta, consequatur. Totam, rem facere odit quae accusamus quos tempora eos facilis iure sequi et voluptatibus, nobis corporis unde quasi! Fuga quo at deserunt maxime ullam dolores quia aspernatur explicabo recusandae cumque, ipsam nostrum perferendis ex debitis quidem autem error fugit modi. Voluptate ipsam quam officiis.</p>
                <div className={styles.formActions}>
                    <button className={styles.primaryButton}>Create</button>
                    <button className={styles.secondaryButton} onClick={cancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}
