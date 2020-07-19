import { Transform } from 'class-transformer';

export interface ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
  data: DataModel[];
}

export class ResoucePagination {
  @Transform(page => parseInt(page), { toClassOnly: true })
  page?: number;

  @Transform(limit => parseInt(limit), { toClassOnly: true })
  limit?: number;

  sort?: string;
}

export interface FacebookProfilePayload {
  displayName: string;
  id: string;
}
