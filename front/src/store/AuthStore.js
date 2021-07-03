import axios from 'axios';
import {action, computed, observable} from 'mobx';

class AuthStore {
  @observable user = {};

  @computed
  get getUser() {
    return this.user
  }

  @action
  setUser = (user) => {
    this.user = user;
  }

  @action
  _registCallApi = async data => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user', data);
      // response msg 결과?
    } catch (e) {
      console.log(e.response);
    }
  };

  @action
  _loginCallApi = async data => {
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/auth', data)
      console.log(response);
    }catch(e){
      alert(e.response)
    } 
  }
}

const store = new AuthStore();

export default store;
