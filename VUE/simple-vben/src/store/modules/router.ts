import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "..";
import { AppState } from "./app";

export interface MenuItem {
  path: string;
  name: string;
  children: MenuItem[];
}

const state = () => {
  return {
    menus: [],
  };
};

export enum RouterModuleMutations {
  setMenus = "setMenus",
}

const mutations: MutationTree<RouterState> = {
  [RouterModuleMutations.setMenus](state, data: MenuItem[]) {
    state.menus = data;
  },
};

const actions: ActionTree<RouterState, IRootState> = {};

export type RouterState = {
  menus: MenuItem[];
};

const RouterModule: Module<RouterState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
