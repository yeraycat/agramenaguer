import { Link } from "react-router-dom";
import { baseClassName, disabledClassName } from "./button";

export function LinkButton({ children, onClick, className, disabled }) {
  return (
    <Link
      className={`${
        disabled && disabledClassName
      } ${baseClassName} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
