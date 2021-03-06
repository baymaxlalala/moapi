import {observable, action, useStrict,runInAction} from 'mobx';
import fetchApi from "@/api"

useStrict(true)
class User {
  @observable userInfo = {
    name:"",
    phone:'',
    accessToken:'',
    type:4
  };

  @observable  userList=[]


  @action.bound
  getUserInfo(){
    // let user=window.localStorage.getItem('user');
    // if(user){
    //   this.userInfo=JSON.parse(user)
    // }
  }


  @action.bound
  cleanUserInfo(){
    window.localStorage.removeItem('user');
    this.userInfo={};
  }

  @action.bound
  signin(info){
    return fetchApi.fetchSignin(info).then(data=>{
      runInAction(()=>{
        this.userInfo=data;
      })
      window.localStorage.setItem('user',JSON.stringify(data))
      fetchApi.http.updateToken(data.accessToken)
      return data;
    })
  }

  @action.bound
  signup(info){
    return fetchApi.fetchSignup(info).then(data=>{
      runInAction(()=>{
        this.userInfo=data;
      })
      window.localStorage.setItem('user',JSON.stringify(data))
      fetchApi.http.updateToken(data.accessToken)
      return data;
    })
  }

  @action.bound
  delUser(){

  }
  @action.bound
  getUserList(){
    return fetchApi.fetchGetUserList().then(data=>{
      runInAction(()=>{
        this.userList=data;
      })
      return data;
    })
  }




}

const user=new User();
user.getUserInfo()
export default user;
