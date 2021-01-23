const isCache = (compType: string) => {
  const list = ["SNRS", "SNRSMulti"];
  return list.includes(compType);
};
const isDb = (compType: string) => {
  const list = ["NGMySQL", "PostgreSQL", "DB2", "AtlasMySQLMulti", "SNDP"];
  return list.includes(compType);
};
const isApp = (compType: string) => {
  const list = [
    "JbossStandaloneKVM",
    "NODEJS",
    "GO",
    "TomcatDocker",
    "JbossStandaloneKVMAI",
  ];
  return list.includes(compType);
};
const isWeb = (compType: string) => {
  const list = ["NginxKVM", "NginxDocker"];
  return list.includes(compType);
};
const isNet = (compType: string) => {
  const list = ["NCM", "WAF", "DNS", "LB", "ALBIntranet", "ALBExtranet"];
  return list.includes(compType);
};
const isStrategy = (compType: string) => {
  const list = ["LOGBACK", "PUBLICNETAGENT", "SPM", "LOGCOLLECT", "AtlasSLGS"];
  return list.includes(compType);
};
const isCommon = (compType: string) => {
  const list = ["vm"];
  return list.includes(compType);
};
const isCustomization = (compType: string) => {
  const list = ["CommonService"];
  return list.includes(compType);
};

const isData = (compType: string) => {
  const list = [
    "AtlasHbase",
    "AtlasFlink",
    "AtlasES",
    "AtlasKafka",
    "AtlasWindQ",
  ];
  return list.includes(compType);
};

export {
  isCache,
  isDb,
  isApp,
  isWeb,
  isNet,
  isStrategy,
  isCommon,
  isCustomization,
  isData,
};
