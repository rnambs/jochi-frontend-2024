<template>
  <div id="right-panel">
    <div class="content col-lg-12">
      <div class="row">
        <div class="col-12">
          <div class="bg-primary-light w-100">
            <div class="container pt-3">
              <div class="bg-white shadow-sm p-4">
                <h4>Daily Quotes</h4>
              </div>
            </div>

            <div class="animated fadeIn pt-2">
              <div class="row justify-content-center py-5">
                <div class="col-lg-8">
                  <div class="card">
                    <div class="card-header">
                      <strong>Quotes</strong><small></small>
                    </div>
                    <div class="card-body card-block">
                      <form @submit.prevent="GetQuotedMessage">
                        <div class="form-group">
                          <blockquote>
                            <textarea
                              class="form-control rounded-0"
                              id="exampleFormControlTextarea2"
                              rows="3"
                              style="min-height: 200px"
                              v-model="Description"
                              :class="{
                                'is-invalid':
                                  submitted && $v.Description.$error,
                              }"
                            >
where there is a will there is a way
                      </textarea
                            >
                          </blockquote>
                          <div
                            v-if="submitted && $v.Description.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.Description.required"
                              >This field is required</span
                            >
                          </div>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary btn-flat m-b-30 m-t-30"
                          :disabled="processing"
                        >
                          UPDATE
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
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

export default {
  name: "QuotedMessage",
  data() {
    return {
      Description: "",
      submitted: false,
      processing: false,
    };
  },
  validations: {
    Description: { required },
  },
  mounted() {
    this.ShowQuotedMessage();
  },
  computed: {
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("quotedMessage", {
      getQuotedMessage: "getQuotedMessage",
      showQuotedMessage: "showQuotedMessage",
    }),
    async GetQuotedMessage() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.getQuotedMessage({
          id: 1,
          quote: this.Description,
        });
        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
        }
        this.processing = false;
      }
    },

    async ShowQuotedMessage() {
      await this.showQuotedMessage({});
      this.Description = this.quoteMessage;
    },
  },
};
</script>