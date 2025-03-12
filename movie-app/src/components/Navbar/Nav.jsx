export default function Nav({ children }) {
  return (
    <nav className="bg-danger text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}
