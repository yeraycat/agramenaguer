export function Button({ children, onClick }) {
  return (
    <button
      className="w-28 border-2 border-black-light hover:text-white hover:bg-black-light w-full rounded h-8 font-bold px-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
