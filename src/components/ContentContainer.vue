<template>
  <div class="content-header">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="m-0">{{title}}</h1>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="container-fluid h-100">
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
    name: 'ContentContainer',
    props: {
        title: {
            type: String
        }
    }
};
</script>
