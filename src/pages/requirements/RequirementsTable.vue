<template>
    <ContentContainer title="Requirements List">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body" style="max-height: 750px; overflow-y: auto">
                    <table class="table table-stripped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Brand</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Time elapsed</th>
                            </tr>
                        </thead>

                        <tbody>
                            <h1 class="text-center animate__animated animate__lightSpeedInLeft animate__slow" v-if="isLoading">Loading data...</h1>
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

                                    <td>{{ request.activeDays}}</td>
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
import ContentContainer from '../../components/ContentContainer.vue';
import ContentContainer from '../../components/ContentContainer.vue';
import { collect } from 'collect.js';
import { typeColor, brandColor, statusColor } from '../../utils/color.utils';

export default {
    components: { ContentContainer },
    data() {
        return {
            requests: [],
            isLoading: true
        }
    },
    mounted() {
        this.getRequestsData();
    },
    methods: {
        getBrandColor(request) {
            return brandColor(request);
        },
        getTypeColor(request) {
            return typeColor(request);
        },
        getStatusColor(request) {
            statusColor(request);
        },
        getRequestsData() {
            google.script.run
                .withSuccessHandler(this.onSuccessRequest)
                .getRequestsData();
        },
        onSuccessRequest(data) {
            let collection = collect(JSON.parse(data));
            this.requests = collection.sortByDesc('requestId').all();
            this.isLoading = false
        }
    }
}
</script>