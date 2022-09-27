export default function Logo({ className }) {
  return (
    // <img src="/images/logo.png" className="mt-2 w-6/12" />
    <span
      className={`font-display text-2xl md:text-4xl subpixel-antialiased italic font-bold text-black-light${
        className ? " " + className : ""
      }`}
    >
      Agramenagüer
    </span>
  );
}
