<template>
  <div
      class="card card-outline"
    >
      <div class="card-header">
        <p>
            <a 
                data-toggle="collapse" 
                :href="'#collapse-' + req.requestId" 
                role="button" aria-expanded="false" 
                :aria-controls="'#collapse-' + req.requestId"
                class="text-reset"
            >
                <strong>{{ req.requestId }}</strong> - {{ req.requestType }} - <span :class="getBrandColor(req)">{{ req.requestBrand }}</span>
            </a>
        </p>
      </div>

      <div class="collapse" :id="'collapse-' + req.requestId">
        <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <h5>{{ req.requestTitle }}</h5>
            <p class="text-muted">
              {{ req.requestDescription }}
            </p>
          </div>
          <div class="col-md-12">
            <strong>Request user: </strong>{{ req.requestUser }}
          </div>
        </div>
      </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <div class="col-md-12">
            <strong>KPIS's: </strong> {{ req.requestReason }}
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { brandColor  } from '../utils/color.utils';

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
      return brandColor(request)
    }
  }
};
</script>
