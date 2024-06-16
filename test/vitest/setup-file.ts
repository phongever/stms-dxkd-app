import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { Dialog } from "quasar";
import { Loading } from "quasar";

// This file will be run before each test file
export {};

installQuasarPlugin({ plugins: { Dialog, Loading } });
