<template>
  <ContentContainer title="Requirements List">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Filters</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="form-group col-md-3">
              <label for="reqId">Id</label>
              <input
                type="text"
                placeholder="REQ00001"
                class="form-control"
                name="reqId"
                v-model="reqId"
                @change="setFilters"
              />
            </div>

            <div class="form-group col-md-3">
              <label for="brand">Brand</label>
              <select
                name="brand"
                id="brand"
                v-model="brand"
                class="form-control"
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
              <label for="type">Request Type</label>
              <select
                class="form-control"
                name="type"
                id="type"
                @change="setFilters"
                v-model="type"
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
                v-model="user"
              >
                <option value="">Select request user</option>
                <option v-for="user in usersLists" :value="user">
                  {{ user }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body" style="max-height: 750px; overflow-y: auto">
          <table class="table table-hover table-sm table-stripped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Brand</th>
                <th>User</th>
                <th>Type</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <h1
                class="text-center animate__animated animate__lightSpeedInLeft animate__slow"
                v-if="isLoading"
              >
                Loading data...
              </h1>
              <template v-else>
                <tr v-for="request in requests">
                  <td>
                    <strong>{{ request.requestId }}</strong>
                  </td>
                  <td>
                    <span :class="getBrandColor(request)">
                      {{ request.requestBrand }}
                    </span>
                  </td>
                  <td>
                    <strong>
                      {{ request.requestUser }}
                    </strong>
                  </td>
                  <td>
                    <span :class="getTypeColor(request)">
                      {{ request.requestType }}
                    </span>
                  </td>
                  <td>{{ request.requestTitle }}</td>
                  <td>{{ request.requestDescription }}</td>
                  <td>
                    <span :class="getStatusColor(request)">
                      {{ request.requestStatus }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>
<script>
import ContentContainer from "../../components/ContentContainer.vue";
import ContentContainer from "../../components/ContentContainer.vue";
import { collect } from "collect.js";
import { runGoogleScript } from '../../utils/google.run';
import { typeColor, statusColor, reqBrandColor } from "../../utils/color.utils";

export default {
  name: "RequirementsTable",
  components: { ContentContainer },
  data() {
    return {
      requests: [],
      initialRequests: [],
      isLoading: true,
      brand: "",
      type: "",
      reqId: "",
      user: "",
      filteredData: [],
      usersLists: [],
    };
  },
  async mounted() {
    let data = await runGoogleScript('getRequestsData')
    let collection = collect(JSON.parse(data));
    this.usersLists = collection.map((val) => val.requestUser);

    this.usersLists = [...new Set(this.usersLists)];

    this.requests = collection.sortByDesc("requestId").all();
    this.initialRequests = JSON.parse(data);
    this.isLoading = false;
  },
  methods: {
    getBrandColor(request) {
      return brandColor(request);
    },
    getTypeColor(request) {
      return typeColor(request);
    },
    getStatusColor(request) {
      return statusColor(request);
    },
    getBrandColor(request) {
      return reqBrandColor(request);
    },
    setFilters({ target: { name, value } }) {
      this.requests = this.initialRequests;

      if (this.brand) {
        this.requests = this.requests.filter((request) => {
          return request.requestBrand == this.brand;
        });
      } else {
        this.requests = this.initialRequests;
      }

      if (name == "reqId") {
        if (value) {
          this.requests = this.requests.filter((request) => {
            return request.requestId == value;
          });
        } else {
          this.requests = this.initialRequests;
        }
      }

      if (name == "type") {
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
    },
  },
};
</script>
