<template>
  <div id="right-panel" class="right-panel">
    <div class="content">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <strong>Add Club</strong><small></small>
              </div>
              <div class="card-body card-block">
                <form @submit.prevent="AddClubs">
                  <div class="form-group required">
                    <label for="school" class="form-control-label"
                      >Club Name</label
                    ><input
                      type="text"
                      id="club"
                      placeholder="Enter your club name"
                      class="form-control"
                      v-model="clubname"
                      :class="{ 'is-invalid': submitted && $v.clubname.$error }"
                    />
                    <div
                      v-if="submitted && $v.clubname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.clubname.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required">
                    <label for="state" class="form-control-label"
                      >Select the School</label
                    >

                    <select
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      v-model="schoollist"
                      :class="{
                        'is-invalid': submitted && $v.schoollist.$error,
                      }"
                      @input="GetSchool()"
                    >
                      <option
                        :value="school.id"
                        v-for="(school, index) in schools"
                        :key="index"
                      >
                        {{ school.name }}
                      </option>
                      <option v-if="schools.length == 0">No data</option>
                    </select>

                    <div
                      v-if="submitted && $v.schoollist.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.schoollist.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required" v-if="schoollist">
                    <label for="state" class="form-control-label"
                      >Select the Leader</label
                    >

                    <select
                      @input="StudentSelection"
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      v-model="leaderlist"
                      :class="{
                        'is-invalid': submitted && $v.leaderlist.$error,
                      }"
                    >
                      <option
                        :value="Student.id"
                        v-for="(Student, index) in Students"
                        :key="index"
                      >
                        {{ Student.first_name }}
                      </option>
                      <option v-if="Students.length == 0">No data</option>
                    </select>

                    <div
                      v-if="submitted && $v.leaderlist.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.leaderlist.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required" v-if="schoollist">
                    <label for="state" class="form-control-label"
                      >Select the Teacher</label
                    >

                    <select
                      @input="TeacherSelection"
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      v-model="teacherlist"
                      :class="{
                        'is-invalid': submitted && $v.teacherlist.$error,
                      }"
                    >
                      <option
                        :value="Teacher.id"
                        v-for="(Teacher, index) in Teachers"
                        :key="index"
                      >
                        {{ Teacher.first_name }}
                      </option>
                      <option v-if="Teachers.length == 0">No data</option>
                    </select>

                    <div
                      v-if="submitted && $v.teacherlist.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.teacherlist.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary btn-flat m-b-30 m-t-30"
                    :disabled="processing"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    class="btn-flat m-b-30 m-t-30 color-dark"
                  >
                    <nuxt-link
                      to="/club-list-table"
                      class="
                        border border-secondary
                        text-decoration-none text-dark
                        btn
                        bg-light
                      "
                    >
                      cancel</nuxt-link
                    >
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import Multiselect from "vue-multiselect";
var schoolSelectValue = "";
var teacherSelectValue = "";
var studentSelectValue = "";

export default {
  name: "ClubDetailsForm",
  components: {
    Multiselect,
  },
  data() {
    return {
      clubname: "",
      schoollist: "",
      teacherlist: "",
      leaderlist: "",
      submitted: false,
      schoolValue: "",
      processing: false,
    };
  },
  validations: {
    clubname: { required },
    schoollist: { required },
    teacherlist: { required },
    leaderlist: { required },
  },
  mounted() {
    this.GetSchool();
  },
  computed: {
    ...mapState("clubForm", {
      schools: (state) => state.schools,
      Students: (state) => state.Students,
      Teachers: (state) => state.Teachers,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("clubForm", {
      getSchool: "getSchool",
      addClubs: "addClubs",
      getTeacher: "getTeacher",
      getStudents: "getStudents",
    }),
    async GetSchool() {
      await this.getSchool({});
      if (this.schoollist) {
        this.GetStudents();
        this.GetTeacher();
      }
    },

    async GetTeacher() {
      await this.getTeacher({
        school_id: this.schoollist,
      });
    },
    async GetStudents() {
      await this.getStudents({
        school_id: this.schoollist,
      });
    },
    async AddClubs() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.addClubs({
          school_id: this.schoollist,
          teacher_id: this.teacherlist,
          student_id: this.leaderlist,
          name: this.clubname,
        });
        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.$router.push("/club-list-table");
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
        this.processing = false;
      }
    },
    SchoolSelection(val) {
      if (val) {
        schoolSelectValue = val.id;
      }
    },
    StudentSelection(val) {
      if (val) {
        studentSelectValue = val.id;
      }
    },
    TeacherSelection(val) {
      if (val) {
        teacherSelectValue = val.id;
      }
    },
  },
};
</script>