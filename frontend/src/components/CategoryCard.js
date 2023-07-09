import { NavLink } from "react-router-dom";

const CategoryCard = () => {
  const categories = [
    {
      _id: "db531703-552b-457f-9636-be93b7318bfd",
      categoryName: "Fantasy",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Fantasy.webp?updatedAt=1685900046954",
      description:
        "Fantasy datas involves magic, creatures, quests, and battles between good and evil.",
    },
    {
      _id: "135e068a-6ce6-4dff-9769-0f1f6e516ca7",
      categoryName: "Drama",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Drama.webp?updatedAt=1685900145239",
      description:
        "Drama often portray complex and conflicting human emotions, relationships, and situations.",
    },
    {
      _id: "2c12dac4-315b-4dac-93f0-22316f9d2105",
      categoryName: "Biography",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Biography.webp?updatedAt=1685900145357",
      description:
        "Biography is accurate, comprehensive portrayal of subjects in compelling narratives.",
    },
    {
      _id: "2aad9bce-f932-44bf-8d13-0a0109dcbb5e",
      categoryName: "Non-Fiction",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Non-Fiction.webp?updatedAt=1685900007386",
      description:
        "Non-fiction describes real events, rather than telling a story.",
    },
    {
      _id: "f5645c4e-e81d-40f1-a9ed-3b78fcbee698",
      categoryName: "Horror",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Horror.webp?updatedAt=1685899510911",
      description: "Horror is meant to cause discomfort and fear for readers.",
    },
    {
      _id: "f7898a2d-b1e2-4c97-bf5a-17c3a9d8e246",
      categoryName: "Fiction",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Fiction.webp?updatedAt=1685899510905",
      description:
        "Fiction is Imaginative genre, author's creativity shaping made-up stories.",
    },
    {
      _id: "c4321b6f-53d7-4e9e-81a8-9f35b7a2dcf3",
      categoryName: "Thriller",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Thriller.webp?updatedAt=1685899510859",
      description:
        "Thriller is suspenseful, action-packed genre with unexpected twists and danger.",
    },
    {
      _id: "98765432-1234-5678-9876-543210abcdef",
      categoryName: "Classic",
      imgUrl:
        "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Classic.webp?updatedAt=1685980971579",
      description:
        "Classic books are Enduring masterpieces across genres, timeless tales that inspire readers.",
    },
  ];

  return (
    <>
      {categories.map((data) => (
        <>
          <NavLink to={`/category/${data.categoryName}`} id={data._id} title={data.description}>
            <div>
              <div className="flex flex-col items-center self-start border h-[27rem] border-gray-500 rounded-lg hover:bg-gray-800 hover:border hover:border-gray-700">
                <div className="relative">
                  <img
                    className="w-40 h-56 p-4 rounded-t-lg sm:w-56 sm:h-80"
                    src={data.imgUrl}
                    alt={data.title}
                  />
                  <div className="absolute px-4 ml-4 text-sm leading-7 text-gray-100 bg-gray-600 bottom-6 backdrop-blur-md backdrop-filter bg-clip-padding bg-opacity-20 sm:gap-x-10 md:flex rounded-xl">
                    <span className="cursor-pointer">{data.categoryName}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap content-between justify-center px-5 pb-5 align-middle">
                  <div className="flex flex-col space-y-2">
                    <p className="mx-4 text-sm text-gray-100 sm:block">
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </>
      ))}
    </>
  );
};

export default CategoryCard;