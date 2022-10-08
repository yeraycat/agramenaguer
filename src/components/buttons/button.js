export const baseClasses =
  "border-2 border-black-light hover:text-white hover:bg-black-light rounded font-bold px-2 cursor-pointer";

export const disabledClasses = "opacity-50 cursor-not-allowed";

export function Button({ children, onClick, className, disabled }) {
  return (
    <button
      className={`${disabled && disabledClasses} ${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export const primaryClasses = "text-white border-black-light bg-black-light";

export function ButtonPrimary({ children, onClick, className, disabled }) {
  return (
    <Button
      className={`${primaryClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
