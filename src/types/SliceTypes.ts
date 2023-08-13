export type UpdateNoteDTO = {
  noteID: string;
  ownerID: string;
  title?: string;
  description?: string;
};

type NoteFilter = {
  title?: string;
  archived?: boolean;
  favorite?: boolean;
};

export type OwnerAndFilter = {
  ownerID: string;
  filter?: NoteFilter;
};
