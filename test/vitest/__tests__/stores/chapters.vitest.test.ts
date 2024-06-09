import { setActivePinia, createPinia } from "pinia";
import { useChaptersStore, ResponseData } from "@/stores/chapters";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { api } from "@/boot/axios";

const response: { data: ResponseData } = {
  data: {
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
  },
};

let mockGet: MockInstance;

describe("Chapters store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    mockGet = vi.spyOn(api, "get") as MockInstance;
    mockGet.mockResolvedValue(response);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("init state", () => {
    const chaptersStore = useChaptersStore();

    expect(chaptersStore.chapterList.length).toBe(0);
  });

  it("should fetch chapters", async () => {
    const chaptersStore = useChaptersStore();

    await chaptersStore.fetchData();

    expect(chaptersStore.chapterList.length).toBe(
      response.data.includes.Entry.length
    );
  });

  it("should return chapter by id", async () => {
    const chaptersStore = useChaptersStore();

    await chaptersStore.fetchData();

    expect(
      chaptersStore.chapterById(response.data.includes.Entry[0].sys.id)
    ).toEqual({
      id: response.data.includes.Entry[0].sys.id,
      title: response.data.includes.Entry[0].fields.title,
      content: response.data.includes.Entry[0].fields.content,
    });
  });
});
