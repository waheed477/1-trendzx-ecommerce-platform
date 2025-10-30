import Pagination from '../common/Pagination';
import { useState } from 'react';

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(3);
  
  return <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />;
}
