export enum typeAction {
  RENAME = 'rename',
}
export type payloadAction = {
  [typeAction.RENAME]: {
    title: string;
  };
};
