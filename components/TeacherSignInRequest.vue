<template>
   
  <div class="content col-lg-12">
     <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
    />
    <div class="row">
      <div class="col-12">
        <div class="bg-light">
          
          <div class="tab-content p-1" id="myTabContent">
            <!-- student tab -->
            <div
              class="tab-pane fade container-fluid show active in"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div id="app" class="custom-container pt-3 px-0">
                <!-- search tab -->
                <div
                  class="row shadow-sm p-3 bg-white rounded justify-content-between w-100 m-0"
                >
                  <div class="col-md-4 col-lg-4">
                    <h4 class="text-dark text-left">Teacher Sign-In Request</h4>
                  </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="input-group rounded">
                      <input
                        type="search"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        v-model="search"
                        v-on:keyup="GetTeacherList()"
                      />
                      <button type="button" >
                        <span
                          class="input-group-text border-0 h-100"
                          id="search-addon2"
                        >
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                </div>

                <!-- end search tab -->
              </div>
              <!-- table -->
              <div class="bg-white mt-2 p-1 rounded">
                <table class="user-table table">
                  <tr class="text-secondary bg-light">
                    <th> Name</th>
                    <th>Email Id</th>
                    <th>School</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                  <tr v-if="teachers.length == 0">
                    <td colspan="5" class="text-center text-danger pt-3">
                      No data found
                    </td>
                  </tr>
                  <tr  v-for="(teacher, index) in teacherList"
              :key="index">
                    <td>{{ teacher.teacherName }}</td>
                    <td>{{ teacher.emailId }}</td>
                    <td>{{teacher.schoolName}} </td>
                    <td>{{teacher.date}} </td> 
                    <td>
                      <button
              class="btn btn-primary"
              type="button"
              data-toggle="modal"
              data-target="#mediumModal"
              @click="setTeacherStatus(teacher.teacherId, 1)"
            >
              Approve 
            </button>
                      <button
              class="btn btn-light border border-secondary"
              type="button"
              data-toggle="modal"
              data-target="#mediumModal"
              @click="setTeacherStatus(teacher.teacherId, 2)"
            >
              Reject
            </button>
                    </td>
                  </tr>
                </table>
                <div class="custom-paginate d-flex justify-content-center p-3">
                  <paginate
                    :page-count="pageTotal"
                    :page-range="this.paginateRange"
                    :margin-pages="this.paginateRange"
                    :click-handler="clickCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                  >
                  </paginate>
                  <div class="pr-5">
                    {{ (pageNumValue - 1) * selectValue + 1 }}-{{
                      pageNumValue * selectValue > teacherCount
                        ? teacherCount
                        : pageNumValue * selectValue
                    }}
                    of {{ teacherCount }}
                  </div>

                  <div class="pr-2">clubs per page</div>
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
        >
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content h-auto">
              <div class="modal-header bg-light text-dark">
                <h5 class="modal-title" id="mediumModalLabel">Confirmation</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="text-left">Are you sure you want to continue?</p>
              </div>
              <div class="modal-footer bg-white">
                <button
                  type="button"
                  data-dismiss="modal"
                  @click="AdminSelect(1)"
                  class="btn btn-primary px-3 py-1 rounded-pill"
                >
                  Yes
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-secondary px-3 py-1 rounded-pill" 
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
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from "~/assets/animation.json";

import paginate from "~/components/paginate.vue";
var deleteID = "";
var selectValue = 10;
var pageNumValue = 1;
var teacherID = "";
var teacherStatus = 0;
export default {
  name: "TeacherSignInRequest",
  components: {
    lottie
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      search: "",
      offset: 0,
      limit: selectValue,
      pageTotal: 0,
      paginateCount: 0,
      paginateRange: 0,
      pageNum: 0,
      pageNumValue: 1,
      selectValue: 10,
      teacherList:[],
    };
  },
  mounted() {
    this.GetTeacherList();
    this.pageCount = 10;
  },
  computed: {
    ...mapState("teacherSignInRequest", {
      teachers: (state) => state.teachers,
      teacherCount: (state) => state.teacherCount,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("teacherSignInRequest", {
       getTeacherList: "getTeacherList",
      adminSelect: "adminSelect",
    }),
     handleAnimation: function (anim) {
      this.anim = anim;
    },
    
    setTeacherStatus(teacheriD, actionStatus) {
      teacherStatus = actionStatus;
      teacherID = teacheriD;
    },
    async GetTeacherList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }
      this.loading = true;
      await this.getTeacherList({
        search: this.search,
        offset: pageNum,
        limit: this.selectValue,
        teacher_status:0,

      });
      this.loading = false;
//teachers 
this.teacherList=[];
this.teachers.forEach(element => {
  var teacherArray={};
  var teacherName=element.first_name;
  if(element.schools){
  var schoolName=element.schools.name;
  }
  var emailId=element.email;
  var teacherId=element.id;
  var date=this.formatDate(element.createdAt);
  teacherArray["teacherName"]=teacherName;
  teacherArray["schoolName"]=schoolName;
  teacherArray["emailId"]=emailId;
  teacherArray["date"]=date;
  teacherArray["teacherId"]=teacherId;
  this.teacherList.push(teacherArray);
  
});


      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.teacherCount / this.selectValue);
      this.totalPage();
    },
    clickCallback(pageNum) {
      this.GetTeacherList(pageNum);
      this.pageNumValue = pageNum;
    },
    totalPage() {
      this.pageTotal = Math.ceil(this.teacherCount / this.selectValue);
    },
    selectvaluechange(event) {
      this.selectValue = event.target.value;
      this.GetTeacherList();
    },

    setDeleteId(deleteiD) {
      deleteID = deleteiD;
    },
     async AdminSelect(type) {
      this.loading = true;
      await this.adminSelect({
        teacher_id: teacherID,
        activation_teacher_status: teacherStatus,
      });
      this.loading = false;

         if (this.paginateCount != 0) {
        this.paginateCount = ((this.paginateCount) / 10)+1;
      }
      if(type == 1){
         this.GetTeacherList(this.paginateCount);
      }
      // }
      
    },
    formatDate(input){
var date = new Date(input);
var year = date.getFullYear();
var month = date.getMonth()+1;
var dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

return month+'-'+dt+'-'+year;
   
  },
  }
};
</script>
