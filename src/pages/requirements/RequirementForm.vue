<template>
  <ContentContainer title="Request a requirement">
    <div class="col-md-8 offset-2">
        <div class="card">
            <div class="card-body">
                <form-wizard color="#0d436b" @on-complete="saveRequest" :start-index="currentStep">
                    <hr>
                    <tab-content :before-change="beforeFirstStep">
                        <div class="row">
                            <div class="col-md-4 from-group">
                                <label for="reqType">
                                    Requirement Type
                                </label>
                                <select name="reqType" id="reqType" class="form-control" v-model="reqType">
                                    <option value="">Select a type</option>
                                    <option value="Website improvement">Website improvement</option>
                                    <option value="Project">Project</option>
                                    <option value="Automation - Data/Process">Automation - Data/Process</option>
                                    <option value="I want to measure something">I want to measure something</option>
                                </select>
                                <p class="text-danger" v-show="errors.reqType">
                                    {{errors.reqType}}
                                </p>

                            </div>

                            <div class="col-md-4 form-group">
                                <label for="site">
                                    Site
                                </label>
                                <select name="site" id="site" class="form-control" v-model="site">
                                    <option value="">Select a site</option>
                                    <option v-for="site in sitesLists" :value="site.name">{{ site.name }}</option>
                                </select>
                                <p class="text-danger" v-show="errors.site">
                                    {{errors.site}}
                                </p>
                            </div>

                            <div class="col-md-4 form-group">
                                <label for="site">
                                    KPI's
                                </label>
                                <select name="kpi" id="kpi" class="form-control" v-model="kpi">
                                    <option value="">Select KPI</option>
                                    <option v-for="kpi in kpiList" :value="kpi.name">{{ kpi.name }}</option>
                                </select>
                                <p class="text-danger" v-show="errors.kpi">
                                    {{errors.kpi}}
                                </p>
                            </div>
                        </div>
                    </tab-content>
                    <tab-content :before-change="beforeSecondStep">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label for="title">Title</label>
                                <input type="text" name="title" id="title" class="form-control" v-model="title" maxlength="50">
                                <p class="text-danger" v-show="errors.title">
                                    {{errors.title}}
                                </p>
                            </div>

                            <div class="col-md-6 form-group">
                                <label for="description">Description</label>
                                <textarea v-model="description" name="description" id="description" class="form-control">
                                </textarea>
                                <p class="text-danger" v-show="errors.description">
                                    {{errors.description}}
                                </p>
                            </div>
                        </div>
                    </tab-content>
                </form-wizard>
            </div>
        </div>
    </div>
  </ContentContainer>
</template>
<script>
import { ref } from "vue";
import { FormWizard, TabContent } from "vue3-form-wizard";
import ContentContainer from "../../components/ContentContainer.vue";
import { runGoogleScript } from '../../utils/google.run';
export default {
  name: "RequirementForm",
  components: { ContentContainer, FormWizard, TabContent },
  data() {
    return {
        kpiList: [],
        sitesLists: [],
        reqType: '',
        site: '',
        title: '',
        description: '',
        kpi: '',
        currentError: '',
        currentStep: 0,
        errors: {
            site: null,
            reqType: null,
            title: null,
            description: null,
            kpi: null
        }
    }
  },
  async mounted() {
    this.kpiList = JSON.parse(await runGoogleScript('getKPIS'));
    this.sitesLists = JSON.parse(await runGoogleScript('getSiteList'));
  },
  methods: {
    async saveRequest() {
        try {
            const res = await runGoogleScript('saveRequest', {
                brand: this.site,
                reqType: this.reqType,
                title: this.title,
                description: this.description,
                kpi: this.kpi
            });

            if (res.status == 200) {
                Swal.fire({
                    title: 'Requirement created successfully!',
                    icon: 'success',
                    confirmButtonText: 'Accept'
                });

                this.resetFields();
                await this.$router.push('/reqs-table');
            } 
        } catch (error) {
            Swal.fire({
                title: 'Sorry, try later or contact your admin!',
                icon: 'error',
                confirmButtonText: 'Accept'
            });

            this.resetFields();
        }
    },
    beforeFirstStep() {
        return this.validateFirstInputs();
    },
    beforeSecondStep() {
        return this.validateSecondInputs();
    },
    validateSecondInputs() {
        this.title = '';
        this.description = '';

        if (!this.title) {
            this.errors.title = 'Requirement title is required';
        }

        if (!this.description) {
            this.errors.description = 'Requirement description is required';
        }

        if (this.errors.title || this.errors.description) {
            return false;
        }

        return true;
    },
    validateFirstInputs() {
        this.errors.reqType = '';
        this.errors.site = '';
        this.errors.kpi = '';

        if (!this.reqType) {
            this.errors.reqType = 'Requirement type is required';
        }

        if (!this.site) {
            this.errors.site = 'Requirement site is required';
        }

        if (!this.kpi) {
            this.errors.kpi =  'Requirement KPI is required';
        }

        if (this.errors.reqType || this.errors.site || this.errors.kpi) {
            return false;
        }

        return true;
    },
    resetFields() {
        this.site = '';
        this.reqType = '';
        this.title = '';
        this.description = '';
        this.kpi = '';
    }
  }
};
</script>
