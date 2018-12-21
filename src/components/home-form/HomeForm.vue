<template>
  <div class="box">
    <h1 class="title has-text-centered">
      Tweety
    </h1>
    <form @submit.prevent="submitData">
      <BField
        label="Search"
        :type="{'is-danger': errors.has('search')}"
        :message="errors.first('search')"
      >
        <BInput
          v-model="form.search"
          v-validate="'required'"
          name="search"
          placeholder="Search Keyword in Twitter"
        />
      </BField>
      <BField label="Dinas Kesehatan">
        <BTaginput
          v-model="form.dinkes"
          maxtags="5"
          type="is-info"
          ellipsis
          icon="tag"
          placeholder="Search Tags for Dinas Kesehatan"
        />
      </BField>
      <BField label="Dinas Sosial">
        <BTaginput
          v-model="form.dinsos"
          maxtags="5"
          type="is-info"
          ellipsis
          icon="tag"
          placeholder="Search Tags for Dinas Sosial"
        />
      </BField>
      <BField label="Dinas Pendidikan">
        <BTaginput
          v-model="form.dinpen"
          maxtags="5"
          type="is-info"
          ellipsis
          icon="tag"
          placeholder="Search Tags for Dinas Pendidikan"
        />
      </BField>
      <BField label="Dinas Pemuda dan Olahraga">
        <BTaginput
          v-model="form.dinpem"
          maxtags="5"
          type="is-info"
          ellipsis
          icon="tag"
          placeholder="Search Tags for Pemuda dan Olahraga"
        />
      </BField>
      <BField label="Dinas Binamarga dan Pengairan">
        <BTaginput
          v-model="form.dinbina"
          maxtags="5"
          type="is-info"
          ellipsis
          icon="tag"
          placeholder="Search Tags for Dinas Binamarga dan Pengairan"
        />
      </BField>

      <BField
        label="Select Method"
        :addons="false"
        :type="{'is-danger': errors.has('isKMP')}"
        :message="errors.first('isKMP')"
      >
        <BRadio
          v-model="form.method"
          v-validate="'required'"
          name="isKMP"
          native-value="true"
        >
          KMP
        </BRadio>
        <BRadio
          v-model="form.method"
          v-validate="'required'"
          name="isKMP"
          native-value="false"
        >
          Booyer-Moore
        </BRadio>
      </BField>
      <button
        class="button is-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script src="./HomeForm.js">
</script>
