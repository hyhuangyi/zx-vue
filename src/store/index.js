import Vue from 'vue';
import Vuex from 'vuex';
import tagsview from '../store/modules/tagsivew'
import getters from '../store/getters'

Vue.use(Vuex)
const store= new Vuex.Store({
  modules:{
    tagsview
  },
  getters
})

export default store
