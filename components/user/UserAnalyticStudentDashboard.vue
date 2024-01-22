<template>
  <div class="main-section">
    <section class="py-4 analytic-dashboard">
      <div class="container-fluid">
        <div class="d-flex justify-content-between  align-items-center mb-3">
          <h2 class="text-20 font-poppins font-semi-bold mb-0 flex-grow-1">
            Rahul’s Dashboard</h2>
          <div class="form-group flex-grow-1 mb-0">
            <input type="text" class="form-control" id="search" placeholder="Search Student">
          </div>
        </div>
        <div class="row ">
          <div class="col-12 d-flex flex-wrap justify-content-between  align-items-center">
            <form class="d-flex ">
              <div class="form-group mb-0">
                <select class="form-control" id="exampleFormControlSelect1">
                  <option selected>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
                <!-- <button type="submit" class="btn btn-primary text-14 px-2 w-auto mx-2">
                  18 Jan 2024
                  <i class="fa fa-calendar mx-2 " aria-hidden="true"></i>
                </button> -->
            </form>
            <div class="col-md-6 col-lg-3 px-2 pr-3">
                  <div
                    data-intro="Choose your date range."
                    class="form-row d-flex position-relative schedule-meeting-section"
                  >
                    <input
                      type="text"
                      name="daterange"
                      autocomplete="off"
                      placeholder="Date Range"
                      class="form-control tab-form-control custom-form-control pr-5"
                      readonly="readonly"
                    />
                    <span class="inputfield-icon date-icon position-absolute top-0 right-0"></span>
                  </div>
                </div>

            <button type="submit" class="btn btn-primary text-14 px-3 w-auto ">
              View Current Progress
            </button>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-4 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex justify-content-between align-items-center ">
                <div class="">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-text-100 mb-2">132 <span
                      class="text-14 color-text-50">/17</span></h2>
                  <p class="mb-0 text-14 color-text-50">Rahul’s Overdue Assignments</p>
                </div>
                <div class="w-fit-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="51" viewBox="0 0 101 51" fill="none">
                    <path
                      d="M2 49C14.4714 49 14.4714 36.3644 24.6333 36.3644C34.7952 36.3644 36.1809 49 44.4952 49C52.8095 49 53.7333 2 64.3571 2C74.981 2 73.5952 32.4522 84.219 32.4522C94.8429 32.4522 89.7619 20.081 99 20.081"
                      stroke="#EB702A" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex justify-content-between align-items-center ">
                <div class="">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-text-100 mb-2">132 <span
                      class="text-14 color-text-50">/17</span></h2>
                  <p class="mb-0 text-14 color-text-50">Rahul’s Finished Assignments</p>
                </div>
                <div class="w-fit-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="51" viewBox="0 0 101 51" fill="none">
                    <path
                      d="M2 49C14.4714 49 14.4714 36.3644 24.6333 36.3644C34.7952 36.3644 36.1809 49 44.4952 49C52.8095 49 53.7333 2 64.3571 2C74.981 2 73.5952 32.4522 84.219 32.4522C94.8429 32.4522 89.7619 20.081 99 20.081"
                      stroke="#18D837" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex justify-content-between align-items-center ">
                <div class="">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-text-100 mb-2">132 <span
                      class="text-14 color-text-50">/17</span></h2>
                  <p class="mb-0 text-14 color-text-50">Total Assignments</p>
                </div>
                <div class="w-fit-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="51" viewBox="0 0 101 51" fill="none">
                    <path
                      d="M2 49C14.4714 49 14.4714 36.3644 24.6333 36.3644C34.7952 36.3644 36.1809 49 44.4952 49C52.8095 49 53.7333 2 64.3571 2C74.981 2 73.5952 32.4522 84.219 32.4522C94.8429 32.4522 89.7619 20.081 99 20.081"
                      stroke="#18D837" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-6">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Overdue Assignments</h2>
              <div class="row">
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Assignment Name</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">Civil War Essay</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Subject</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">US History</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Due Date</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">12/12/23</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Remind Student</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">INSERT BELL ICON</h2>
                </div>
              </div>
            </div>

          </div>
          <div class="col-12 col-sm-6">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Completed Assignments</h2>
              <div class="row">
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Assignment Name</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">Civil War Essay</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Subject</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">US History</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Due Date</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">12/12/23</h2>
                </div>
                <div class="col-12 col-md-3">
                  <p class="mb-0 text-14 color-text-50">Remind Student</p>
                  <h2 class="mb-0 text-16 font-weight-medium color-text-100">INSERT BELL ICON</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Recent Grades</h2>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-end ">
            <button type="submit" class="btn btn-primary text-14 px-4 w-auto ">
              Create Report
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
var fromDate = "";
var endDate = "";

export default {
  components: {
  },
  data() {
    return {
      accordionOpened:false,
      value: "",
      slot_date: [],
      from: [],
      end: [],
      teacher_name: "",
      dateRange: [],
      popupValue: [],
      popupFrom: [],
      popupEnd: [],
      isShowing: true,
      isMounted: false,
      week: false,
      availability: false,
      loading: false,
      processing: false,
    };
  },
  mounted() {
    this.loading= false;
    this.startTime = new Date().getTime();
    this.isMounted = false;
    const _this = this;
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate());
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
        maxDate: future,
        opens: "left",
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
          _this.UpdateTimeSchedule.bind(_this)();
          _this.isShowing = false;
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
        }
      );
    });
  },

  methods: {
  },
};
</script>
