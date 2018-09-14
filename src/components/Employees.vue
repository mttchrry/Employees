<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Employees</h1>
                </div>
            </div>
            <div class="alert alert-warning" v-if="error">
                Can't load data, check firebase config settings.
            </div>
            <div class="row employeeResults">
                <div class="col" v-if="employees.length">
                    <table v-if="employees.length">
                        <tr>
                            <th class="modifications"></th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Salary</th>                            
                        </tr>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td class="modification">
                                <a href="#" class="badge badge-success" v-on:click.prevent="launchEditor(employee, employees)">edit</a>
                                <a href="#" class="badge badge-danger" v-on:click.prevent="deleteEmployee(employee)">delete</a>
                            </td>
                            <td><a href="#" v-on:click.prevent="launchEditor(employee, employees)">{{employee.name}}</a></td>
                            <td>{{employee.title}}</td>
                            <td>{{employee.salary}}</td>
                            
                        </tr>
                    </table>
                </div>
                <div class="alert alert-warning" v-if="loading">
                    Loading employees.
                </div>
                <div class="alert alert-warning" v-if="!employees.length && !loading && !error">
                    No Employees.
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary" v-on:click="launchEditor({}, employees)">Register Employee</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import "firebase/database";
import Firebase from "firebase/app";
import Vue from "vue";
import config from "../../config.env";

let configParams = {
  apiKey: config.firebaseKey,
  authDomain: `${config.firebaseEndpoint}.firebaseapp.com`,
  databaseURL: `https://${config.firebaseEndpoint}.firebaseio.com`,
  projectId: config.firebaseEndpoint,
  storageBucket: `${config.firebaseEndpoint}.appspot.com`,
  messagingSenderId: config.firebaseSenderId
};

let app = Firebase.initializeApp(configParams);
let db = app.database();
var employeesRef = db.ref("/employees/");

export default {
  name: "Employees",
  data() {
    return {
      error: false,
      employees: [],
      duplicateNames: false,
      loading: true
    };
  }, 
  created() {
    var connectedRef = db.ref(".info/connected");
    setTimeout(()=>{connectedRef.on("value", snapshot => {
      this.loading = false;
      if(snapshot.val() === true){
        this.error = false;
      } else {
        this.error = true;
      }
    })}, 2000);
   
    employeesRef.on("value", snapshot => {
      this.loading = false;
      this.employees = [];
      if(!snapshot.val()){
        this.error = true;
      }
      snapshot.forEach(childSnapshot => {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        this.employees.push(item);
      });
    });

    events.$on("saveEdits", employee => {
      if (!employee) return;

      // Update
      if (employee.id && employee.key) {
        employeesRef.child(employee.key).set(employee);
        return;
      }

      // Create
      employeesRef.push({
        id: this.getNextEmployeeId(),
        name: employee.name,
        title: employee.title,
        salary: employee.salary
      });
    });
  },
  methods: {
    deleteEmployee(employee) {
      employeesRef.child(employee.key).remove();
    },
    launchEditor(data, employees) {
      events.$emit("launchEditor", data, employees);
    },
    getNextEmployeeId() {
      let nextEmployeeId = 1;
      if (!this.employees || !this.employees.length) return nextEmployeeId;
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].id >= nextEmployeeId)
          nextEmployeeId = this.employees[i].id + 1;
      }
      return nextEmployeeId;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .employeeResults {
    min-height: 100px;
  }
  min-height: 200px;
  padding-bottom: 20px;
  h1 {
    font-size: 22px;
    color: #1b0092;
    line-height: 30px;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
  }
  table {
    margin-bottom: 20px;
    th,
    td {
      padding-right: 20px;
      width: 200px;
      &.salary {
        width: 80px;
      }
    }
  }
  .btn{
    margin-right: auto;
    margin-left: auto;
    display: block;
  }
}
</style>



