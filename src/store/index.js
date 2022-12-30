import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
    callingCodes: [],
    currency: [],
  },
  mutations: {
    setCountries(state, params) {
      state.countries = params;
    },
    setCallingCodes(state, params) {
      state.callingCodes = params;
    },
    setCurrency(state, params) {
      state.currency = params;
    },
  },
  actions: {
    getNation(store, valueSearch) {
      if (valueSearch) {
        return new Promise((resolve, reject) => {
          axios
            .get("name/" + valueSearch + "?fullText=false")
            .then((res) => {
              store.commit("setCountries", res.data);
              resolve("Succes");
              localStorage.setItem("codeCalling", res.data.callingCodes[0]);
              localStorage.setItem("codeCurrency", res.data.currencies[0].code);
            })
            .catch((err) => {
              if (err) {
                reject("eror");
              }
            });
        });
      } else {
        store.commit("setCountries", []);
      }
    },
    getCallingCode(store) {
      const codeCalling = localStorage.getItem("codeCalling");
      axios.get("callingcode/" + codeCalling).then((result) => {
        store.commit("setCallingCodes", result.data);
      });
    },
    getCurrency(store) {
      const codeCurrency = localStorage.getItem("codeCurrency");
      axios.get("currency/" + codeCurrency).then((res) => {
        store.commit("setCurrency", res.data);
      });
    },
  },
  modules: {},
});
