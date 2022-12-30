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
        <v-card-title>
          <h1 class="mt-5 mx-auto">Country</h1>
        </v-card-title>
        <v-row>
          <v-col cols="10" class="mx-auto">
            <v-text-field
              v-model="auto"
              class="mt-5"
              color="purple accent-4"
              append-icon="mdi-magnify"
              solo
              outlined
              item-text="name.common"
              label="Type any country name"
              @keyup="isTyping"
            ></v-text-field>
            <v-alert
              v-if="isCountries === false"
              shaped
              outlined
              dense
              :value="alert"
              type="error"
            >
              Data Not Found
            </v-alert>

            <div v-if="isCountries === true">
              <div
                v-for="data in countries"
                :id="data.name"
                width="100"
                :key="data.name"
                class="divClass mb-3"
                @click="() => redirect(data.name)"
              >
                <a
                  width="100%"
                  class="black--text text-decoration-none"
                  href="#"
                >
                  {{ data.name }}
                </a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
// import axios from "axios";
import _ from "lodash";

export default {
  name: "HomePage",
  data() {
    return {
      names: [],
      alert: true,
      text: true,
      newName: [],
      auto: "",
      result: "",
      isCountries: true,
    };
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
  },
  watch: {
    countries(e) {
      if (e.length < 1) {
        this.alert = false;
      }
      if (e.length > 5) {
        this.countries.splice(0, 5);
      }
    },
  },

  methods: {
    isTyping: _.debounce(
      function (e) {
        if (e) {
          const value = e.target.value;

          this.$store
            .dispatch("getNation", value)
            .then((res) => {
              if (res) {
                this.isCountries = true;
              }
            })
            .catch((err) => {
              if (err) {
                this.isCountries = false;
                this.alert = true;
              }
            });
        }
      },
      [300]
    ),

    redirect(name) {
      this.$router.push("/data/" + name);
    },
  },
};
</script>

<style>
#cards {
  border: solid #66abffd1;
  border-radius: 10px;
  background: linear-gradient(to bottom right, #abfbff, #abf1ff);
}
a {
  font-size: large;
}
.divClass:hover {
  background-color: rgba(6, 218, 193, 0.492);
  cursor: pointer;
  border-radius: 5px;
}
.divClass :not(:hover) {
  background-color: transparent;
}
.divClass {
  padding: 0.5em;
}
</style>
