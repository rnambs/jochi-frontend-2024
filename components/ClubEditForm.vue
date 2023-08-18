<template>
  <div id="right-panel" class="right-panel">
    <div class="content">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header d-flex flex-column align-items-start">
                <strong>View Details</strong><small></small>
              </div>
              <div class="card-body card-block">
                <form @submit.prevent="UpdateClubs">
                  <div class="form-group required row align-items-center">
                    <label
                      for="school"
                      class="form-label text-secondary col-3 col-xl-2 py-1"
                      >Club Name</label
                    >
                    <!-- <input
                      type="text"
                      id="club"
                      placeholder="Enter your club name"
                      class="form-control"
                      v-model="clubname"
                      :class="{ 'is-invalid': submitted && $v.clubname.$error }"
                    /> -->
                    <span class="font-weight-bold col-8 col-xl-9 py-1">{{
                      clubname
                    }}</span>
                    <!-- <div
                      v-if="submitted && $v.clubname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.clubname.required"
                        >This field is required</span
                      >
                    </div> -->
                  </div>
                  <div class="form-group required row align-items-center">
                    <label
                      for="state"
                      class="form-label text-secondary col-3 col-xl-2 py-1"
                      >School</label
                    >
                    <span
                      v-if="clubDetails.schools"
                      class="font-weight-bold col-8 col-xl-9 py-1"
                      >{{ clubDetails.schools.name }}</span
                    >
                    <!-- <select
                      @input="GetSchool()"
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      disabled
                      v-model="schoollist"
                      :class="{
                        'is-invalid': submitted && $v.schoollist.$error,
                      }"
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
                    </div> -->
                  </div>
                  <div class="form-group required row">
                    <label
                      for="state"
                      class="form-label text-secondary col-3 col-xl-2 py-1"
                      >Student Leaders</label
                    >
                    <span
                      v-if="leaders && leaders.length > 0"
                      class="col-8 col-xl-9 py-1 d-flex"
                    >
                      <span
                        v-for="leader in leaders"
                        :key="leader.id"
                        class="d-flex flex-wrap w-100"
                      >
                        <span
                          v-if="leader.user_info.user_type_id == '3'"
                          class="
                            bg-primary-light
                            rounded-pill
                            px-3
                            py-1
                            pb-2
                            mb-2
                            mr-2
                            text-nowrap
                          "
                        >
                          {{
                            leader.user_info.first_name +
                            " " +
                            leader.user_info.last_name
                          }}
                        </span>
                      </span>
                    </span>

                    <!-- <select
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
                    </div> -->
                  </div>
                  <div class="form-group required row align-items-center">
                    <label
                      for="state"
                      class="form-label text-secondary col-3 col-xl-2"
                      >Teacher Leaders</label
                    >

                    <span
                      v-if="leaders && leaders.length > 0"
                      class="col-8 col-xl-9 d-flex"
                    >
                      <span
                        v-for="leader in leaders"
                        :key="leader.id"
                        class="d-flex flex-wrap w-100"
                      >
                        <span
                          v-if="leader.user_info.user_type_id == '2'"
                          class="
                            bg-primary-light
                            rounded-pill
                            px-3
                            py-1
                            pb-2
                            mb-2
                            mr-2
                            text-nowrap
                          "
                        >
                          {{
                            leader.user_info.first_name +
                            " " +
                            leader.user_info.last_name
                          }}
                        </span>
                      </span>
                    </span>

                    <!-- <select
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
                    </div> -->
                  </div>

                  <!-- <button
                    type="submit"
                    class="btn btn-primary btn-flat m-b-30 m-t-30"
                    :disabled="processing"
                  >
                    Save
                  </button> -->
                  <button
                    type="submit"
                    class="btn-flat m-b-30 m-t-30 color-dark mb-2 mt-3"
                  >
                    <nuxt-link
                      to="/club-list-table"
                      class="
                        border border-secondary
                        text-decoration-none text-dark
                        btn
                        px-3
                        py-1
                        rounded-pill
                        border-0
                        bg-primary-light
                      "
                      ><span><i class="fas fa-long-arrow-alt-left"></i></span>
                      <span class="font-weight-bold">Back</span></nuxt-link
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
var schoolListValue = "";
export default {
  name: "ClubEditForm",
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
      processing: false,
      school: "",
      teacherLeaders: [],
    };
  },
  validations: {
    clubname: { required },
    schoollist: { required },
    teacherlist: { required },
    leaderlist: { required },
  },
  computed: {
    ...mapState("clubEditForm", {
      clubDetails: (state) => state.clubDetails,
      leaders: (state) => state.leaders,
      schools: (state) => state.schools,
      Students: (state) => state.Students,
      Teachers: (state) => state.Teachers,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  mounted() {
    this.FetchClub();
    this.getSchool();
  },
  methods: {
    ...mapActions("clubEditForm", {
      fetchClub: "fetchClub",
      getSchool: "getSchool",
      updateClubs: "updateClubs",
      getTeacher: "getTeacher",
      getStudents: "getStudents",
    }),
    async FetchClub() {
      await this.fetchClub({
        id: this.$route.query.id,
      });
      this.clubname = this.clubDetails?.name;
      this.schoollist = this.clubDetails.school_id;
      this.leaderlist = this.clubDetails.student_id;
      this.teacherlist = this.clubDetails.teacher_id;
      schoolListValue = this.clubDetails.school_id;
      this.GetStudents();
      this.GetTeacher();
    },

    async UpdateClubs() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.updateClubs({
          id: this.$route.query.id,
          name: this.clubname,
          school_id: this.schoollist,
          teacher_id: this.teacherlist,
          student_id: this.leaderlist,
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
    async GetSchool() {
      await this.getSchool({});
      this.GetStudents();
      this.GetTeacher();
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
    SchoolSelection(val) {
      if (val) {
        schoolSelectValue = val.id;
      }
    },
  },
};
</script>