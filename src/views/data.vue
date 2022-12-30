<template>
  <v-main>
    <v-container>
      <v-btn class="my-15 white--text" to="/" id="button" large>
        <v-icon left> mdi-arrow-left </v-icon>Back To Homepage
      </v-btn>
      <h1 id="specialStyle">
        {{ names.name }}
        <span>
          <v-avatar tile>
            <img :src="dataCountry.flag" alt="" />
          </v-avatar>
        </span>
      </h1>
      <div class="d-flex" style="display: grid; column-gap: 1em">
        <v-chip v-for="data in dataCountry.altSpellings" :key="data" id="chips">
          <h5>
            {{ data }}
          </h5>
        </v-chip>
      </div>

      <br />
      <v-row class="mt-10">
        <v-col cols="3">
          <h3 class="mx-5">
            LatLong
            <h1>
              {{ latlong }}
            </h1>
          </h3>

          <h3 class="mt-12">Calling Code</h3>
          <h1 v-for="data in dataCountry.callingCodes" :key="data">
            {{ data }}
          </h1>
          <div>
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <a href="#" v-bind="attrs" v-on="on"
                    >{{ lengthCallingCode }} countries
                  </a>
                </template>
                <span>
                  <p
                    v-for="nameCallingCode in sameCallingCode"
                    :key="nameCallingCode.name"
                  >
                    {{ nameCallingCode.name }}
                  </p>
                </span>
              </v-tooltip>
            </span>
            with this calling code
          </div>
        </v-col>

        <v-col cols="2">
          <v-img width="100%" src="../assets/globe.svg"></v-img>
        </v-col>
        <v-col cols="6">
          <div class="mx-12">
            <h3>
              Capital :
              <strong>
                {{ dataCountry.capital }}
              </strong>
            </h3>
            <h3>
              Region :
              <strong>
                {{ dataCountry.region }}
              </strong>
            </h3>
            <h3>
              Subregion :
              <strong>
                {{ dataCountry.subregion }}
              </strong>
            </h3>
          </div>

          <div class="mt-15 mx-5">
            <h3 class="">
              Currency
              <div v-for="data in dataCountry.currencies" :key="data">
                <h1>
                  {{ data.code }}
                </h1>
              </div>
            </h3>

            <div>
              <span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <a href="#" v-bind="attrs" v-on="on"
                      >{{ lengthCurrency }} countries
                    </a>
                  </template>
                  <span>
                    <p
                      v-for="nameCurrency in sameCurrency"
                      :key="nameCurrency.name"
                    >
                      {{ nameCurrency.name }}
                    </p>
                  </span>
                </v-tooltip>
              </span>
              with this currency
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  name: "DataPage",
  data() {
    return {
      dataCountry: [],
      latlong: "",
      lengthCallingCode: null,
      lengthCurrency: null,
      sameCallingCode: [],
      sameCurrency: [],
    };
  },
  computed: {
    names() {
      return this.$route.params;
    },
    callingCodes() {
      return this.$store.state.callingCodes;
    },
    currency() {
      return this.$store.state.currency;
    },
  },

  mounted() {
    this.getAllData();
    this.getCallingCodeData();
    this.getCurrencyData();
  },
  methods: {
    getAllData() {
      axios
        .get("/name/" + this.names.name + "?fullText=true")
        .then((response) => {
          this.dataCountry = response.data[0];
          const latlong = this.dataCountry.latlng;
          let latlongString = "";
          latlong.forEach((item) => {
            if (latlongString) {
              latlongString = `${latlongString}, ${item}`;
            } else {
              latlongString = `${item}`;
            }
          });
          this.latlong = latlongString;
        });
    },
    getCallingCodeData() {
      this.$store.dispatch("getCallingCode").then(() => {
        this.lengthCallingCode = this.callingCodes.length;
        this.sameCallingCode = this.callingCodes;
      });
    },
    getCurrencyData() {
      this.$store.dispatch("getCurrency").then(() => {
        this.lengthCurrency = this.currency.length;
        this.sameCurrency = this.currency;
      });
    },
  },
};
</script>

<style>
#button {
  background: #8362f2;
}
#chips {
  background: rgba(141, 212, 204, 1);
}
h1 {
  font-size: 40px;
  color: rgb(115, 75, 247);
}
#specialStyle {
  color: rgb(0, 0, 0);
  font-size: 50px;
}
h3 {
  font-weight: normal;
}
</style>
