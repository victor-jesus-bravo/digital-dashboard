<template>
  <div
      class="card card-outline"
    >
      <div class="card-header">
        <p>
            <a 
                data-toggle="collapse" 
                :href="'#collapse-' + getId()" 
                role="button" aria-expanded="false" 
                :aria-controls="'#collapse-' + getId()"
                class="text-reset"
            >
                <strong>{{ req.requestId || req.incidentId }}</strong> - {{ req.requestTitle || req.incidentTitle }}
            </a>
        </p>
      </div>

      <div class="collapse" :id="'collapse-' + getId()">
        <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <p class="text-muted">
              {{ req.requestDescription || req.incidentDescription }}
            </p>
          </div>
          <div class="col-md-12">
            <strong>Request user: </strong>{{ req.requestUser || req.incidentUser }}
          </div>

          <div class="col-md-12">
            <strong>KPIS's: </strong> {{ req.requestReason || req.incidentReason }}
          </div>
        </div>
      </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <div class="col-md-12">
            {{ req.requestType || req.incidentType }} - <span :class="getBrandColor(req)">{{ req.requestBrand || req.incidentSite }}</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { reqBrandColor, incBrandColor  } from '../utils/color.utils';

export default {
  props: {
    req: {
      type: Object,
      default: {},
    },
    cardType: {
        type: String,
        deafult: 'card card-outline card-secondary'
    }
  },
  methods: {
    getBrandColor(request) {
      if (this.req.requestId) {
        return reqBrandColor(request);
      }

      return incBrandColor(request);
    },
    getId() {
      if (this.req.requestId) {
        return this.req.requestId;
      }

      return this.req.incidentId;
    }
  }
};
</script>
