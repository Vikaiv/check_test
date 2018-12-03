import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { auth } from "../api/login";
import { fetchTestsByDisciplineId } from "../api/tests";
import DisciplineStore from "./disciplineStore";
import TestStore from "./testStore";
import DisciplineFormStore from "./disciplineFormStore";
import TestFormStore from "./testFormStore";
class RootStore {
  @observable token = null;

  constructor() {
    this.authUser("vi@i.com", "12345")
    this.router = new RouterStore();
    this.disciplines = new DisciplineStore(this);
    this.tests = new TestStore(this);
    this.disciplineForm = new DisciplineFormStore(this);
    this.testForm = new TestFormStore(this);
    this.router.goTo(views.home);
  }

  @action
  authUser = (username, password) => {
    auth(username, password, {
      success: (result) => {
        // console.log("result", result.result.data.token);
        runInAction(() => {
          this.token = result.result.data.token;
          this.disciplines.fetchDisciplinesList(this.token);
        });  
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default RootStore;
