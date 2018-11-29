import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { fetchDisciplines, addDiscipline, deleteDiscipline } from "../api/disciplines";
import RootStore from "./disciplineStore";

class DisciplineStore {
  @observable disciplines = [];
  @observable token = null;

  constructor(rootStore) {
    // this.router = new RouterStore();
    // this.router.goTo(views.home);
    this.rootStore = rootStore;
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

  @action
  addDiscipline = (data) => {
    addDiscipline(this.rootStore.token, data, {
      success: (result) => {
        console.log(result);
        runInAction(() => {
          console.log(this.disciplines);
        });      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  deleteDiscipline = (id) => {
    const data = JSON.stringify({"id": id});
    this.token = this.rootStore.token;
    deleteDiscipline(this.token, data, {
      success: (result) => {
        console.log(result);
        this.fetchDisciplinesList(this.token)      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default DisciplineStore;
