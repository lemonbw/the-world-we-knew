"use client";
import { useRef, useState, useEffect } from "react";
import Main from "../../components/Main";

export default function ReadingPage() {
  const readingSection = useRef<HTMLElement | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const icon = fullscreen ? "fullscreen_exit" : "fullscreen";

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      readingSection.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () =>
      setFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Main>
      <section
        ref={readingSection}
        id="reading-section"
        className="flex flex-col h-[100vh] w-[80vw] overflow-y-auto border-2 rounded-xl mx-auto mt-4 p-3"
      >
        <div className="w-[70vw] h-10 flex flex-none border-1 rounded-xl mx-auto mb-2">
          <button
            className="material-icons m-auto inline-block text-[2.2rem]! hover:text-[2.4rem]! ease-in-out duration-300"
            onClick={toggleFullScreen}
          >{icon}</button></div>
        <p className="text-[1.4rem]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, suscipit commodi. Hic, accusantium similique, suscipit quam non dicta amet, molestias enim dolorem perferendis ea! Eveniet, accusantium nostrum! Est similique delectus deserunt ducimus perferendis nihil, culpa, obcaecati natus quod sequi ex amet modi officiis dolor quis blanditiis suscipit consectetur. Laudantium dolores, numquam nostrum dolor doloribus quod ad, asperiores non voluptatem maiores aspernatur perferendis. Minima, id illum explicabo non laudantium vero perferendis hic animi perspiciatis rem, nihil nam excepturi doloribus eius cumque saepe corrupti aliquid aliquam impedit, deleniti voluptatum? Nesciunt nostrum optio itaque temporibus, doloremque necessitatibus ipsum in illum eveniet, tempora ad molestias pariatur rem modi odit sapiente ducimus labore. Cumque earum rem at! Est eos ad exercitationem amet? Earum delectus exercitationem minima non esse error corporis quasi nam qui enim recusandae perferendis et sint culpa ipsam aliquid consectetur quos, repellendus veritatis illo ut ab! Deserunt animi minus facere obcaecati ratione cum odit dolorum nihil debitis adipisci eius impedit amet asperiores est eaque quis ullam, et similique. Dicta alias illum, asperiores maiores sequi necessitatibus laboriosam. Illum nemo id deleniti ullam enim, commodi nam reiciendis quisquam exercitationem aperiam optio obcaecati quod labore quo adipisci, fuga voluptatibus doloremque molestias hic. Laborum natus reprehenderit sunt, suscipit, quibusdam adipisci accusantium labore temporibus tenetur veritatis quos, assumenda molestias tempora aliquam ut incidunt atque iste amet. Officiis velit, necessitatibus fugit aliquam tempora neque dolore rem mollitia illo consequuntur inventore! Quas dicta, magni rerum ipsum quidem laborum tempore animi quis ducimus sunt velit ut distinctio qui saepe hic illo laudantium, vitae nisi eaque itaque obcaecati amet! Obcaecati aperiam officia aliquid consequuntur nulla beatae saepe voluptas expedita fuga laudantium quos incidunt odio cupiditate ab commodi natus porro amet excepturi velit, totam itaque, provident dignissimos? Maxime, ratione pariatur dignissimos, illum perspiciatis ipsum iusto eligendi nulla adipisci consequuntur earum et itaque voluptatem? Maxime delectus illum perferendis libero, at odit sit accusantium ex est dignissimos corporis ea cumque voluptatum repellendus facilis reprehenderit quasi quidem ullam magnam aut suscipit placeat a numquam assumenda. Exercitationem quia ut consequuntur est praesentium illo eum dolorem. Est atque, impedit sint facere quae delectus, nisi at deserunt, iure iste illo accusantium. Aspernatur officiis molestiae consequuntur aliquam? Velit, excepturi adipisci. Voluptatibus, delectus. Qui eligendi tempore impedit ex ipsum enim doloremque ullam velit autem corporis, asperiores sunt, cumque, repellendus labore quisquam laudantium! Iure quasi harum commodi atque expedita eum nesciunt consectetur mollitia, cum deleniti veniam odio autem sapiente sunt sequi quia, necessitatibus quod ratione dolores. Eius perspiciatis est ullam perferendis reprehenderit recusandae non inventore rerum ex eveniet impedit voluptatibus, quia, nobis, neque provident exercitationem cumque odio consequuntur minus quam! Eligendi laudantium quis laborum eveniet, beatae ipsum autem molestiae, aut error blanditiis ab totam hic doloremque recusandae dicta adipisci eaque, facilis commodi pariatur temporibus doloribus aspernatur cupiditate numquam? Animi est natus harum suscipit necessitatibus nulla eum dignissimos minima fugit dolorum quod corporis iusto, architecto explicabo quos et numquam ipsa, excepturi recusandae. Cumque, repellat libero minima consequuntur eum natus quibusdam iure, perferendis quas facere, porro fugit possimus. In natus quia quaerat, velit expedita ullam dignissimos deleniti porro earum molestiae incidunt aspernatur. Vitae voluptas ex, ipsum quia veritatis error eaque labore hic consectetur nobis provident, reiciendis alias sequi doloremque laudantium consequuntur! Incidunt magni perspiciatis, tempore fugit corporis temporibus expedita nisi consequatur aliquid maiores nulla! Magnam ab accusamus commodi molestiae architecto officiis quas neque? Repellendus ipsam, molestiae qui autem obcaecati accusamus aspernatur ipsa voluptatibus, nisi mollitia dicta id officiis consequuntur et. Exercitationem aspernatur mollitia ad dolorum, iste esse odit eligendi maiores perferendis cum! Libero in ipsum optio vitae. Officia mollitia quo iusto ratione hic cum a, voluptate impedit dolorem esse. Consequuntur, repellendus? Odit minus aliquam ipsam blanditiis asperiores tempore sequi aut natus iure? Provident maiores, dignissimos doloribus earum eum odit aliquid reiciendis quam atque, repellendus recusandae et quaerat laudantium debitis accusantium error doloremque nesciunt. Sapiente vitae, ab, eius facilis beatae voluptate reprehenderit esse non alias, iste molestiae. Consequatur ducimus adipisci harum expedita nobis voluptatum rerum quos odit commodi dolores ullam deleniti autem similique, enim itaque, asperiores aspernatur! Quis, aut molestiae? Perspiciatis nostrum ratione temporibus, consequatur placeat inventore quasi magnam eos, rerum provident culpa! Recusandae debitis quibusdam corrupti soluta, hic accusantium? Ipsam, saepe ipsa eaque quibusdam eos error, nemo modi expedita in doloremque iure at! Et asperiores beatae voluptatem! Perspiciatis iusto, est excepturi provident aut dolor deserunt dolore sequi hic praesentium ad minus, vero, accusantium necessitatibus sapiente amet voluptatum. Recusandae, nostrum mollitia ipsum, consequuntur cupiditate, ut totam voluptate distinctio esse saepe accusamus odit rerum earum vitae eum maxime cumque sapiente! Neque tempora numquam ab quo suscipit quod iusto porro dolorem delectus, velit culpa dicta impedit quasi excepturi cum fuga nam vel? At cupiditate aliquam illo autem molestiae consequatur temporibus est. Deserunt architecto hic blanditiis? Quaerat a, officia architecto dolorem, possimus, fugiat quo itaque maxime iusto provident eaque amet aliquam nulla dolorum rem! Commodi, officiis. Quibusdam repudiandae hic deserunt cum dolorum voluptate doloribus magni officia alias illum excepturi, earum quasi vel impedit est voluptatibus eaque adipisci numquam fugit, libero nostrum sint praesentium consequuntur? Quisquam aspernatur nostrum sed repudiandae beatae ad minus totam rerum non saepe maxime cum dolores impedit, maiores reprehenderit deserunt quis laudantium quod libero culpa velit ducimus dolore? Recusandae impedit, excepturi exercitationem beatae quidem iure adipisci, eum blanditiis accusamus, debitis dignissimos. Dicta reiciendis praesentium distinctio vero mollitia voluptatem tempore voluptas et veritatis, inventore, dignissimos, eos quod. Vero hic asperiores est dolores iure laborum temporibus itaque quos alias voluptatum amet odio iste eos, ducimus provident. Omnis officiis voluptatem fuga soluta, officia vitae neque magnam cupiditate sapiente praesentium facilis dolorem voluptates maxime ipsum dolor repellendus aliquam? Tempore hic asperiores nihil voluptate adipisci eius quam recusandae, consequuntur debitis quidem. Placeat iure repellat laborum impedit tempore, natus mollitia a ea animi totam beatae quia in voluptates excepturi repellendus facilis delectus ratione nisi maxime commodi itaque. Totam harum eaque incidunt, cupiditate aliquam nulla alias deleniti repellendus, ducimus nostrum corrupti fuga optio molestiae corporis odio velit et illum labore consequuntur. Repellendus tempora temporibus nulla impedit dolorem error alias culpa, quo placeat unde mollitia aut fugit sunt nisi natus, amet ad maiores.
        </p>
      </section>
    </Main>
  )
}
