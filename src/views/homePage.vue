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
              v-model="modelValue"
              class="mt-5"
              color="purple accent-4"
              append-icon="mdi-magnify"
              solo
              outlined
              item-text="name.common"
              label="Type any country name"
              @keyup="isTyping"
              @input="changeValue"
            ></v-text-field>

            <div v-if="countries.length > 0">
              <div v-if="isGetData" class="d-flex justify-center">
                <div></div>
                <v-progress-circular
                  color="rgba(1, 104, 144, 0.653)"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div
                v-else
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
            <v-alert
              v-if="err"
              shaped
              outlined
              dense
              :value="alert"
              type="error"
            >
              Data Not Found
            </v-alert>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import _ from "lodash";

export default {
  name: "HomePage",
  data() {
    return {
      alert: true,
      DataCountries: [],
      err: false,
      modelValue: "",
      isGetData: false,
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
            .then(() => {
              this.isGetData = false;
            })
            .catch((err) => {
              if (err) {
                this.err = true;
                this.isGetData = false;
                this.countries.length = 0;
              }
            });
        }
      },
      [500]
    ),
    changeValue() {
      if (this.modelValue) {
        this.isGetData = true;
      }
    },
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
  /* color: rgba(1, 104, 144, 0.653); */
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
