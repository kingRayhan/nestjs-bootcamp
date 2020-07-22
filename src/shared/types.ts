import { Transform } from 'class-transformer';
import { Field, Int, InputType } from '@nestjs/graphql';

export interface ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
  data: DataModel[];
}

@InputType()
export class ResoucePagination {
  @Field(() => Int, { nullable: true })
  @Transform(page => parseInt(page), { toClassOnly: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  @Transform(limit => parseInt(limit), { toClassOnly: true })
  limit?: number;

  @Field({ nullable: true })
  sort?: string;
}

export interface FacebookProfilePayload {
  displayName: string;
  id: string;
}
