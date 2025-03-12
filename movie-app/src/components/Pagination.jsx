export default function Pagination({
  previousPage,
  nextPage,
  currentPage,
  totalPage,
}) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li className={currentPage != 1 ? "page-item" : "page-item disabled"}>
          <a href="#" className="page-link" onClick={previousPage}>
            Geri
          </a>
        </li>
        <li
          className={
            currentPage < totalPage ? "page-item" : "page-item disabled"
          }
        >
          <a href="#" className="page-link" onClick={nextPage}>
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}
