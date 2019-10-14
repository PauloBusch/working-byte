import { MatPaginatorIntl } from '@angular/material';

export function CustomPaginator() {
  const paginator = new MatPaginatorIntl();
  paginator.itemsPerPageLabel = 'Itens por página:';
  paginator.previousPageLabel = 'Anterior';
  paginator.nextPageLabel = 'Próxima';
  paginator.lastPageLabel = 'Última';
  paginator.firstPageLabel = 'Primeira';
  paginator.getRangeLabel = (page, pageSize, length) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  }

  return paginator;
}
