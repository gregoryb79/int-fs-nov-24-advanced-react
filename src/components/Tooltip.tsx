import styles from "./Tooltip.module.scss";

export function Tooltip() {
    return (
        <details>
            <summary className={styles.summary}>?</summary>
            <p className={styles.tooltip}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ullam suscipit sapiente consectetur nam ad quisquam, rerum unde hic libero debitis consequuntur, nulla saepe. Aspernatur, commodi reiciendis blanditiis excepturi omnis numquam fugiat error atque quae quas eum optio, voluptatibus, voluptatem ipsam nesciunt. Eius voluptates sint consequuntur ducimus nostrum mollitia velit?</p>
        </details>
    );
}
