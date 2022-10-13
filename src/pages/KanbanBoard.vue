<template>
  <ContentContainer :title="'Kanban Board'">
    <div class="row mb-2">
      <div class="col-md-3 form-group">
        <label for="site">Site</label>
        <select
          class="form-control"
          v-model="brandFilter"
          name="site"
          id="site"
          @change="setFilters"
        >
          <option value="">Select site to view</option>
          <option value="Whirlpool MX">Whirlpool MX</option>
          <option value="Maytag MX">Maytag MX</option>
          <option value="Acros MX">Acros MX</option>
          <option value="KitchenAid MX">Kitchenaid MX</option>
          <option value="Whirlpool CO">Whirlpool CO</option>
          <option value="KitchenAid CO">Kitchenaid CO</option>
          <option value="Whirlpool GT">Whirlpool GT</option>
          <option value="KitchenAid GT">Kitchenaid GT</option>
          <option value="Whirlpool EC">Whirlpool EC</option>
          <option value="Whirlpool PR">Whirlpool PR</option>
          <option value="KitchenAid PR">Kitchenaid PR</option>
          <option value="KitchenAid PE">Kitchenaid PE</option>
        </select>
      </div>

      <div class="col-md-3 form-group">
        <label for="requestType">Request Type</label>
        <select
          class="form-control"
          name="requestType"
          id="requestType"
          @change="setFilters"
          v-model="requestTypeFilter"
        >
          <option value="">Select request type</option>
          <option value="Website improvement">Website improvement</option>
          <option value="I want to measure something">
            I want to measure something
          </option>
          <option value="Project">Project</option>
        </select>
      </div>

      <div class="col-md-3 form-group">
        <label for="requestUser">Request User</label>
        <select
          class="form-control"
          name="requestUser"
          id="requestUser"
          @change="setFilters"
          v-model="requestUserFilter"
        >
          <option value="">Select request user</option>
          <option v-for="user in usersLists" :value="user">{{ user }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="card card-secondary">
          <div class="card-header text-center">
            <h3 class="card-title">
              <a
                data-toggle="collapse"
                href="#collapseRequested"
                role="button"
                aria-expanded="true"
                aria-controls="#collapseRequested"
                class="text-reset"
              >
                Requested
                <strong>({{ requestedStatusRequests.length }} tasks)</strong>
              </a>
            </h3>
          </div>

          <div class="collapse show" id="collapseRequested">
            <div class="card-body" style="max-height: 750px; overflow-y: auto">
              <template v-if="isLoading">
                <h3 class="animate__animated animate__lightSpeedInLeft animate__slow text-center">Loading</h3>
              </template>
              <template
                v-if="!isLoading"
                v-for="request in requestedStatusRequests"
              >
                <KanbanCard
                  :req="request"
                  class="card-secondary animate__animated animate__fadeIn"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card card-primary">
          <div class="card-header text-center">
            <h3 class="card-title">
              <a
                data-toggle="collapse"
                href="#collapseProcessing"
                role="button"
                aria-expanded="true"
                aria-controls="#collapseProcessing"
                class="text-reset"
              >
                Processing
                <strong>({{ processingStatusRequests.length }} tasks)</strong>
              </a>
            </h3>
          </div>

          <div class="collapse show" id="collapseProcessing">
            <div class="card-body" style="max-height: 750px; overflow-y: auto">
              <template v-if="isLoading">
                <h3 class="animate__animated animate__lightSpeedInLeft animate__slow text-center">Loading</h3>
              </template>
              <template
                v-if="!isLoading"
                v-for="request in processingStatusRequests"
              >
                <KanbanCard
                  :req="request"
                  class="card-primary animate__animated animate__fadeIn"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card card-default">
          <div class="card-header text-center bg-info">
            <h3 class="card-title">
              <a
                data-toggle="collapse"
                href="#collapseInProgress"
                role="button"
                aria-expanded="true"
                aria-controls="#collapseInProgress"
                class="text-reset"
              >
                In Progress
                <strong>({{ inProgressStatusRequests.length }} tasks)</strong>
              </a>
            </h3>
          </div>

          <div class="collapse show" id="collapseInProgress">
            <div class="card-body" style="max-height: 750px; overflow-y: auto">
              <template v-if="isLoading">
                <h3 class="animate__animated animate__lightSpeedInLeft animate__slow text-center">Loading</h3>
              </template>
              <template
                v-if="!isLoading"
                v-for="request in inProgressStatusRequests"
              >
                <KanbanCard
                  :req="request"
                  class="card-info animate__animated animate__fadeIn"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3" style="max-height: 750px; overflow-y: auto">
        <div class="card card-success">
          <div class="card-header text-center">
            <h3 class="card-title">
              <a
                data-toggle="collapse"
                href="#collapseDone"
                role="button"
                aria-expanded="true"
                aria-controls="#collapseDone"
                class="text-reset"
              >
                Done <strong>({{ doneStatusRequests.length }} tasks)</strong>
              </a>
            </h3>
          </div>

          <div class="collapse show" id="collapseDone">
            <div class="card-body">
              <template v-if="isLoading">
                <h3 class="animate__animated animate__lightSpeedInLeft animate__slow text-center">Loading</h3>
              </template>
              <template v-if="!isLoading" v-for="request in doneStatusRequests">
                <KanbanCard
                  :req="request"
                  class="card-success animate__animated animate__fadeIn"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>
<script>
import KanbanCard from "../components/KanbanCard.vue";
import Navbar from "../components/Navbar.vue";
import Loading from "vue-loading-overlay";
import ContentContainer from "../components/ContentContainer.vue";

export default {
  components: {
    KanbanCard,
    Navbar,
    Loading,
    ContentContainer,
  },
  data() {
    return {
      requests: [],
      requestedStatusRequests: [],
      processingStatusRequests: [],
      inProgressStatusRequests: [],
      doneStatusRequests: [],
      initialRequests: [],
      isLoading: true,
      usersLists: [],
      filters: [],
      brandFilter: "",
      requestTypeFilter: "",
      requestUserFilter: "",
    };
  },
  mounted() {
    this.getRequestsData();
  },
  methods: {
    onLoadingCancel(){
      this.isLoading = false
    },
    getRequestsData() {
      google.script.run
        .withSuccessHandler(this.onSuccessRequest)
        .getRequestsData();
    },
    onSuccessRequest(data) {
      this.requests = JSON.parse(data);
      this.initialRequests = JSON.parse(data);

      this.usersLists = this.initialRequests.map((val) => val.requestUser);

      this.usersLists = [...new Set(this.usersLists)];

      this.setRequestLists();

      this.isLoading = false;
    },
    setRequestLists() {
      this.requestedStatusRequests = this.requests.filter((value) => {
        return (
          value.requestStatus == "Requested" ||
          value.requestStatus == "requested"
        );
      });

      this.processingStatusRequests = this.requests.filter((value) => {
        return value.requestStatus == "processing";
      });

      this.inProgressStatusRequests = this.requests.filter((value) => {
        return value.requestStatus == "InProgress";
      });

      this.doneStatusRequests = this.requests.filter((value) => {
        return value.requestStatus == "Done";
      });
    },
    setFilters({ target: { name, value } }) {
      this.requests = this.initialRequests;

      if (this.brandFilter) {
        this.requests = this.requests.filter((request) => {
          return request.requestBrand == this.brandFilter;
        });
      } else {
        this.requests = this.initialRequests;
      }

      if (name == "requestType") {
        if (value) {
          this.requests = this.requests.filter((request) => {
            return request.requestType == value;
          });
        } else {
          this.requests = this.initialRequests;
        }
      }

      if (name == "requestUser") {
        if (value) {
          this.requests = this.requests.filter((request) => {
            return request.requestUser == value;
          });
        } else {
          this.requests = this.initialRequests;
        }
      }

      this.isLoading = true;
      this.setRequestLists();
      this.isLoading = false;
    },
  },
};
</script>
