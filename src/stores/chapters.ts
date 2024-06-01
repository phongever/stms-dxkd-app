import { defineStore } from "pinia";
import { api } from "boot/axios";

interface env {
  VITE_ACCESS_TOKEN: string;
  VITE_ENVIRONMENT_ID: string;
  VITE_SPACE_ID: string;
  VITE_BOOK_ID: string;
}

const { VITE_ACCESS_TOKEN, VITE_SPACE_ID, VITE_BOOK_ID, VITE_ENVIRONMENT_ID } =
  import.meta.env as unknown as env;

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface State {
  chapters: Chapter[];
}

export interface Item {
  fields: {
    title: string;
    chapters: Array<{
      sys: {
        id: string;
      };
    }>;
  };
}

export interface Entry {
  fields: {
    content: string;
    title: string;
  };
  sys: {
    id: string;
  };
}

export interface ResponseData {
  items: Item[];
  includes: {
    Entry: Entry[];
  };
}

export const useChaptersStore = defineStore("chapters", {
  state: (): State => ({
    chapters: [],
  }),
  getters: {
    chapterList: (state: State): Chapter[] => state.chapters,
    chapterById:
      (state: State): ((id: string) => Chapter | undefined) =>
      (id: string): Chapter | undefined =>
        state.chapters.find((chapter) => chapter.id === id),
  },
  actions: {
    async fetchData() {
      const {
        data: { items, includes },
      } = await api.get<ResponseData>(
        `/spaces/${VITE_SPACE_ID}/environments/${VITE_ENVIRONMENT_ID}/entries?access_token=${VITE_ACCESS_TOKEN}&sys.id=${VITE_BOOK_ID}`
      );
      const {
        fields: { chapters },
      } = items[0];
      const entries: { [id: string]: Entry["fields"] } = includes.Entry.reduce(
        (pre, cur) => ({ ...pre, [cur.sys.id]: { ...cur.fields } }),
        {}
      );
      this.chapters = chapters.map(({ sys: { id } }) => ({
        id,
        ...entries[id],
      }));
    },
  },
});
