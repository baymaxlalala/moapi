import http from "./http.js";




const fetchApi={
  http,
  fetchGetSelfProjectList(params){
    return http.get(`/project/self`,params).then(data=>{
      return data;
    })
  },

  fetchGetDevelopProjectList(params){
    return http.get(`/project/develop`,params).then(data=>{
      return data;
    })
  },

  fetchGetRelateProjectList(params){
    return http.get(`/project/relate`,params).then(data=>{
      return data;
    })
  },
  fetchGetProjectList(params){
    return http.get(`/project`,params).then(data=>{
      return data;
    })
  },
  fetchSignin(params){
    return http.post(`/users/signin`,params).then(data=>{
      return data;
    })
  },
  fetchSignup(params){
    return http.post(`/users/signup`,params).then(data=>{
      return data;
    })
  },

  fetchGetUserList(params){
    return http.get(`/users`,params).then(data=>{
      return data;
    })
  },


  fetchUpdateInterfase(interfaseId,params){
    return http.put(`/interfase/${interfaseId}`,params).then(data=>{
      return data;
    })
  },

  fetchAddInterfase(params){
    return http.post(`/interfase`,params).then(data=>{
      return data;
    })
  },

  fetchDeleteInterfase(moduleId,interfaseId){
    return http.delete(`/interfase/${moduleId}/${interfaseId}`).then(data=>{
      return data;
    })
  },


  fetchUpdateModule(moduleId,params){
    return http.put(`/module/${moduleId}`,params).then(data=>{
      return data;
    })
  },

  fetchAddModule(params){
    return http.post(`/module`,params).then(data=>{
      return data;
    })
  },

  fetchDeleteModule(moduleId){
    return http.delete(`/module/${moduleId}`).then(data=>{
      return data;
    })
  },

  fetchGetProjectInfo(id){
    return http.get(`/project/info/${id}`).then(data=>{
      return data;
    })
  },

  fetchGetProjectData(id){
    return http.get(`/project/${id}`).then(data=>{
      return data;
    })
  },

  fetchUpdateProject(id,params){
    return http.put(`/project/${id}`,params).then(data=>{
      return data;
    })
  },

  fetchDeleteProject(id){
    return http.delete(`/project/${id}`).then(data=>{
      return data;
    })
  },
  fetchAddProject(params){
    return http.post(`/project/`,params).then(data=>{
      return data;
    })
  },
  fetchAddWatchProject(params){
    return http.post(`/users/watch-project/`,params).then(data=>{
      return data;
    })
  },
  fetchGetWatchProjectList(params){
    return http.get(`/users/watch-project/`,params).then(data=>{
      return data;
    })
  },

  fetchGetProjectsRecordList(params){
    return http.get(`/record/`,params).then(data=>{
      return data;
    })
  },

  fetchDeleteWatchProject(params){
    return http.put(`/users/watch-project/`,params).then(data=>{
      return data;
    })
  },
  fetchGetInterfaseRecord(interfaseId,params){
    return http.get(`/record/interfase/${interfaseId}`,params).then(data=>{
      return data;
    })
  },

  fetchAddRemork(params){
    return http.post(`/remark/`,params).then(data=>{
      return data;
    })
  },
  fetchDeleteRemork(id){
    return http.delete(`/remark/${id}`).then(data=>{
      return data;
    })
  },

  fetchGetDoc(id){
    return http.get(`/doc/${id}`).then(data=>{
      return data;
    })
  },
  fetchAddDoc(params){
    return http.post(`/doc/`,params).then(data=>{
      return data;
    })
  },
  fetchUpdateDoc(id,params){
    return http.put(`/doc/${id}`,params).then(data=>{
      return data;
    })
  },
  fetchDeleteDoc(id){
    return http.delete(`/doc/${id}`).then(data=>{
      return data;
    })
  }

}


export default fetchApi;
