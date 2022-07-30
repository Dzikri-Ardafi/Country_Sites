<template>
  <v-main>
    <v-container fluid>
      <v-card
        class="mx-auto my-12"
        id="cards"
        elevation="7"
        max-width="750"
        height="500"
      >
        <v-row>
          <v-col cols="10" class="mx-auto">
            <v-autocomplete
              clearable
              class="mt-5"
              solo
              outlined
              label="Type any country name "
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
};
</script>

<style>
#cards {
  border: solid #66abffd1;
  border-radius: 10px;
}
</style>
