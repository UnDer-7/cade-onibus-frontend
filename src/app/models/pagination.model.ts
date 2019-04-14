import { UserLocation } from './user.location.model';

export interface Pagination {
  docs: UserLocation[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
