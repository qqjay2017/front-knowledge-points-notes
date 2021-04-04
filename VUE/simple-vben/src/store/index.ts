import { createStore } from "vuex";

import appModule, { AppState } from "./modules/app";
import settingModule, { SettingState } from "./modules/settings";

export enum Modules {
  App = "app",
  Settings = "settings",
}

export type IRootState = {
  [Modules.App]: AppState;
  [Modules.Settings]: SettingState;
};

const store = createStore({
  modules: {
    [Modules.App]: appModule,
    [Modules.Settings]: settingModule,
  },
});

export function getStoreNamespace(moduleName: Modules, target: string): string {
  return `${moduleName}/${target}`;
}

export default store;
