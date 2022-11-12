const state = () => ({
 faculty: ''
})

const mutations = {
  commitFaculty(state, faculty) {
      state.faculty = faculty
  }
}

const actions = {
  setFaculty( { commit }, faculty) {
      commit("commitFaculty", faculty)
  }
}

const getters = {
  getFaculty: (state) => state.faculty,
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
