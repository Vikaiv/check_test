import { observable, action, runInAction } from "mobx";
import { RouterStore } from 'mobx-router';
import views from "../views/views";
import { fetchTestsByDisciplineId, addTest, deleteTest } from "../api/tests";
import RootStore from "./testStore";

class testStore {
  @observable tests = [];
  @observable token = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetchTests = (disciplineId) => {
    this.token = this.rootStore.token;
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
  showTestInfo = (testId) => {
    const testIndex = this.tests.findIndex(item => item._id === testId);
    this.tests[testIndex].isInfoShown = !this.tests[testIndex].isInfoShown;
    // this.tests[0].isInfoShown = true;
  }

  @action
  addTest = (data) => {
    this.token = this.rootStore.token;
    const requestData = JSON.stringify(data);
    console.log(requestData);
    addTest(this.token, requestData, {
      success: (result) => {
        console.log(result);
        this.fetchTests(this.token)           
      },
      error: (result) => { console.error("error: ", result); },
    })
  }

  @action
  deleteTest = (id) => {
    const requestData = JSON.stringify({"id": id});
    this.token = this.rootStore.token;
    deletetest(this.token, requestData, {
      success: (result) => {
        console.log(result);
        this.fetchtestsList(this.token)      
      },
      error: (result) => { console.error("error: ", result); },
    })
  }
}

export default testStore;
