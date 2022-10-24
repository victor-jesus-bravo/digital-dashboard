<template>
  <ContentContainer :title="'ChartBoard'">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    Requests by type
                </h3>
            </div>
            <div class="card-body">
                <canvas id="requestByType"></canvas>
            </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    Requests by brand
                </h3>
            </div>
            <div class="card-body">
                <canvas id="requestByBrand"></canvas>
            </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    Requests by status
                </h3>
            </div>
            <div class="card-body">
                <canvas id="requestByStatus"></canvas>
            </div>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>
<script>
import ContentContainer from "../../components/ContentContainer.vue";
import Chart from "chart.js/auto";
import { collect } from "collect.js";
import { runGoogleScript } from '../../utils/google.run';

export default {
  components: {
    ContentContainer,
  },
  name: 'RequirementsChartBoard',
  data() {
    return {
      requests: [],
      labelDonut: [],
      dataDonut: [],
      data: null,
    };
  },
  methods: {
    async getRequestsData() {
      const data = await runGoogleScript('getRequestsData')

      this.onSuccessRequest(data)
    },
    onSuccessRequest(data) {
      this.requests = JSON.parse(data);

      let collection = collect(this.requests);

      let requestByTypeData = collection.groupBy("requestType").map((value) => {
        return value.items.length;
      });

      let requestByBrandData = collection.groupBy("requestBrand").map((value) => {
        return value.items.length;
      });

      let requestByStatusData = collection.groupBy("requestStatus").map((value) => {
        return value.items.length;
      });


      const requestByTypeChart = document.getElementById("requestByType").getContext("2d");
      const requestByBrandChart = document.getElementById("requestByBrand").getContext("2d");
      const requestByStatusChart = document.getElementById("requestByStatus").getContext("2d");

      let bgColor = [];

      for (let i=0; i < Object.keys(requestByBrandData.items).length; i++) {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)

        bgColor.push('rgba('+r+', '+g+', '+b+')')
      }

      const requestByStatus = new Chart(requestByStatusChart, {
        type: "pie",
        data: {
          labels: Object.keys(requestByStatusData.items),
          datasets: [
            {
              data: Object.values(requestByStatusData.items),
              backgroundColor: bgColor,
              hoverOffset: 4
            },
          ],
        },
      });

      requestByStatus;

      const requestByBrand = new Chart(requestByBrandChart, {
        type: "pie",
        data: {
          labels: Object.keys(requestByBrandData.items),
          datasets: [
            {
              data: Object.values(requestByBrandData.items),
              backgroundColor: bgColor,
              hoverOffset: 4
            },
          ],
        },
      });

      requestByBrand;

      const requestByType = new Chart(requestByTypeChart, {
        type: "pie",
        data: {
          labels: Object.keys(requestByTypeData.items),
          datasets: [
            {
              data: Object.values(requestByTypeData.items),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235, 0.2)',
                'rgb(255, 205, 86, 0.2)'
              ],
              hoverOffset: 4
            },
          ],
        },
      });

      requestByType;
    },
  },
  async mounted() {
    await this.getRequestsData();
  },
};
</script>
