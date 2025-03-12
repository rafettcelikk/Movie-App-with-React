export default function NavSearchResult({ totalResult }) {
  return (
    <div className="col-4 text-end">
      <strong>{totalResult}</strong> kayıt bulundu.
    </div>
  );
}
