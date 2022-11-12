import Vue from "vue"
import Loading from '~/components/Loading'
Vue.component("Loading", Loading)

import LoadingMixin from "~/mixins/Loading"
Vue.mixin(LoadingMixin)