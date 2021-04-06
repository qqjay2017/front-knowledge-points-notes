import Cookies from "js-cookie";
import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState, Modules } from "..";

export enum AppModuleMutations {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
  TOGGLE_DEVICE = "TOGGLE_DEVICE",
}

export enum AppModuleActions {
  toggleSideBar = "toggleSideBar",
  closeSideBar = "closeSideBar",
  toggleDevice = "toggleDevice",
}

const state = () => ({
  device: "desktop",
  sidebar: {
    opened:(Cookies.get("sidebarStatus") && Cookies.get("sidebarStatus") === "0") ? false : true,
    withoutAnimation: false,
  },
});

const mutations: MutationTree<AppState> = {
  [AppModuleMutations.TOGGLE_SIDEBAR]: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    // 0 = 关 ,1 = 开
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", "1");
    } else {
      Cookies.set("sidebarStatus", "0");
    }
  },
  [AppModuleMutations.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    Cookies.set("sidebarStatus", "0");
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  [AppModuleMutations.TOGGLE_DEVICE]: (state, device) => {
    state.device = device;
  },
};

const actions: ActionTree<AppState, IRootState> = {
  [AppModuleActions.toggleSideBar]({ commit }) {
    commit(AppModuleMutations.TOGGLE_SIDEBAR);
  },
  [AppModuleActions.closeSideBar]({ commit }, { withoutAnimation }) {
    commit(AppModuleMutations.CLOSE_SIDEBAR, withoutAnimation);
  },
  [AppModuleActions.toggleDevice]({ commit }, device) {
    commit(AppModuleMutations.TOGGLE_DEVICE, device);
  },
};

const appModule: Module<AppState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export type AppState = ReturnType<typeof state>;

export default appModule;
