import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};


  config.security = {
    csrf:{
      enable:false
    }
  };

  return config;
};
