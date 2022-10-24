<template>
    <ContentContainer title="Report an incident">
      <div class="col-md-8 offset-2">
          <div class="card">
              <div class="card-body">
                  <form-wizard color="#0d436b" @on-complete="saveRequest" :start-index="currentStep" >
                      <hr>
                      <tab-content :before-change="beforeFirstStep">
                          <div class="row">
                              <div class="col-md-6 from-group">
                                  <label for="reqType">
                                      Incident Type
                                  </label>
                                  <select name="reqType" id="reqType" class="form-control" v-model="reqType">
                                    <option value="">Select a incident type</option>
                                    <option value="VTEX">VTEX</option>
                                    <option value="VTEX/Wordpress">VTEX/Wordpress</option>
                                    <option value="Merchant Center">Merchant Center</option>
                                    <option value="Website">Website</option>
                                    <option value="Google Analytics/Tag Manager">
                                    Google Analytics/Tag Manager
                                    </option>
                                  </select>
                                  <p class="text-danger" v-show="errors.reqType">
                                      {{errors.reqType}}
                                  </p>
  
                              </div>
  
                              <div class="col-md-6 form-group">
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
                          </div>
                      </tab-content>
                      <tab-content :before-change="beforeSecondStep">
                          <div class="row">
                              <div class="col-md-6 form-group">
                                  <label for="title">¿What's wrong?</label>
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
  import { FormWizard, TabContent } from "vue3-form-wizard";
  import ContentContainer from "../../components/ContentContainer.vue";
  import { runGoogleScript } from '../../utils/google.run';
  export default {
    name: "RequirementForm",
    components: { ContentContainer, FormWizard, TabContent },
    data() {
      return {
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
      this.sitesLists = JSON.parse(await runGoogleScript('getSiteList'));
    },
    methods: {
      async saveRequest() {
          this.setLoading();
          try {
              const res = await runGoogleScript('saveIncident', {
                  brand: this.site,
                  reqType: this.reqType,
                  title: this.title,
                  description: this.description,
                  kpi: this.kpi
              });
  
              if (res.status == 200) {
                  Swal.fire({
                      title: 'Incident created successfully!',
                      icon: 'success',
                      confirmButtonText: 'Accept'
                  });
  
                  this.resetFields();
                  await this.$router.push('/inc-table');
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
      async setLoading() {
          Swal.fire({
              title: 'Saving the Incident!',
              html: 'Give me <b></b> seconds.',
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                  }, 100)
              },
              willClose: () => {
                  clearInterval(timerInterval)
              }
          })
      },
      validateSecondInputs() {
          this.errors.title = '';
          this.errors.description = '';
  
          if (!this.title) {
              this.errors.title = 'Incident title is required';
          }
  
          if (!this.description) {
              this.errors.description = 'Incident description is required';
          }
  
          if (this.errors.title || this.errors.description) {
              return false;
          }
  
          return true;
      },
      validateFirstInputs() {
          this.errors.reqType = '';
          this.errors.site = '';
  
          if (!this.reqType) {
              this.errors.reqType = 'Incident type is required';
          }
  
          if (!this.site) {
              this.errors.site = 'Incident site is required';
          }
  
          if (this.errors.reqType || this.errors.site) {
              return false;
          }
  
          return true;
      },
      resetFields() {
          this.site = '';
          this.reqType = '';
          this.title = '';
          this.description = '';
      }
    }
  };
  </script>
  