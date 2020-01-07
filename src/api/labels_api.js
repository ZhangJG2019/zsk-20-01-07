import http from './public'

/**
 *8大类标签接口
 */

// 基因
export const getGeneSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneSortLableList', {
    params
  })
}

// 药物
export const getDrugSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugSortLableList', {
    params
  })
}

// 药物-基因
export const getDrugGeneSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugGeneSortLableList', {
    params
  })
}

// 临床指南
export const getClinicalGuidelinesSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalGuidelinesSortLableList', {
    params
  })
}

// 药物标签
export const getDrugLabelsSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugLabelsSortLableList', {
    params
  })
}

// 临床注释
export const getClinicalAnnotationSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalAnnotationSortLableList', {
    params
  })
}

// 临床试验
export const getClinicalTrialSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalTrialSortLableList', {
    params
  })
}

// 专利
export const getPatentSortLable = (params) => {
  return http.fetchGet('/apis/taskApi/getPatentSortLableList', {
    params
  })
}
/**
 * 详情页10大分类一级接口
 */

// 临床指南 药物基因
export const getDrugGeneClinicalGuide = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugGeneClinicalGuidelinesInfo', {
    params
  })
}
// 临床指南 药物
export const getDrugClinicalGuide = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugClinicalGuidelinesInfo', {
    params
  })
}
// 临床指南 基因
export const getGeneClinicalGuide = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneClinicalGuidelinesInfo', {
    params
  })
}

// 临床指南 详情  中国
export const getClinicalGuidelinesDomesticDetail = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalGuidelinesDomesticDetailInfo', {
    params
  })
}
// 临床指南 详情  国外
export const getClinicalGuidelinesForeignDetail = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalGuidelinesForeignDetailInfo', {
    params
  })
}

// 药物信息 药物基因
export const getDrugInfoListByProject = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugInfoListByProjectId', {
    params
  })
}
// 药物信息 药物
export const getDrugInfoListByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugInfoListByDrugId', {
    params
  })
}
// 药物信息 基因
export const getDrugInfoListByGene = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugInfoListByGeneId', {
    params
  })
}
// 药物信息 总结
export const getMoreDrugInfoByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getMoreDrugInfoByDrugId', {
    params
  })
}
// 药物信息 医保目录
export const getMoreDrugCatalogueInfoByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getMoreDrugCatalogueInfoByDrugId', {
    params
  })
}
// 药物信息 药物说明书
export const getMoreDrugInstructionsInfoByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getMoreDrugInstructionsInfoByDrugId', {
    params
  })
}
// 药物信息 药物商品名
export const getMoreDrugTradeInfoByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getMoreDrugTradeInfoByDrugId', {
    params
  })
}
// 药物信息 相互作用
export const getMoreDrugInteractInfoByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getMoreDrugInteractInfoByDrugId', {
    params
  })
}

// 参与通路
// 参与通路 药物-基因
export const getGenePathwaysFormByProject = (params) => {
  return http.fetchGet('/apis/taskApi/getGenePathwaysFormByProjectId', {
    params
  })
}
// 参与通路 药物
export const getGenePathwaysFormByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getGenePathwaysFormByDrugId', {
    params
  })
}
// 参与通路 基因
export const getGenePathwaysFormByGene = (params) => {
  return http.fetchGet('/apis/taskApi/getGenePathwaysFormByGeneId', {
    params
  })
}
// 参与通路 总结
export const getGenePathwaysContentByPathways = (params) => {
  return http.fetchGet('/apis/taskApi/getGenePathwaysContentByPathways', {
    params
  })
}
// 参与通路 组成部分
export const getGenePathwaysFormByPathways = (params) => {
  return http.fetchGet('/apis/taskApi/getGenePathwaysFormByPathways', {
    params
  })
}
// 参与通路 相关通路
export const getRelatedParhwaysByPathways = (params) => {
  return http.fetchGet('/apis/taskApi/getRelatedParhwaysByPathways', {
    params
  })
}
// 参与通路 相关文献
export const getLiteratrueByPathways = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteratrueByPathways', {
    params
  })
}
// 参与通路 相关文献详情
export const getLitePathwayDetail = (params) => {
  return http.fetchGet('/apis/taskApi/getLitePathwayByLiterId', {
    params
  })
}

// 临床注释
// 临床注释 药物基因
export const getClinicalAnnotationByDrugGene = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalAnnotationByDrugGene', {
    params
  })
}
// 临床注释 药物
export const getClinicalAnnotationByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalAnnotationByDrug', {
    params
  })
}
// 临床注释 基因
export const getClinicalAnnotationByGene = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalAnnotationByGene', {
    params
  })
}
// 临床注释 基因详情
export const getGeneClinicalDetails = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneClinicalDetails', {
    params
  })
}
// 临床注释 位点详情
export const getCombinedClinicalDetails = (params) => {
  return http.fetchGet('/apis/taskApi/getCombinedClinicalDetails', {
    params
  })
}
// 临床注释 详情  中国文献
export const getLiteSciVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteSciVODetailInfo', {
    params
  })
}
// 临床注释 详情  国外文献
export const getLiteCoreVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteCoreVODetailInfo', {
    params
  })
}
// 药物标签
// 药物标签 详情  药物基因
export const getDrugLabelsByDrugGene = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugLabelsByDrugGene', {
    params
  })
}
// 药物标签 详情  基因
export const getDrugLabelsByGene = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugLabelsByGene', {
    params
  })
}
// 药物标签 详情  药物
export const getDrugLabelsByDrug = (params) => {
  return http.fetchGet('/apis/taskApi/getDrugLabelsByDrug', {
    params
  })
}
// 药物标签 详情  中国
export const getLiteCfdaVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteCfdaVODetailInfo', {
    params
  })
}
// 药物标签 详情  国外
export const getLiteFdaVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteFdaVODetailInfo', {
    params
  })
}


// 临床实验
// 临床实验 详情  药物基因
export const getClinicalTrialInfoByProjectId = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalTrialInfoByProjectId', {
    params
  })
}
// 临床实验 详情  基因
export const getClinicalTrialInfoByGeneId = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalTrialInfoByGeneId', {
    params
  })
}
// 临床实验 详情  药物
export const getClinicalTrialInfoByDrugId = (params) => {
  return http.fetchGet('/apis/taskApi/getClinicalTrialInfoByDrugId', {
    params
  })
}

// 临床试验 详情  中国
export const getLiteTrailDomesticVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteTrailDomesticVODetailInfo', {
    params
  })
}
// 临床试验 详情  国外
export const getLiteTrailForeignVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLiteTrailForeignVODetailInfo', {
    params
  })
}

// 中国专利
// 中国专利 详情  药物基因
export const getPatentInfoByProjectId = (params) => {
  return http.fetchGet('/apis/taskApi/getPatentInfoByProjectId', {
    params
  })
}
// 中国专利 详情  基因
export const getPatentInfoByGeneId = (params) => {
  return http.fetchGet('/apis/taskApi/getPatentInfoByGeneId', {
    params
  })
}
// 中国专利 详情  药物
export const getPatentInfoByDrugId = (params) => {
  return http.fetchGet('/apis/taskApi/getPatentInfoByDrugId', {
    params
  })
}
// 中国专利 详情  中国
export const getLitePatentDomesticVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLitePatentDomesticVODetailInfo', {
    params
  })
}
// 中国专利 详情  国外
export const getLitePatentForeignVODetailInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getLitePatentForeignVODetailInfo', {
    params
  })
}

// 数据统计
// 数据统计 详情  药物基因
export const getDataStatisticsListVOByProjectId = (params) => {
  return http.fetchGet('/apis/taskApi/getDataStatisticsListVOByProjectId', {
    params
  })
}
// 数据统计 详情  基因
export const getDataStatisticsListVOByGeneId = (params) => {
  return http.fetchGet('/apis/taskApi/getDataStatisticsListVOByGeneId', {
    params
  })
}
// 数据统计 详情  药物
export const getDataStatisticsListVOByDrugId = (params) => {
  return http.fetchGet('/apis/taskApi/getDataStatisticsListVOByDrugId', {
    params
  })
}
// 数据统计中国
export const getChinaDataInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getDataStatisticsDomesticDetailVO', {
    params
  })
}
// 数据统计世界
export const getForeignDataInfo = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneporForeignStatisticsById', {
    params
  })
  // return http.fetchGet('../../static/data/worlddata.json', {
  //   params
  // })
}
// 基因信息 详情  药物基因
export const getGeneInfoListByProjectId = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneInfoListByProjectId', {
    params
  })
}
// 基因信息 详情  药物
export const getGeneInfoListByDrugId = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneInfoListByDrugId', {
    params
  })
}
// 基因信息 详情  基因
export const getGeneInfoListByGeneId = (params) => {
  return http.fetchGet('/apis/taskApi/getGeneInfoListByGeneId', {
    params
  })
}
