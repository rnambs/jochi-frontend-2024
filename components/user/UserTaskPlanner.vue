<template>
    <div>
        <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
            <!-- Daily Calander -->

            <section id="taskPlanner" class="">
                <div class="m--12 custom-full-height d-flex planner-day-responsive">
                    <div class="d-flex flex-column flex-fill w-100">
                        <div class="row">
                            <div class="col-12">
                                <h2 class="heading2 font-semi-bold color-primary-dark mb-1">Tasks</h2>
                                <p class="color-tertiary font-medium mb-1">Task For this week</p>
                                <div class="row m-0 mb-3">
                                    <div class="col-md-5 col-lg-3 pb-0 pr-3">
                                        <div data-intro="Filter tasks" class="dropdown form-row d-inline-flex w-auto">
                                            <div class="dropdown-select form-control form-sm form-transparent"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="icon icon--filter-calendar icon-sm mr-1"></i>
                                                <span id="dLabel" class="mr-3">This week</span>
                                                <span class="caret"><i
                                                        class="fas fa-chevron-down font-medium"></i></span>
                                            </div>
                                            <ul class="dropdown-menu w-100 rounded-12 p-2" aria-labelledby="dLabel">
                                                <li class="item p-2">This week</li>
                                                <li class="item p-2">This week</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div class="col-12 col-sm-6 col-lg-3">
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-violet p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Doing</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-violet w-100 d-flex mb-3"></span>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--violet my-1 mr-1">Doing</span>
                                                <span class="task-label task-label--violet my-1 mr-1">Art</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">AP History</h6>
                                        <p class="text-10 color-gray mb-2">Brainstorming brings team members' diverse
                                            experience into play.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--violet my-1 mr-1">Doing</span>
                                                <span class="task-label task-label--violet my-1 mr-1">Geography</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">Civil War Essay Health</h6>
                                        <p class="text-10 color-gray mb-2">User research helps you to create an optimal
                                            product for users.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-yellow p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Todo</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-yellow w-100 d-flex mb-3"></span>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--yellow my-1 mr-1">Done</span>
                                                <span class="task-label task-label--yellow my-1 mr-1">Art</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">AP History</h6>
                                        <p class="text-10 color-gray mb-2">Brainstorming brings team members' diverse
                                            experience into play.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--yellow my-1 mr-1">Done</span>
                                                <span class="task-label task-label--yellow my-1 mr-1">Geography</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">Research Lab Art</h6>
                                        <p class="text-10 color-gray mb-2">Research Lab Art refers to artistic creations
                                            inspired by or created within a research laboratory setting</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-green p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Done</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-green w-100 d-flex mb-3"></span>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--green my-1 mr-1">Doing</span>
                                                <span class="task-label task-label--green my-1 mr-1">History</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">Daily Journal Choir </h6>
                                        <p class="text-10 color-gray mb-2">Brainstorming brings team members' diverse
                                            experience into play.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--green my-1 mr-1">Doing</span>
                                                <span class="task-label task-label--green my-1 mr-1">History</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">Civil War Essay Health</h6>
                                        <p class="text-10 color-gray mb-2">User research helps you to create an optimal
                                            product for users.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-red p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Overdue</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-red w-100 d-flex mb-3"></span>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--red my-1 mr-1">Overdue</span>
                                                <span class="task-label task-label--red my-1 mr-1">History</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">AP History</h6>
                                        <p class="text-10 color-gray mb-2">AP History refers to Advanced Placement
                                            History,
                                            which is an advanced level course designed for
                                            high school students seeking to deepen their
                                            understanding of historical events, concepts,
                                            and themes.</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label task-label--red my-1 mr-1">Overdue</span>
                                                <span class="task-label task-label--red my-1 mr-1">History</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary mr-1"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">Civil War Essay Health</h6>
                                        <p class="text-10 color-gray mb-2">It just needs to adapt the UI from what you
                                            did before </p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
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
  name: "UserStudentTask",
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