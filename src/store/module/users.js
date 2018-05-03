const state={
    currentUser:null
}
const getters={
    currentUser:state=>state.currentUser
}
const actions={
  setUser({commit},user){
        commit("userStaus",user)
    }

}
const mutations={
    userStaus(state, user){
        if (user) {
            state.currentUser = user
            state.isLogin = true
        } else {
            state.currentUser = null
            state.isLogin = false
        }
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}