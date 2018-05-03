const state={
    menuItems:{}
}
const getters={
     getMenuItems:state=>state.menuItems
}
const actions={
    
}
const mutations={
    setMenuItems(state, data){
        state.menuItems = data
    },
   removeMenuItems(state, data){
        state.menuItems.forEach((item, index) => {
            if (item == data) {
                state.menuItems.splice(index, 1)
            }
        })
    }, 
    pushToMenuItems(state, data){
            state.menuItems.push(data)
        }
}

export default{
    state,
    getters,
    mutations,
    actions
}