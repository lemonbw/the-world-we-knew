export default function Description() {

  const genres = ["хоррор", "военная проза", "тёмное фэнтези", "научная фантастика", "романтика"]

  return (
    <div className="border-1 rounded-xl *:text-xl">
      <p className="max-w-[80ch] p-2 select-text" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt officia nam illo corrupti dicta eum quasi itaque voluptate animi fuga voluptas iste consequatur ducimus nostrum qui delectus, odit vel odio sapiente id iusto consequuntur enim porro ut. Corporis quas vel, alias eligendi similique asperiores quam eaque totam possimus officia magni provident quidem eos consequatur illum iste tempore laboriosam hic distinctio minus perferendis delectus, doloremque ut porro? Accusamus expedita corporis quia? Ipsa sequi repellat voluptatum, qui inventore, non tenetur numquam nam consequuntur dolorem, sunt est ad quidem ullam reprehenderit omnis doloremque. Minus ab vitae inventore, praesentium corporis qui nostrum tempore. Laborum numquam fuga asperiores delectus in molestias omnis laboriosam cumque minus expedita, aut, provident est. Ipsum numquam nostrum beatae voluptate ullam deserunt, harum fuga expedita impedit tempora! Facilis animi dolorem consequatur eveniet obcaecati. Tempora voluptatibus maxime mollitia quos totam voluptates quo autem a tenetur non unde officiis omnis repudiandae cumque, similique minima quisquam consectetur. Nam a earum harum nostrum quae commodi neque hic vel quo consequuntur! Temporibus, tenetur quam! Dolores distinctio, voluptates voluptate, veniam nostrum sed quas nisi ut rerum similique impedit fugit fuga aut porro aliquid eligendi consequuntur placeat architecto omnis enim velit cum maxime perferendis dolorum? Recusandae, qui quis.</p >
      <div className="flex flex-row gap-2 p-1 *:px-1 *:border-1 *:rounded-sm *:hover:text-black *:hover:bg-white *:duration-300">
        {genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}
      </div>
    </div >
  )
}
