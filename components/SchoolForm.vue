<template>
  <div id="right-panel" class="right-panel">
    <div class="content">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <strong>Add School</strong><small></small>
              </div>
              <div class="card-body card-block">
                <form @submit.prevent="AddSchools">
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
                        type="text"
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
                  <div class="form-group required">
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
                  </div>

                  <div class="form-group">
                    <label for="contact-person" class="form-control-label"
                      >GG4L School ID </label
                    ><input
                      type="text"
                      id="GG4L_school_id"
                      class="form-control"
                      v-model="GG4L_school_id"
                      :class="{
                        'is-invalid': submitted && $v.GG4L_school_id.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.GG4L_school_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.GG4L_school_id.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <div class="form-group required">
                    <label for="contact-person" class="form-control-label"
                      >GG4L District ID</label
                    ><input
                      type="text"
                      id="GG4L_district_id"
                      class="form-control"
                      v-model="GG4L_district_id"
                      :class="{
                        'is-invalid': submitted && $v.GG4L_district_id.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.GG4L_district_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.ContactPerson.required"
                        >This field is required</span
                      >
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="contact-person" class="form-control-label"
                      >GG4L Sis ID </label
                    ><input
                      type="text"
                      id="GG4L_sis_id"
                      class="form-control"
                      v-model="GG4L_sis_id"
                      :class="{
                        'is-invalid': submitted && $v.GG4L_sis_id.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.GG4L_sis_id.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.GG4L_sis_id.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <!-- GG4L details end -->

                  <div class="form-group required">
                    <label for="state" class="form-control-label"
                      >Select your State</label
                    >
                    <select
                      class="standardSelect custom-select custom-select-sm mb-3"
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
                  <button
                    type="submit"
                    class="btn btn-primary btn-flat m-b-30 m-t-30"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    class="btn-flat m-b-30 m-t-30 color-dark"
                    :disabled="processing"
                  >
                    <nuxt-link
                      to="/school-list-table"
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
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "SchoolForm",
  data() {
    return {
      Email: "",
      ContactPerson: "",
      Schoolname: "",
      phone: "",
      statelist: "",
      Description: "",
      timezonelist: "",
      submitted: false,
      processing: false,
      GG4L_client_id: "",
      GG4L_client_secret: "",
      GG4L_school_id: "",
      GG4L_district_id: "",
      GG4L_sis_id: "",
    };
  },
  validations: {
    Email: { required, email },
    ContactPerson: { required },
    Schoolname: { required },
    phone: { required, minLength: minLength(10), maxLength: maxLength(14) },
    statelist: { required },
    timezonelist: { required },
    Description: { required },
    GG4L_client_id: { required },
    GG4L_client_secret: { required },
    // GG4L_school_id: { required },
    GG4L_district_id: { required },
    // GG4L_sis_id: { required },
  },
  mounted() {
    this.fetchStates();
    this.fetchTimeZone();
  },

  computed: {
    ...mapState("schoolForm", {
      states: (state) => state.states,
      timezone: (state) => state.timezone,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("schoolForm", {
      addSchools: "addSchools",
      fetchStates: "fetchStates",
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
    async AddSchools() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.addSchools({
          email: this.Email,
          state: this.statelist,
          phone: this.phone,
          description: this.Description,
          name: this.Schoolname,
          contact_person: this.ContactPerson,
          time_zone: this.timezonelist,
          GG4L_client_id: this.GG4L_client_id,
          GG4L_client_secret: this.GG4L_client_secret,
          GG4L_school_id: this.GG4L_school_id,
          GG4L_district_id: this.GG4L_district_id,
          GG4L_sis_id: this.GG4L_sis_id,
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