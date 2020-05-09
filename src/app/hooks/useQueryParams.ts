import { useLocation } from 'react-router-dom';
import QueryString, { ParseOptions } from 'query-string';

export default function useQueryParam<T>(options?: ParseOptions): T {
  const { search } = useLocation();
  return QueryString.parse(search, options) as unknown as T;
}
