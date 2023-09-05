import { usePlayer } from "../hooks/usePlayer";
import { Songs } from "../assets/songs";

interface LibraryProps {
  isLibraryVisible: boolean;
  setIsLibraryVisible: (a: boolean) => void;
}

const Library = ({ isLibraryVisible, setIsLibraryVisible }: LibraryProps) => {
  const { song, setSong } = usePlayer();

  const pickSound = (id: number) => {
    setSong(id);
    setIsLibraryVisible(false);
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 transition-all duration-200 ease-in-out delay-0 ${
          isLibraryVisible
            ? " visible bg-opacity-50"
            : " invisible bg-opacity-0"
        }`}
        onClick={() => setIsLibraryVisible(false)}
      />
      <div
        className={`overflow-auto fixed top-0 left-0 z-20 h-full bg-white lg:w-96 w-64 transition-all duration-200 ease-in-out delay-0  ${
          isLibraryVisible ? " -translate-x-0" : " -translate-x-full"
        }`}
      >
        <ul className="flex flex-col">
          {Songs.map((item) => (
            <li
              key={item.id}
              onClick={() => pickSound(item.id)}
              className={`flex items-center gap-4 p-4 transition-all duration-200 cursor-pointer ase-in-out hover:bg-gray-200 ${
                item.id == song ? "bg-gray-200" : "bg-white"
              }`}
            >
              <img src={item.cover} className="w-1/4 rounded-lg" />
              <span>
                <h4 className="text-lg">{item.title}</h4>
                <h5 className="text-gray-500 text-md">{item.author}</h5>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Library;
