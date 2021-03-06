import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { fetchDisciplines, addDiscipline, deleteDiscipline, getDisciplineById } from "../api/disciplines";
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
  showDisciplineInfo = (disciplineId) => {
    const disciplineIndex = this.disciplines.findIndex(item => item._id === disciplineId);
    this.disciplines[disciplineIndex].isInfoShown = !this.disciplines[disciplineIndex].isInfoShown;
    // this.disciplines[0].isInfoShown = true;
  }

  @action
  addDiscipline = (data) => {
    this.token = this.rootStore.token;
    const requestData = JSON.stringify(data);
    console.log(requestData);
    addDiscipline(this.token, requestData, {
      success: (result) => {
        console.log(result);
        this.fetchDisciplinesList(this.token)           
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  getDiscipline = (data) => {
    this.token = this.rootStore.token;
    // const requestData = JSON.stringify(data);
    getDisciplineById(this.token, data, {
      success: (result) => {
        console.log(result);
        this.rootStore.disciplineForm.setAllFields(result);        
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  deleteDiscipline = (id) => {
    const requestData = JSON.stringify({"id": id});
    this.token = this.rootStore.token;
    deleteDiscipline(this.token, requestData, {
      success: (result) => {
        console.log(result);
        this.fetchDisciplinesList(this.token)      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default DisciplineStore;
