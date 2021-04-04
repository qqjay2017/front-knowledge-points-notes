import defaultSettings from "../../settings";

import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState, Modules } from "..";

const { fixedHeader, sidebarLogo } = defaultSettings;

export enum SettingsModuleMutations {
  CHANGE_SETTING = "CHANGE_SETTING",
}
export enum SettingsModuleActions {
  changeSetting = "changeSetting",
}

const state = (): SettingState => {
  return {
    showSettings: true,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  };
};

const mutations: MutationTree<SettingState> = {
  [SettingsModuleMutations.CHANGE_SETTING]: (
    state,
    data: {
      key: SettingsKey;
      value: any;
    }
  ) => {
    const { key, value } = data;
    state[key] = value;
  },
};

const actions: ActionTree<SettingState, IRootState> = {
  [SettingsModuleActions.changeSetting]({ commit }, data) {
    commit(SettingsModuleMutations.CHANGE_SETTING, data);
  },
};

type SettingsKey = "showSettings" | "fixedHeader" | "sidebarLogo";

export type SettingState = Record<SettingsKey, any>;

const settingModule: Module<SettingState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default settingModule;
