import { observable, action } from "mobx";
class DisciplineForm {
  @observable fields = {
    disciplineName: "",
    elementaries: [{number: "", elementaryName: ""}],
    email: "vi@i.com",
  }

  @action
  /**
   * Updates field value in the fields object, revalidates new value
   * @param fieldName name of the form field which would be updated
   * @param value new value of the field
   */
  updateField = (fieldName, value) => {
    this.fields[fieldName] = value;
    // console.log(this.fields);
  }

  @action
  setAllFields = (disciplineData) => {
    this.fields = disciplineData.result.data;
    console.log(this.fields);
  }
}

export default DisciplineForm;
