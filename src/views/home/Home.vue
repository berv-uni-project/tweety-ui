<template>
  <div>
    <BLoading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    />
    <BTabs
      v-model="activeTab"
      position="is-centered"
    >
      <BTabItem label="Search">
        <HomeForm
          :form="form"
          :submit-data="submitData"
        />
      </BTabItem>
      <BTabItem label="Result">
        <HomeResult :result="result" />
      </BTabItem>
    </BTabs>
  </div>
</template>

<script src="./Home.js">
</script>
