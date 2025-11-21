import { CardHome } from "./components/cardsHome";
import { LoginSlider } from "./components/slider";
import { SlEnergy } from "react-icons/sl";

export default function Home() {
  return (
    <div
      className="
        min-h-screen 
        bg-linear-to-br 
        from-blue-200/60 
        via-white/70
        to-white
        flex
      "
    >
      <div className="w-1/2 flex flex-col justify-center px-14 gap-4">

        <button className="
          bg-blue-300/40 
          hover:bg-blue-300/60 
          transition 
          rounded-full 
          px-6 
          py-3 
          flex 
          items-center 
          gap-2 
          w-fit
        ">
          <SlEnergy size={28} className="text-blue-500" />
          <span className="text-blue-700 font-medium">Chat en tiempo real</span>
        </button>

        <h1 className="text-5xl font-bold text-black">
          Sistema de chat
        </h1>

        <p className="text-4xl font-semibold text-blue-500">
          Colaborativo
        </p>

        <p className="text-black text-lg max-w-md">
          Comunícate y colabora con tu equipo en tiempo real.
          Mensajería instantánea con WebSockets para una experiencia fluida.
        </p>

        <div className="mt-6">
          <CardHome />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-6">
        <LoginSlider />
      </div>

    </div>
  );
}
