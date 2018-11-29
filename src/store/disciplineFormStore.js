import { observable, action, runInAction } from "mobx";

class FormStore {
  @observable formFields = {
    number: "",
    description: "",
    elementaries: [],
  };


  @action
  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name in this.formFields) {
      this.formFields[name].onChange(type === "checkbox" ? checked : value);

      if (this.formTouched) {
        if (!this.formFields[name].error) {
          this.invalidFields = this.invalidFields.filter(field => field !== name);
        } else {
          !this.invalidFields.includes(name) && this.invalidFields.push(name);
        }
      }
    }
  };

  @action
  submitForm = () => runInAction(() => {
    this.formTouched = true;
    this.invalidFields = [];
    const fields = Object.keys(this.formFields).filter(item => this.formFields[item].display);

    fields.forEach((item) => {
      const field = this.formFields[item];
      field.touched = true;
      field.validateField();

      if (field.error) {
        this.invalidFields.push(item);
      }
    });

    return this.isFormValid(fields);
  });
}

export default FormStore;
