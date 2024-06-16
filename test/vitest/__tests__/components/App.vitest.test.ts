import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import App from "@/App.vue";

describe("app", () => {
  it("should be created", async () => {
    const wrapper = mount(App, {
      global: {
        components: {
          "router-view": vi.fn(),
        },
      },
    });

    expect(wrapper).toBeTruthy();
  });
});
