import Vue from 'vue';
import Vuex from 'vuex';

import googleNews from './modules/googleNews';
import cart from './modules/cart';
import products from './modules/products';
import auth from './modules/auth';
import messages from './modules/messages';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        googleNews,
        auth,
		cart,
		products,
		messages
    }
});