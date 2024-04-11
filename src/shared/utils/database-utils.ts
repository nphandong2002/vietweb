import { DatabaseOptionDefault } from '../types/database-type';

export const checkOption = (option?: DatabaseOptionDefault) => {
  return (
    option &&
    option.page &&
    option.perpage && {
      skip: option.page * option.perpage,
      take: option.perpage,
    }
  );
};
