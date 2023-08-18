<template>
  <div class="content col-lg-12">
    <div class="row">
      <div class="col-12">
        <div class="bg-primary-light">
          <div class="tab-content p-3" id="myTabContent">
            <!-- student tab -->
            <div
              class="tab-pane fade show active in"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div id="app" class="custom-container pt-3 px-0">
                <!-- search tab -->
                <div
                  class="row shadow-sm p-3 bg-white rounded justify-content-between w-100 m-0"
                >
                  <div class="col-md-4 col-lg-3">
                    <h4 class="text-dark text-left mb-0">Sign In Logs</h4>
                  </div>
                </div>

                <!-- end search tab -->
              </div>
              <!-- table -->
              <div class="col-lg-4 p-0 my-3">
                <div class="input-group rounded d-flex">
                  <input
                    type="text"
                    name="daterange"
                    autocomplete="off"
                    placeholder="Date Range"
                    class="form-control tab-form-control custom-form-control cursor-pointer"
                    readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <!-- table -->
            <div class="bg-white mt-2 p-2 rounded">
              <table class="user-table table">
                <tr class="text-secondary bg-primary-light">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
                <tr v-if="logs.length == 0">
                  <td colspan="5" class="text-center text-danger pt-3">
                    No data found
                  </td>
                </tr>
                <tr v-for="(log, index) in logsList" :key="index">
                  <td class="text-nowrap">{{ log.logDate }}</td>
                  <td class="text-nowrap">{{ log.logTime }}</td>
                  <td class="text-nowrap">{{ log.status }}</td>
                  <td class="text-nowrap">{{ log.error_detail }}</td>
                </tr>
              </table>
              <div class="custom-paginate d-flex justify-content-center p-3">
                <paginate
                  :page-count="pageTotal"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="clickCallback"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                >
                </paginate>
                <div class="pr-5">
                  {{ (pageNumValue - 1) * selectValue + 1 }}-{{
                    pageNumValue * selectValue > logCount
                      ? logCount
                      : pageNumValue * selectValue
                  }}
                  of {{ logCount }}
                </div>
                <div class="pr-2">Logs per page</div>
                <div>
                  <select
                    name="rows per page"
                    class="border rounded"
                    @change="selectvaluechange($event)"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>

              <!-- modal pop up -->
              <div
                class="modal fade"
                id="mediumModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="mediumModalLabel"
                aria-hidden="true"
                data-backdrop="static"
                data-keyboard="false"
              >
                <div class="modal-dialog modal-md" role="document">
                  <div class="modal-content h-auto">
                    <div class="modal-header bg-primary-light text-dark">
                      <h5 class="modal-title" id="mediumModalLabel">
                        Change status
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="cancel()"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p class="text-left">
                        Are you sure you want to change the status for this
                        school?
                      </p>
                    </div>
                    <div class="modal-footer justify-content-end border-top-0 bg-white text-dark">
                      <button
                        type="button"
                        data-dismiss="modal"
                        class="btn btn-primary color-white"
                        @click="update()"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        data-dismiss="modal"
                        class="btn btn-light border border-secondary color-dark"
                        @click="cancel()"
                        aria-label="Close"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end table -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import paginate from "~/components/paginate.vue";
var deleteID = "";
var selectValue = 10;
var pageNumValue = 1;
var fromDate = "";
var endDate = "";
export default {
  name: "SchoolListTable",
  data() {
    return {
      search: "",
      offset: 0,
      limit: selectValue,
      pageTotal: 0,
      paginateCount: 0,
      paginateRange: 0,
      pageNum: "",
      pageNumValue: 1,
      selectValue: 10,
      logsList: [],
      updateId: 0,
      updateStat: "",
      selectAll: false,
      custom: false,
      templateId: "",
      chooseAll: false,
      chooseAllStudent: false,
      searchStudent: "",
      schoolId: "",
      studentsList: [],
    };
  },
  mounted() {
    this.getSignInLogs();
    this.pageCount = 10;
    const _this = this;
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate() + 30);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;

    $(function () {
      fromDate = "";
      endDate = "";
      $('input[name="daterange"]').daterangepicker({
        autoUpdateInput: false,
        // minDate: today,
        maxDate: today,
        opens: "right",
        locale: {
          format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(
            picker.startDate.format("MM/DD/YYYY") +
              " - " +
              picker.endDate.format("MM/DD/YYYY")
          );
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
          _this.getSignInLogs.bind(_this)();
          _this.isShowing = false;
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
          fromDate = "";
          endDate = "";
          _this.getSignInLogs.bind(_this)();
        }
      );
    });
  },
  computed: {
    ...mapState("signInLogs", {
      logs: (state) => state.logs,
      logCount: (state) => state.logCount,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("signInLogs", {
      getLogs: "getLogs",
    }),

    async getSignInLogs(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }
      await this.getLogs({
        limit: this.selectValue,
        offset: pageNum,
        fromDate: fromDate,
        toDate: endDate,
      });
      this.logsList = [];
      this.logs.forEach((element) => {
        var logArray = {};
        var logged_in_date = element.logged_in_date;
        var status = element.status;
        var error_detail = element.error_detail;
        var updatedDate = element.updatedAt;

        logArray["logDate"] = moment(logged_in_date).format("MMMM Do, YYYY");
        logArray["logTime"] = moment(updatedDate).format("hh:mm A");
        logArray["status"] =
          status == "Success" ? "Success" : "Failed/No Response";
        logArray["error_detail"] = error_detail ? error_detail : "-";

        this.logsList.push(logArray);
      });

      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.logCount / this.selectValue);
      this.totalPage();
    },
    clickCallback(pageNum) {
      this.getSignInLogs(pageNum);
      this.pageNumValue = pageNum;
    },
    totalPage() {
      this.pageTotal = Math.ceil(this.logCount / this.selectValue);
    },
    selectvaluechange(event) {
      this.selectValue = event.target.value;

      this.getSignInLogs();
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
