export const baseClassName =
  "border-2 border-black-light hover:text-white hover:bg-black-light rounded font-bold px-2 cursor-pointer";

export const disabledClassName = "opacity-50 cursor-not-allowed";

export function Button({ children, onClick, className, disabled }) {
  return (
    <button
      className={`${
        disabled && disabledClassName
      } ${baseClassName} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function ButtonPrimary({ children, onClick, className, disabled }) {
  return (
    <Button
      className={`text-white border-black-light bg-black-light rounded py-2 px-4 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
