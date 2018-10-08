import { observable, action, runInAction } from "mobx";
import { auth } from "../api/login";
import { fetchDisciplines } from "../api/disciplines";

class RootStore {
  @observable disciplines = [];
  @observable token = null;

  constructor() {
    this.authUser("vi@i.com", "12345")
  }

  @action
  authUser = (username, password) => {
    auth(username, password, {
      success: (result) => {
        // console.log("result", result.result.data.token);
        runInAction(() => {
          this.token = result.result.data.token;
          this.fetchDisciplinesList(this.token);
        });  
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  fetchDisciplinesList = () => {
    // console.log("start action");
    fetchDisciplines(this.token, {
      success: (result) => {
        runInAction(() => {
          this.disciplines = result.result.data;
          // console.log(this.disciplines);
        });      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default RootStore;
