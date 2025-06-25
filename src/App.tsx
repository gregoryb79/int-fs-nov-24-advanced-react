import { useState } from "react";
import { createPortal } from "react-dom";
import { MyForm } from "./components/MyForm";
import { Tooltip } from "./components/Tooltip";

import styles from "./App.module.scss";

export function App() {
  return (
    <main className={styles.container}>
      <h1>Advanced React</h1>
      <CharacterForm />
      <article>
        <h2>About this app</h2>
        <Tooltip />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores ut esse fugiat, sit alias. Et tempora, aperiam nemo deserunt quo consequatur nesciunt suscipit illo facere facilis totam perspiciatis omnis aliquam ipsam! Veniam porro velit a alias mollitia autem repellat debitis maxime odio similique vero iure eaque minus ex maiores voluptatum deserunt qui quibusdam unde ea itaque, enim illum fugit. Doloribus reprehenderit beatae voluptatum aspernatur animi at doloremque sapiente quas maxime dolorum quibusdam laboriosam atque similique excepturi error autem nihil praesentium hic aliquid consectetur suscipit illum, magnam, necessitatibus debitis? Iste earum, a assumenda, facilis reprehenderit nobis exercitationem error beatae ullam consequatur corrupti voluptate ad aliquid numquam nam autem hic amet. Corrupti ducimus aspernatur labore? Dolores unde doloribus similique atque. Sequi alias dicta impedit provident iste nisi, sed nemo veritatis eaque ratione distinctio eum sit dolor architecto? At libero aperiam labore perferendis perspiciatis magnam nesciunt vitae doloribus recusandae harum blanditiis consequuntur velit saepe optio, corporis id mollitia nam dolore, officiis natus voluptas officia odio totam commodi? Placeat, inventore. Accusantium molestias aliquid sapiente, voluptatibus molestiae totam temporibus id voluptate consectetur tempora quidem similique alias nisi nam nulla ab doloremque officiis nesciunt quas. Doloribus numquam repudiandae dolore ullam adipisci quis tenetur velit minus aspernatur expedita nisi possimus quidem facilis eum architecto assumenda nobis dignissimos quo enim quas, harum cum ipsum omnis veniam. Molestias temporibus quod, doloribus animi sed modi id enim impedit at voluptatum porro suscipit voluptatem atque voluptatibus omnis dicta delectus expedita nihil vitae, a non autem culpa obcaecati ducimus! Omnis suscipit nulla sapiente officia, facere, mollitia tempora odio quod quia eligendi commodi molestias, voluptates quo cumque dicta natus aspernatur explicabo obcaecati tempore dolore. Ad obcaecati, reiciendis impedit doloribus cum aperiam labore deleniti repudiandae inventore magni sapiente iste ab excepturi unde odit corporis cumque accusantium veritatis repellat iusto rem! Unde cumque ipsam, fugiat itaque in ea voluptate culpa porro maiores explicabo fuga reprehenderit necessitatibus id aliquam omnis blanditiis veniam nesciunt. Eos, velit vel obcaecati illum perspiciatis dignissimos nam nobis odio et impedit? Dolorem, officia! Libero ipsam veniam odit! Perferendis eos fugiat adipisci provident dicta tempora est recusandae? Nesciunt libero minima doloribus, a assumenda illo maxime quos minus, distinctio quidem odit laboriosam deserunt porro. Aliquam quibusdam explicabo fugit ipsam perferendis, pariatur, adipisci neque ratione suscipit, harum eaque velit illo veniam vel eius? Possimus sed blanditiis, animi vitae fugiat ullam. Non iste dicta molestiae fugit facere perferendis architecto quam neque suscipit! Reiciendis minus cumque sunt dolorem, at, voluptatum ea molestias iste ab neque quibusdam eaque vel. Quis quos hic possimus asperiores neque vitae ducimus voluptatum ullam commodi est, magnam nulla odio tempora iusto voluptatibus quaerat deserunt odit? Dignissimos neque fugiat quisquam explicabo labore, sapiente reprehenderit magni mollitia dolorem illum excepturi tempore? Blanditiis numquam nihil maxime possimus ex illum! Impedit excepturi suscipit, id soluta nulla explicabo delectus harum inventore obcaecati expedita laboriosam, beatae dignissimos corrupti aspernatur eaque. Doloribus, quas suscipit. Laboriosam unde a voluptatum, facilis iure iusto odio eos corporis qui. Minima dolorum ea porro quo officia! Explicabo facere sit excepturi optio veniam aliquam perferendis.</p>
      </article>
    </main>
  )
}

function CharacterForm() {
  const [isFormShown, setIsFormShown] = useState(false);

  return (
    <>
      <button onClick={() => setIsFormShown(true)}>Create character</button>
      {isFormShown && createPortal(<MyForm onCancelClick={() => setIsFormShown(false)} />, document.getElementById("modals")!)}
    </>
  );
}
