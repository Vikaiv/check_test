import { observable, action } from "mobx";
class TestForm {
  @observable fields = {
    name: "",
    questions: [{
      type: "",
      description: "",
      answerVariants: []
    }],
    disciplineId: "",
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
    console.log(this.fields);
  }
}

export default TestForm;
