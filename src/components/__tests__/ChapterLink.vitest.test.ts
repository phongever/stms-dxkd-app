import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ChapterLink from "../ChapterLink.vue";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasarPlugin();

describe("chapter link", () => {
  it("should show title and link", async () => {
    const props = {
      link: "/",
      title: "Link",
    };

    expect(ChapterLink).toBeTruthy();

    const wrapper = mount(ChapterLink, {
      props,
    });

    expect(wrapper.attributes("href")).toBe(props.link);
    expect(wrapper.text()).toBe(props.title);
  });
});
