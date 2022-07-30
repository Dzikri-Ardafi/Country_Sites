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
            <img :src="dataCountry.flags.svg" alt="" />
          </v-avatar>
        </span>
      </h1>
      <v-chip id="chips" :active="active_0">
        <h5>
          {{ dataCountry.altSpellings[0] }}
        </h5>
      </v-chip>
      <v-chip id="chips" class="mx-3" :active="active_1">
        <h5>
          {{ dataCountry.altSpellings[1] }}
        </h5>
      </v-chip>
      <v-chip id="chips" :active="active_2">
        <h5>
          {{ dataCountry.altSpellings[2] }}
        </h5>
      </v-chip>
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
          <h1>
            {{ dataCountry.callingCodes[0] }}
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
              <h1>
                {{ dataCountry.currencies[0].code }}
              </h1>
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
      active_0: true,
      active_1: true,
      active_2: true,
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
  },

  async mounted() {
    //GET ALL DATA
    const response = await axios.get(
      "/name/" + this.names.name + "?fullText=true"
    );
    this.dataCountry = response.data[0];
    const latlong = this.dataCountry.latlng;
    console.log("pasti eror", this.dataCountry.altSpellings[2]);
    //CONTROL CHIPS ACTIVE OR NOT
    if (this.dataCountry.altSpellings[0] == undefined) {
      this.active_0 = false;
    }
    if (this.dataCountry.altSpellings[1] == undefined) {
      this.active_1 = false;
    }
    if (this.dataCountry.altSpellings[2] == undefined) {
      this.active_2 = false;
    }
    //GET DATA CALLING CODE
    console.log(this.dataCountry);
    for (let i = 0; i < latlong.length; i++) {
      this.latlong = latlong[0] + ", " + latlong[1];
    }
    //GET LENGTH ARRAY CALLING CODE
    this.codeCalling = localStorage.getItem("codeCalling");
    const result = await axios.get("callingcode/" + this.codeCalling);
    this.lengthCallingCode = result.data.length;
    this.sameCallingCode = result.data;
    //GET LENGTH ARRAY CURRENCY
    this.codeCurrency = localStorage.getItem("codeCurrency");
    const res = await axios.get("currency/" + this.codeCurrency);
    this.lengthCurrency = res.data.length;
    this.sameCurrency = res.data;
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
