import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { auth } from "../api/login";
import { fetchDisciplines } from "../api/disciplines";
import { fetchTestsByDisciplineId } from "../api/tests";

class RootStore {
  @observable disciplines = [];
  @observable tests = [];
  @observable token = null;

  constructor() {
    this.authUser("vi@i.com", "12345")
    this.router = new RouterStore();
    this.router.goTo(views.home);
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
          console.log(this.disciplines);
        });      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  fetchTests = (disciplineId) => {
    console.log(disciplineId);
    fetchTestsByDisciplineId(this.token, disciplineId, {
      success: (result) => {
        runInAction(() => {
          this.tests = result.result.data;
          console.log(this.tests);
        });      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default RootStore;
