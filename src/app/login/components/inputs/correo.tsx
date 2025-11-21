import { CiMail } from "react-icons/ci";


interface Props {
  email: string;
  onChange?: (value: string) => void;
}

export function Correo({ email, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm font-bold text-black">Correo Electrónico</p>

      <div className="flex items-center bg-gray-100 gap-2  rounded-lg px-3 py-2 
                      focus-within:ring-4 focus-within:ring-gray-200
                      transition-all">
        <CiMail size={20} className="text-gray-400" />

        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => onChange?.(e.target.value)}
          className="outline-none flex-1 text-gray-800"
        />
      </div>
    </div>
  );
}
