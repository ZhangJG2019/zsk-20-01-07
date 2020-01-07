let styleConfig = {
  gene: [{
    value: 'geneName-基因',
    label: '基因'
  }, {
    value: 'genePor-位点',
    label: '位点'
  }, {
    value: 'drugGeneNames-药物基因',
    label: '药物-基因'
  }],
  drug: [{
    value: 'name-药物',
    label: '药物'
  }, {
    value: 'drugGeneNames-药物基因',
    label: '药物—基因'
  }],
  drugGenePair: [{
      value: 'type-全球指南',
      label: '全球指南'
    },
    {
      value: 'type-中国专家共识',
      label: '中国专家共识'
    },
    {
      value: 'type-全球药物标签',
      label: '全球药物标签'
    },
    {
      value: 'type-中国药物标签',
      label: '中国药物标签'
    },
    {
      value: 'type-全球临床试验',
      label: '全球临床试验'
    },
    {
      value: 'type-中国临床试验',
      label: '中国临床试验'
    },
    {
      value: 'type-全球专利',
      label: '全球专利'
    },
    {
      value: 'type-中国专利',
      label: '中国专利'
    },
    {
      value: 'type-通路',
      label: '通路'
    },
    {
      value: 'type-临床注释(基因)',
      label: '临床注释(基因)'
    },
    {
      value: 'type-临床注释(位点)',
      label: '临床注释(位点)'
    }
  ],
  druglabels: [{
      value: 'source-FDA',
      label: 'FDA'
    },
    {
      value: 'source-EMA',
      label: 'EMA'
    },
    {
      value: 'source-HCSC',
      label: 'HCSC'
    },
    {
      value: 'source-PMDA',
      label: 'PMDA'
    },
    {
      value: 'source-CFDA',
      label: 'CFDA'
    }
  ],
  authority: [{
      value: 'source-CPIC',
      label: 'CPIC'
    },
    {
      value: 'source-DPWG',
      label: 'DPWG'
    }, {
      value: 'source-CPNDS',
      label: 'CPNDS'
    }, {
      value: 'source-Other',
      label: 'Other'
    }, {
      value: 'source-专家共识',
      label: '专家共识'
    }, {
      value: 'name-药物',
      label: '药物'
    }, {
      value: 'geneName-基因',
      label: '基因'
    }
  ],
  patent: [{
      value: 'drug-药物',
      label: '药物'
    },
    {
      value: 'genes-基因',
      label: '基因'
    },
    {
      value: 'applicant-申请人',
      label: '申请人'
    }, {
      value: 'filingDate-申请时间',
      label: '申请时间'
    }
  ],
  clinicalnotes: [{
    value: 'evidenceLevel-循证等级',
    label: '循证等级'
  }, {
    value: 'porName-位点',
    label: '位点'
  }, {
    value: 'genes-基因',
    label: '基因'
  }, {
    value: 'race-种族',
    label: '种族'
  }, {
    value: 'medicationType-用药类型',
    label: '用药类型'
  }, {
    value: 'phenotypes-表型',
    label: '表型'
  }],
  clinicaltrials: [{
    value: 'name-药物',
    label: '药物'
  }, {
    value: 'genes-基因',
    label: '基因'
  }, {
    value: 'indication-适应症',
    label: '适应症'
  }, {
    value: 'bidUnit-申办单位',
    label: '申办单位'
  }]
};
export default styleConfig;


export function splitLabel(str) {
  if (!str) return false;
  if (str.indexOf("-") < 0) return str;
  return str.split("-");
};

export const tabs = [{
    label: "总结",
    value: "all_component"
  },
  {
    label: "临床指南",
    value: "clinical_guidelines"
  },
  {
    label: "药物标签",
    value: "drug_labels"
  },
  {
    label: "临床注释",
    value: "clinical_notes"
  },
  {
    label: "临床试验",
    value: "clinical_trials"
  },
  {
    label: "专利",
    value: "patent"
  },
  {
    label: "参与路通",
    value: "pathways"
  },
  {
    label: "药物信息",
    value: "drug_news"
  },
  {
    label: "基因信息",
    value: "gene_news"
  },
  {
    label: "数据统计",
    value: "data_statistics"
  }
];
