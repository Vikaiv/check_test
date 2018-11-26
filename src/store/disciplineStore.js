import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { fetchDisciplines } from "../api/disciplines";

class DisciplineStore {
  @observable disciplines = [];
  @observable token = null;

  constructor() {
    // this.router = new RouterStore();
    // this.router.goTo(views.home);
  }

  @action
  fetchDisciplinesList = (token) => {
    // console.log("start action");
    fetchDisciplines(token, {
      success: (result) => {
        runInAction(() => {
          result.result.data.forEach(item => {
            item.isInfoShown = false;
          });
          this.disciplines = result.result.data;
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

  @action
  showDisciplineInfo = (disciplineId) => {
    const disciplineIndex = this.disciplines.findIndex(item => item._id === disciplineId);
    this.disciplines[disciplineIndex].isInfoShown = !this.disciplines[disciplineIndex].isInfoShown;
    // this.disciplines[0].isInfoShown = true;
  }
}

export default DisciplineStore;
