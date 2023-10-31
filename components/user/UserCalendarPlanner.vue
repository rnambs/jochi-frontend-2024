<template>
    <div>
        <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">

            <section id="calendarPlanner" class="">
                <div class="m--12 custom-full-height d-flex planner-day-responsive">
                    <div class="d-flex flex-column flex-fill w-100 position-relative">
                        <div class="row position-sticky z-index-1 bg-global top-0">
                            <div class="col-12 pb-1">
                                <div class="d-flex align-items-center">
                                    <h2 class="heading2 font-semi-bold color-primary-dark mb-2">Calendar</h2>
                                    <div class="d-flex d-lg-none align-items-center mb-2 ml-2">
                                        <p class="mb-0 font-bold text-18 color-secondary-dark mx-1">September</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="d-flex flex-wrap px-1 flex-fill">
                                        <div data-intro="Filter calendar" class="dropdown form-row d-inline-flex w-auto mr-2 mb-2">
                                            <div class="dropdown-select form-control form-sm form-transparent"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="i-filter-funnel j-icon i-sm bg-gray mr-1"></i>
                                                <span id="dLabel" class="mr-3">Filter</span>
                                                <span class="caret"><i
                                                        class="fas fa-chevron-down font-medium"></i></span>
                                            </div>
                                            <ul class="dropdown-menu w-100 rounded-12 p-2" aria-labelledby="dLabel">
                                                <li class="item p-2">Daily</li>
                                                <li class="item p-2">Weekly</li>
                                                <li class="item p-2">Monthly</li>
                                            </ul>
                                        </div>
                                        <div class="border border--form rounded-8 d-flex align-items-center mb-2">
                                            <button class="btn btn-void border-0 p-2 mx-1">
                                                <span class="d-flex">
                                                    <i class="i-arrow-left j-icon i-xs bg-text-secondary"></i>
                                                </span>  
                                            </button>
                                            <p class="mb-0 font-medium color-secondary-dark mx-1">Week 02</p>
                                            <button class="btn btn-void border-0 p-2 mx-1">
                                                <span class="d-flex">
                                                    <i class="i-arrow-right j-icon i-xs bg-text-secondary"></i>
                                                </span>  
                                            </button>
                                        </div>
                                        <div class="d-none d-lg-flex align-items-center mb-2 justify-content-center flex-fill">
                                            <p class="mb-0 font-bold text-18 color-primary-dark mx-1">September</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap">
                                        <button class="btn btn-primary mr-2 mb-2">
                                            <span class="d-flex mr-1">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.22974 6.62916V1.60059H7.90593V6.62916H12.9345V8.30535H7.90593V13.3339H6.22974V8.30535H1.20117V6.62916H6.22974Z" fill="white"/>
                                                </svg>
                                            </span>                                            
                                            <span>Add task</span>
                                        </button>
                                        <button class="btn btn-void mb-2">                                          
                                            <span>Show Weekend</span>
                                            <span class="d-flex ms-1">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.13281 14.8L11.5328 8.4L5.13281 2" stroke="#EAEAEA" stroke-width="2.13333" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>                                                    
                                            </span>  
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                    <div class="calendar-head d-flex align-items-center my-3 p-2 pl-3 mx--12">
                                        <p class="mb-0 color-dark font-bold text-14">Monday 03</p>
                                    </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Daily Journal Choir</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>11:00 AM </span> > <span> 12 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Civil War Essay</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Daily Journal Choir</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. Roy</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Daily Journal Choir</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                    <div class="calendar-head calendar-head--active d-flex align-items-center my-3 p-2 pl-3 mx--12">
                                        <p class="mb-0 font-bold text-14">Tuesday 04</p>
                                    </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Humanities</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 6,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Humanities</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. tony</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Research Lab Art</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">AP History</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. Roy</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                    <div class="calendar-head d-flex align-items-center my-3 p-2 pl-3 mx--12">
                                        <p class="mb-0 color-dark font-bold text-14">Wednesday 05</p>
                                    </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Civil War Essay</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Research Lab Art</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Research Lab Art</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. Tom</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Daily Journal Choir</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Daily Journal Choir</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                    <div class="calendar-head d-flex align-items-center my-3 p-2 pl-3 mx--12">
                                        <p class="mb-0 color-dark font-bold text-14">Thursday 06</p>
                                    </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Research Lab Art</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Exit Ticket</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-call-ring j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">AP History Roundtable</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex align-items-center mt-2">
                                                <i class="i-location j-icon i-xs bg-text-secondary"></i>
                                                <p class="color-secondary text-10 mb-0">Seoul</p>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Civil War Essay</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Exit Ticket</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. Tony</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                    <div class="calendar-head d-flex align-items-center my-3 p-2 pl-3 mx--12">
                                        <p class="mb-0 color-dark font-bold text-14">Friday 07</p>
                                    </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Exit Ticket</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 9,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">Civil War Essay</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> Jan 3,2023</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Civil War Essay</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                        <div class="card card-transparent border-0 rounded-4 mb-3 py-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with Mr. Roy</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                        </div>
                                        <div class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div class="card card-secondary rounded-4 mb-3 p-2">
                                            <div class="d-flex mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-global"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Humanities</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>9:00 AM </span> > <span> 10 :00 AM</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> Jan 3,2023</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- End Daily Calander -->
        </div>
    </div>
</template>
<script>
    import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { mapState, mapActions } from "vuex";
import { eventBus } from "~/plugins/eventbus.js"
export default {
  name: "UserStudentCalendar",
  components: {
    lottie,
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/css/custom.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
  },
  data() {
    return {
        accordionOpened:false
    }
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
}
</script>