<template>
    <section v-if="editorActive">
        <div class="cover" v-on:click="resetEditor"></div>
        <form>
            <h4 class="text-center">
                <span v-if="employee.id">Edit</span>
                <span v-if="!employee.id">Register</span>
                Employee
            </h4>
            <div class="form-inputs">
                <div class="errors" v-if="errors.length">
                    <div class="badge badge-pill badge-danger">Please fix these errors</div>
                    <div v-for="error in errors" :key="error">{{error}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model="employee.name" ref="employeeName" type="text" class="form-control" id="name" placeholder="Enter name...">
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="employee.title" type="text" class="form-control" id="title" placeholder="Enter title...">
                </div>
                <div class="form-group">
                    <label for="salary">Salary</label>
                    <input v-model="employee.salary" type="number" class="form-control" id="salary" placeholder="">
                </div>
                <input v-model="employee.id" type="hidden" />
                <input v-model="employee.key" type="hidden" />
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.prevent.stop="saveEditor">
                <span v-if="employee.id">Save</span>
                <span v-if="!employee.id">Register Employee</span>
            </button>
            <div class="btn btn-outline-danger" v-on:click="resetEditor">Cancel</div>
        </form>
    </section>
</template>

<script>
export default {
  name: "Employees",
  data() {
    return {
      editorActive: false,
      errors: [],
      employee: {
        id: 0,
        name: "",
        title: "",
        salary: "",
        key: ""
      }
    };
  },
  created() {
    events.$on("launchEditor", (employee) => {
      if (employee) {
        if (employee.id) this.employee.id = employee.id;
        if (employee.name) this.employee.name = employee.name;
        if (employee.title) this.employee.title = employee.title;
        if (employee.salary) this.employee.salary = employee.salary;
        if (employee.key) this.employee.key = employee.key;
      }
      this.editorActive = true;
      events.$nextTick(() => this.$refs.employeeName.focus());
    });
  },
  methods: {
    saveEditor() {
      // Input Validation
      let validation = this.validateInput(this.employee);
      if (!validation) this.errors = [];
      else {
        this.errors = validation;
        return;
      }
      events.$emit("saveEdits", this.employee);
      this.resetEditor();
    },
    resetEditor() {
      this.editorActive = false;
      this.employee.id = 0;
      this.employee.name = "";
      this.employee.title = "";
      this.employee.salary = "";
      this.employee.key = "";
      this.errors = [];
    },
    validateInput(employee) {
      let errors = [];
      let stringLimit = 50;

      if (!employee) errors.push("Unknown Error");

      if (!employee.name || !employee.name.trim())
        errors.push("Name is Required");
      if (employee.name && employee.name.length && employee.name.length > stringLimit)
        errors.push("Name is Longer Than " + stringLimit + " Characters");

      if (!employee.title || !employee.title.trim())
        errors.push("Title is Required");
      if (
        employee.title &&
        employee.title.length &&
        employee.title.length > stringLimit
      )
        errors.push("Title is Longer Than " + stringLimit + " Characters");

      if (!employee.salary)
        errors.push("Salary is Required");

      if (!errors.length) return false;
      return errors;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.errors {
  padding-bottom: 10px;
}
.cover {
  width: 100%;
  height: 100%;
  background: #222;
  opacity: 0.8;
}
form {
  width: 400px;
  margin: 50px auto;
  background: #fff;
  padding: 30px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -200px;
}
.form-inputs {
  padding-bottom: 10px;
}
</style>
