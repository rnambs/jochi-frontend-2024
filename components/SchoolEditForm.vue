<template>
  <div id="right-panel" class="right-panel">
    <div class="content">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <strong>Edit School</strong><small></small>
              </div>
              <div class="card-body card-block">
                <form @submit.prevent="UpdateSchools">
                  <div class="form-group required">
                    <label for="school" class="form-control-label"
                      >School Name</label
                    ><input
                      type="text"
                      id="school"
                      placeholder="Enter your school name"
                      class="form-control"
                      v-model="Schoolname"
                      :class="{
                        'is-invalid': submitted && $v.Schoolname.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.Schoolname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.Schoolname.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required">
                    <label class="form-control-label">Phone Number</label>
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-phone"></i>
                      </div>
                      <input
                        class="form-control"
                        type="tel"
                        placeholder="(xxx) xxx-xxxx"
                        v-model="phone"
                        @input="acceptNumber"
                        :class="{ 'is-invalid': submitted && $v.phone.$error }"
                      />
                      <div
                        v-if="submitted && $v.phone.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.phone.required"
                          >This field is required</span
                        >
                        <span v-if="!($v.phone.minLength && $v.phone.maxLength)"
                          >Phone number is invalid</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group required">
                    <label class="form-control-label">Email address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model="Email"
                      :class="{ 'is-invalid': submitted && $v.Email.$error }"
                      maxlength="320"
                    />
                    <div
                      v-if="submitted && $v.Email.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.Email.required"
                        >This field is required</span
                      >
                      <span v-if="!$v.Email.email">Email is invalid</span>
                    </div>
                  </div>

                  <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >Contact Person</label
                    ><input
                      type="text"
                      id="person"
                      placeholder="Enter the name of contact person"
                      class="form-control"
                      v-model="ContactPerson"
                      :class="{
                        'is-invalid': submitted && $v.ContactPerson.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.ContactPerson.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.ContactPerson.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <!-- GG4L details -->
                  <!-- <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >GG4L Client Id</label
                    ><input
                      type="text"
                      id="GG4L_client_id"
                      class="form-control"
                      v-model="GG4L_client_id"
                      :class="{
                        'is-invalid': submitted && $v.GG4L_client_id.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.GG4L_client_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.GG4L_client_id.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >GG4L Client Secret Key</label
                    ><input
                      type="text"
                      id="GG4L_client_secret"
                      class="form-control"
                      v-model="GG4L_client_secret"
                      :class="{
                        'is-invalid': submitted && $v.GG4L_client_secret.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.GG4L_client_secret.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.GG4L_client_secret.required"
                        >This field is required</span
                      >
                    </div>
                  </div> -->

                  <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >School ID</label
                    ><input
                      type="text"
                      id="school_lms_id"
                      name="school_lms_id"
                      class="form-control"
                      v-model="school_lms_id"
                      :class="{
                        'is-invalid': submitted && $v.school_lms_id.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.school_lms_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.school_lms_id.required"
                        >This field is required</span
                      >
                    </div>
                    <!-- :class="{
                        'is-invalid': submitted && $v.school_lms_id.$error,
                      }" -->
                    <!-- <div
                      v-if="submitted && $v.school_lms_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.school_lms_id.required"
                        >This field is required</span
                      >
                    </div> -->
                  </div>

                  <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >District Access Token</label
                    ><input
                      type="text"
                      id="district_access_token"
                      class="form-control"
                      v-model="district_access_token"
                      :class="{
                        'is-invalid':
                          submitted && $v.district_access_token.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.district_access_token.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.ContactPerson.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <!-- <div class="form-group">
                    <label for="contact-person" class="form-control-label"
                      >GG4L Sis ID </label
                    ><input
                      type="text"
                      id="GG4L_sis_id"
                      class="form-control"
                      v-model="GG4L_sis_id"
                    />
                    
                  </div> -->
                  <!-- GG4L details end -->

                  <div class="form-group required">
                    <label for="state" class="form-control-label"
                      >Select your State</label
                    >
                    <select
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      v-model="statelist"
                      :class="{
                        'is-invalid': submitted && $v.statelist.$error,
                      }"
                    >
                      <option
                        :value="state.id"
                        v-for="(state, index) in states"
                        :key="index"
                      >
                        {{ state.state_name }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && $v.statelist.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.statelist.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <div class="form-group required">
                    <label for="exampleFormControlTextarea2">Description</label>
                    <textarea
                      class="form-control rounded-0"
                      id="exampleFormControlTextarea2"
                      rows="3"
                      v-model="Description"
                      :class="{
                        'is-invalid': submitted && $v.Description.$error,
                      }"
                    ></textarea>
                    <div
                      v-if="submitted && $v.Description.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.Description.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required">
                    <label for="state" class="form-control-label"
                      >Select the Time zone</label
                    >
                    <select
                      class="custom-select custom-select-sm mb-3"
                      tabindex=""
                      v-model="timezonelist"
                      :class="{
                        'is-invalid': submitted && $v.timezonelist.$error,
                      }"
                    >
                      <option
                        :value="time.id"
                        v-for="(time, index) in timezone"
                        :key="index"
                      >
                        {{ time.timeZone }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && $v.timezonelist.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.timezonelist.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group required">
                    <div class="d-inline-flex">
                    <label  for="access" class="form-control-label"
                      >Select the Jochi Access</label
                    >
                    <div class="position-relative ml-1">
                    <span
  @click="toggleTooltip"
  @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
  class="fa-solid fa-circle-info cursor-pointer tooltip-trigger"
  :class="{ 'active': showTooltip }"
></span>

                    <span v-show="showTooltip" class="outlined-span">
                      School access can be updated from
                       club only access to full access,
                        but it cannot be updated from
                         full access to club only access.
                    </span>
                    </div>
                  </div>
                    <div>
                    <div class="form-check form-check-inline">
                    <input 
                    :class="{ 'form-check-input': true, 'cursor-pointer': selectedAccess !== 'FullAccess' }"
                    type="radio" 
                    name="access" 
                    value="FullAccess"
                    v-model="selectedAccess"
                    id="fullaccess"
                    >
                    <label class="form-check-label" for="fullaccess">
                      Full Access
                    </label>
                   </div>
                   <div class="form-check form-check-inline"  v-if="showClubOnlyDiv">
                    <input class="form-check-input cursor-pointer" 
                    type="radio" 
                    name="access" 
                    value="ClubOnly"
                    v-model="selectedAccess"
                    id="clubonlyaccess"
                    >
                    <label class="form-check-label" for="clubonlyaccess">
                      Club Only Access
                    </label>
                   </div>
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
                      to="/school-list-table"
                      class="border border-secondary text-decoration-none text-dark btn bg-primary-light"
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
import { mapState, mapActions } from "vuex";
import { ref } from 'vue';
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "SchoolEditForm",
  data() {
    return {
      showTooltip: false,
      Email: "",
      ContactPerson: "",
      Schoolname: "",
      phone: "",
      statelist: "",
      Description: "",
      timezonelist: "",
      selectedAccess: "",
      showClubOnlyDiv: false,
      submitted: false,
      processing: false,
      // GG4L_client_id: "",
      // GG4L_client_secret: "",
      school_lms_id: "",
      district_access_token: "",
      // GG4L_sis_id: "",
    };
  },
  validations: {
    Email: { required, email },
    ContactPerson: { required },
    Schoolname: { required },
    phone: { required, minLength: minLength(10), maxLength: maxLength(14) },
    statelist: { required },
    timezonelist: { required },
    selectedAccess: { required },
    Description: { required },
    // GG4L_client_id: { required },
    // GG4L_client_secret: { required },
    school_lms_id: { required },
    district_access_token: { required },
    // GG4L_sis_id: { required },
  },
  mounted() {
    this.FetchSchool();
    this.fetchStates();
    this.fetchTimeZone();

  },
  computed: {
    ...mapState("schoolEditForm", {
      schoolDetails: (state) => state.schoolDetails,
      timezone: (state) => state.timezone,
      states: (state) => state.states,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  watch: {
  selectedAccess(newValue) {
    // Watch for changes in selectedAccess
    if (newValue !== "FullAccess") {
      
      this.showClubOnlyDiv = true;
    } else {
      // Otherwise, hide the Club Only div
      // this.showClubOnlyDiv = false;
    }
  },
},
  methods: {
    ...mapActions("schoolEditForm", {
      fetchSchool: "fetchSchool",
      fetchStates: "fetchStates",
      updateSchools: "updateSchools",
      fetchTimeZone: "fetchTimeZone",
    }),
    acceptNumber() {
      var x = this.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,0})/);
      this.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "") + x[4];
    },
    toggleTooltip() {
      this.showTooltip = !this.showTooltip;
    },
    async FetchSchool() {
      await this.fetchSchool({
        school_id: this.$route.query.id,
      });
      this.Schoolname = this.schoolDetails.name;
      this.phone = this.schoolDetails.phone;
      this.Email = this.schoolDetails.email;
      this.ContactPerson = this.schoolDetails.contact_person;
      this.statelist = this.schoolDetails.state;
      this.Description = this.schoolDetails.description;
      this.timezonelist = this.schoolDetails.time_zone;
      // this.selectedAccess =this.schoolDetails.access_type;
      if (this.schoolDetails.access_type === null) {
    this.selectedAccess = 'FullAccess';
  } else {
    this.selectedAccess = this.schoolDetails.access_type;
  }
      // this.GG4L_client_id = this.schoolDetails.GG4L_client_id;
      // this.GG4L_client_secret = this.schoolDetails.GG4L_client_secret;
      this.school_lms_id = this.schoolDetails.school_lms_id;
      this.district_access_token = this.schoolDetails.district_access_token;
      // this.GG4L_sis_id = this.schoolDetails.GG4L_sis_id;
    },
    async UpdateSchools() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.updateSchools({
          id: this.$route.query.id,
          email: this.Email,
          state: this.statelist,
          phone: this.phone,
          description: this.Description,
          name: this.Schoolname,
          contact_person: this.ContactPerson,
          time_zone: this.timezonelist,
          access_type:this.selectedAccess,
          // GG4L_client_id: this.GG4L_client_id,
          // GG4L_client_secret: this.GG4L_client_secret,
          school_lms_id: this.school_lms_id,
          district_access_token: this.district_access_token,
          // GG4L_sis_id: this.GG4L_sis_id,
        });
        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.$router.push("/school-list-table");
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
  },
};
</script>
<style>
  .outlined-span {
    font-size: 0.8rem;
    position: absolute;
    left: -8px;
    top: calc(16px + 12px);
    background: white;
    z-index: 9;
    width: 300px;
    white-space: normal;
    border: 1px solid #ced4da;
    padding: 4px;
    border-radius: 7px
  }
  .outlined-span::before{
  top: -7px;
    left: 8px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid #ced4da;
    position: absolute;
    display: inline-block;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    content: '';
  }
</style>