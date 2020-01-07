import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
// const Login = () => import('/page/Login/login.vue')
const register = () => import('/page/Login/register.vue')
const forgetpwd = () => import('/page/Login/forgetpwd.vue')
const Home = () => import('/page/Home/home.vue')
const taskUser = () => import('/page/Home/taskUser.vue')
const Help = () => import('/page/Home/help.vue')
const download = () => import('/page/Home/download.vue')
const Gene = () => import('/page/Home/gene.vue')
const Drug = () => import('/page/Home/drug.vue')
const Authority = () => import('/page/Home/authority.vue')
const ClinicalNotes = () => import('/page/Home/clinicalNotes.vue')
const ClinicalTrials = () => import('/page/Home/clinicalTrials.vue')
const DrugGenePair = () => import('/page/Home/drugGenePair.vue')
const DrugLabels = () => import('/page/Home/drugLabels.vue')
const Patent = () => import('/page/Home/patent.vue')
const order = () => import('/page/Order/order.vue')
const user = () => import('/page/User/user.vue')
const information = () => import('/page/User/children/information.vue')
const taskhall = () => import('/page/Taskhall/taskhall.vue')
const QueryAllResult = () => import('/page/Search/queryAllResult.vue')
const SearchContent = () => import('/page/Search/searchContent.vue') // jiyin
const SearchDruGenePair = () => import('/page/Search/searchDruGenePair.vue') // yaowujiyindui
const SearchDrug = () => import('/page/Search/searchDrug.vue') // yaowu
const RefreshSearch = () => import('/page/Refresh/refreshsearch.vue')
const RefreshGoods = () => import('/page/Refresh/refreshgoods.vue')
const ClinicalGuidelinesDeatil = () => import('/page/Search/content_detail/clinical_guidelines_detail.vue')
const ClinicalNotesGeneDetail = () => import('/page/Search/content_detail/clinical_notes/clinical_notes_gene_detail.vue')
const ClinicalNotesWeidDetail = () => import('/page/Search/content_detail/clinical_notes/clinical_notes_weid_detail.vue')
const ClinicalNotesDetail = () => import('/page/Search/content_detail/clinical_notes/clinical_notes_detail.vue')
const DrugLablesForeign = () => import('/page/Search/content_detail/drug_lables/drug_lables_foreign.vue')
const DrugLablesCFDA = () => import('/page/Search/content_detail/drug_lables/drug_lables_CFDA.vue')
const ClinicalTestChina = () => import('/page/Search/content_detail/clinical_test/clinical_test_china_detail.vue')
const ClinicalTestForeign = () => import('/page/Search/content_detail/clinical_test/clinical_test_foreign_detail.vue')

const PatentChinaDetail = () => import('/page/Search/content_detail/patent/patent_china_detail.vue')
const PatentForeignDetail = () => import('/page/Search/content_detail/patent/patent_foreign_detail.vue')

const DataStatisticsWorld = () => import('/page/Search/content_detail/data_statistics/data_statistics_china.vue')
const DataStatisticsChina = () => import('/page/Search/content_detail/data_statistics/data_statistics_world.vue')
const DataStatisticsDetail = () => import('/page/Search/content_detail/data_statistics/data_statistics_detail.vue')

const PathWays = () => import('/page/Search/content_detail/path_ways/index.vue')
const DrugNews = () => import('/page/Search/content_detail/drug_news/index.vue')
const PathWaysDetail = () => import('/page/Search/content_detail/path_ways/path_ways_detail.vue')
// const DrugNewsDetail = () => import('/page/Search/content_detail/drug_news/drug_news_detail.vue')

Vue.use(Router)
export default new Router({
  routes: [

    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [{
          path: '/refreshgoods',
          name: 'refreshgoods',
          component: RefreshGoods
        },
        {
          path: '/searchDruGenePair',
          name: 'searchDruGenePair',
          component: SearchDruGenePair
        }, {
          path: '/searchDrug',
          name: 'searchDrug',
          component: SearchDrug
        }, {
          path: '/searchContent',
          name: 'searchContent',
          component: SearchContent
        },
        {
          path: '/clinicalGuidelinesDeatil',
          name: 'clinicalGuidelinesDeatil',
          component: ClinicalGuidelinesDeatil
        },
        {
          path: '/c-n-g-detail',
          name: 'clinicalNotesGeneDetail',
          component: ClinicalNotesGeneDetail
        },
        {
          path: '/c-n-w-detail',
          name: 'clinicalNotesWeidDetail',
          component: ClinicalNotesWeidDetail
        }, {
          path: '/c-n-detail',
          name: 'clinicalNotesDetail',
          component: ClinicalNotesDetail
        },
        {
          path: '/d-s-detail',
          name: 'dataStatisticsDetail',
          component: DataStatisticsDetail
        },
        {
          path: '/d-l-f-detail',
          name: 'drugLablesForeign',
          component: DrugLablesForeign
        }, {
          path: '/d-l-c-detail',
          name: 'drugLablesCFDA',
          component: DrugLablesCFDA
        },
        {
          path: '/c-t-c-detail',
          name: 'clinicalTestChina',
          component: ClinicalTestChina
        },
        {
          path: '/c-t-f-detail',
          name: 'ClinicalTestForeign',
          component: ClinicalTestForeign
        },
        {
          path: '/p-c-detail',
          name: 'patentChinaDetail',
          component: PatentChinaDetail
        },
        {
          path: '/p-f-detail',
          name: 'patentForeignDetail',
          component: PatentForeignDetail
        },
        {
          path: '/d-s-c-detail',
          name: 'dataStatisticsWorld',
          component: DataStatisticsWorld
        },
        {
          path: '/d-s-w-detail',
          name: 'dataStatisticsChina',
          component: DataStatisticsChina
        },
        {
          path: '/path-ways',
          name: 'pathWays',
          component: PathWays
        }, {
          path: '/p-w-detail',
          name: 'pathWaysDetail',
          component: PathWaysDetail
        }, {
          path: '/drug-news',
          name: 'drugNews',
          component: DrugNews
        },

        {
          path: '/order',
          name: 'order',
          component: order,
          children: [{
            path: '/queryAllResult',
            name: 'queryAllResult',
            component: QueryAllResult
          }]
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/taskUser',
      name: 'taskUser',
      component: taskUser
    },
    {
      path: '/gene',
      name: 'gene',
      component: Gene
    },
    {
      path: '/authority',
      name: 'authority',
      component: Authority
    },
    {
      path: '/clinicalNotes',
      name: 'clinicalNotes',
      component: ClinicalNotes
    },
    {
      path: '/clinicalTrials',
      name: 'clinicalTrials',
      component: ClinicalTrials
    },
    {
      path: '/drugGenePair',
      name: 'drugGenePair',
      component: DrugGenePair
    },
    {
      path: '/drugLabels',
      name: 'drugLabels',
      component: DrugLabels
    },
    {
      path: '/patent',
      name: 'patent',
      component: Patent
    },
    {
      path: '/drug',
      name: 'drug',
      component: Drug
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: forgetpwd
    },
    {
      path: '/refreshsearch',
      name: 'refreshsearch',
      component: RefreshSearch
    },
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: order,
    //   children: [{
    //     path: '/queryAllResult',
    //     name: 'queryAllResult',
    //     component: QueryAllResult
    //   }]
    // },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/information',
      children: [{
        path: '/information',
        name: 'userInfo',
        component: information
      }]
    },
    {
      path: '/taskhall',
      name: 'taskhall',
      component: taskhall
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
