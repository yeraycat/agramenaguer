export default function LoginInput({
  id,
  name,
  type,
  ariaLabel,
  autoComplete,
  required,
  placeholder,
  onChange,
  value,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      required={required}
      className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2 focus:border-blue-medium focus:ring-blue-medium"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}
