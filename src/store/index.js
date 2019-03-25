import actions from './actions';
import getters from './getters';
import state from './state';
import mutations from './mutations';



import download_files from './common/download_files'
import failureEnery from './common/failureEnery';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        download_files,
        failureEnery
    }
});