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
          <h1 class="mx-auto">Country</h1>
        </v-card-title>
        <v-row>
          <v-col cols="10" class="mx-auto">
            <v-text-field
              v-model="auto"
              id="textField"
              class="mt-5"
              color="purple accent-4"
              append-icon="mdi-magnify"
              solo
              outlined
              item-text="name.common"
              label="Type any country name"
              @keyup="isTyping"
            ></v-text-field>
            <v-alert shaped outlined dense :value="alert" type="error">
              Data Not Found
            </v-alert>
            <div id="fullId">
              <div
                v-for="data in newName"
                :id="data.name"
                width="100"
                :key="data.name"
                class="divClass mb-3"
                @click="
                  () =>
                    redirect(
                      data.name,
                      data.callingCodes[0],
                      data.currencies[0].code
                    )
                "
                @mousemove="hover(data.name)"
                @mouseout="nonHover(data.name)"
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
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      names: [],
      alert: false,
      text: true,
      newName: [],
      auto: "",
      result: "",
    };
  },

  async mounted() {
    document.getElementById("textField").onkeyup = setTimeout(function () {
      myNetod();
    }, 5000);

    function myNetod() {
      console.log("assalamualikum");
    }
    await setTimeout(function () {
      console.log("asssalamuaikum");
    }, 5000);
  },

  methods: {
    isTyping() {
      axios
        .get("name/" + this.auto + "?fullText=false")
        .then((res) => {
          this.names = res.data;
          this.newName = this.names.splice(0, 5);
          console.log("hemmm", this.newName);
          if (res) {
            this.alert = false;
            document.getElementById("fullId").style.display = "block";
          } else if (this.names == null) {
            this.alert = false;
            document.getElementById("fullId").style.display = "none";
          }
        })
        //Handler Err
        .catch((err) => {
          console.error("ini response", err);
          if (err) {
            this.alert = true;
            document.getElementById("fullId").style.display = "none";
          }
        });
    },
    redirect(name, callingCodes, code) {
      localStorage.setItem("codeCalling", callingCodes);
      localStorage.setItem("codeCurrency", code);
      return this.$router.push("/data/" + name);
    },
    hover(name) {
      console.log("tes");
      document.getElementById(name).style.backgroundColor =
        " rgba(84, 84, 84, 0.492)";
    },
    nonHover(name) {
      document.getElementById(name).style.backgroundColor = " transparent";
    },
  },
};
</script>

<style>
#cards {
  border: solid #66abffd1;
  border-radius: 10px;
}
a {
  font-size: large;
}
</style>
