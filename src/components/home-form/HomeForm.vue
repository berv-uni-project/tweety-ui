<template>
  <div class="box">
    <h1 class="title has-text-centered">Tweety</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitData)">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider name="search" rules="required" v-slot="{ errors, failed }">
          <b-field label="Search" :type="{ 'is-danger': failed }" :message="errors[0]">
            <b-input v-model="form.search" placeholder="Search Keyword in Twitter" />
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider v-slot="props">
          <b-field label="Dinas Kesehatan">
            <b-taginput
              v-model="form.dinkes"
              maxtags="5"
              type="is-info"
              ellipsis
              icon="tag"
              placeholder="Search Tags for Dinas Kesehatan"
            ></b-taginput>
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider v-slot="props">
          <b-field label="Dinas Pendidikan">
            <b-taginput
              v-model="form.dinpen"
              maxtags="5"
              type="is-info"
              ellipsis
              icon="tag"
              placeholder="Search Tags for Dinas Pendidikan"
            ></b-taginput>
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider v-slot="props">
          <b-field label="Dinas Sosial">
            <b-taginput
              v-model="form.dinsos"
              maxtags="5"
              type="is-info"
              ellipsis
              icon="tag"
              placeholder="Search Tags for Dinas Sosial"
            ></b-taginput>
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider v-slot="props">
          <b-field label="Dinas Pemuda dan Olahraga">
            <b-taginput
              v-model="form.dinpem"
              maxtags="5"
              type="is-info"
              ellipsis
              icon="tag"
              placeholder="Search Tags for Pemuda dan Olahraga"
            ></b-taginput>
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider v-slot="props">
          <b-field label="Dinas Binamarga dan Pengairan">
            <b-taginput
              v-model="form.dinbina"
              maxtags="5"
              type="is-info"
              ellipsis
              icon="tag"
              placeholder="Search Tags for Dinas Binamarga dan Pengairan"
            ></b-taginput>
          </b-field>
        </ValidationProvider>
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <ValidationProvider name="isKMP" rules="required" v-slot="{ errors, failed }">
          <b-field
            label="Select Method"
            :addons="false"
            :type="{ 'is-danger': failed }"
            :message="errors[0]"
          >
            <b-radio v-model="form.method" native-value="true">KMP</b-radio>
            <b-radio v-model="form.method" native-value="false">Booyer-Moore</b-radio>
          </b-field>
        </ValidationProvider>
        <button class="button is-primary" type="submit">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script src="./HomeForm.js"></script>
