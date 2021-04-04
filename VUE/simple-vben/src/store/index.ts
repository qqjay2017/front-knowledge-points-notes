import { createStore } from "vuex";
import { AppState } from "./modules/app";

import appModule from "./modules/app";

export enum Modules {
  App = "app",
}

export type IRootState = {
  [Modules.App]: AppState;
};

const store = createStore({
  modules: {
    [Modules.App]: appModule,
  },
});

export function getStoreNamespace(moduleName: Modules, target: string): string {
  return `${moduleName}/${target}`;
}

export default store;
