import { setActivePinia, createPinia } from "pinia";
import { useChaptersStore, ResponseData } from "@/stores/chapters";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as axios from "@/boot/axios";

const response: ResponseData = {
  items: [
    {
      fields: {
        title: "Test",
        chapters: [
          {
            sys: {
              id: "1",
            },
          },
          {
            sys: {
              id: "2",
            },
          },
          {
            sys: {
              id: "3",
            },
          },
        ],
      },
    },
  ],
  includes: {
    Entry: [
      {
        fields: {
          content: "content 1",
          title: "title 1",
        },
        sys: {
          id: "1",
        },
      },
      {
        fields: {
          content: "content 2",
          title: "title 2",
        },
        sys: {
          id: "2",
        },
      },
      {
        fields: {
          content: "content 3",
          title: "title 3",
        },
        sys: {
          id: "3",
        },
      },
    ],
  },
};

vi.spyOn(axios, "api");
vi.mock("@/boot/axios", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("@/boot/axios")>()),
    // this will only affect "foo" outside of the original module
    api: () => ({
      get: vi.fn().mockResolvedValue(response),
    }),
  };
});

describe("Chapters store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("init state", () => {
    const chaptersStore = useChaptersStore();

    expect(chaptersStore.chapterList.length).toBe(0);
  });

  it("fetch chapters", async () => {
    const chaptersStore = useChaptersStore();

    await chaptersStore.fetchData();
  });
});
