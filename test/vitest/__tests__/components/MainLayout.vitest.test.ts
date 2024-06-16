import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import MainLayout from "@/layouts/MainLayout.vue";
import { createPinia, setActivePinia } from "pinia";

const pinia = createPinia();

setActivePinia(pinia);

const plugins = [pinia];

const global = {
  plugins,
  components: {
    "router-view": vi.fn(),
  },
};

describe("MainLayout", () => {
  it("should be created", async () => {
    const wrapper = mount(MainLayout, {
      global,
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.find(".q-toolbar__title").text()).toBe(
      "Sóng to mặc sóng, đường xa kệ đường"
    );
  });

  it("should show drawer", async () => {
    const wrapper = mount(MainLayout, {
      global,
    });

    await wrapper.findComponent(".q-btn").trigger("click");
  });
});
