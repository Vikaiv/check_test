import { observable, action } from "mobx";
import { fetchDisciplines } from "../api/disciplines";

class RootStore {
//   @observable disciplines = [];

  constructor(apiUrl) {
    // this.checks = new Checks(this, apiUrl);
    // this.checks.getDictionaries();
    // this.formStore = new FormStore();
    // this.results = new Results(this, apiUrl);
    // this.router = new RouterStore();
    // this.history = new History(this, apiUrl);
    // this.history.getAllHistory();
    // this.router.goTo(routerConfig.checks);
    this.fetchDisciplines();
  }

  @action
  fetchAllDisciplines = () => {
    fetchDisciplines()
      .then(result => console.log(result))
  }
}

export default RootStore;
