import { Link } from "react-router-dom";
import { baseClasses } from "./button";

export function LinkButton({ children, to, className }) {
  return (
    <Link className={`${baseClasses} ${className}`} to={to}>
      {children}
    </Link>
  );
}
