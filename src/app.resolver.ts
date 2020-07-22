import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(@Args('naam') name: string): string {
    return 'hello ' + name;
  }
}
