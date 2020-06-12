<template>
  <header>
    <nav>
      <ul class="container">
        <li class="option">
          <img src="@/assets/svgs/bars.svg" alt="Menu" height="25px" v-on:click="sidebar()" />
        </li>
        <li v-if="loged" class="search">
          <div class="input-icono">
            <input
              @focus="searchFocus = true"
              @blur="unfocus()"
              v-model="search"
              type="text"
              class="search-input"
              v-bind:placeholder="groupName"
            />
          </div>
          <div v-if="searchFocus" class="options-search">
            <div
              class="result"
              v-for="note in filteredList"
              :key="note.id"
              @click="show('nota@'+note.id), searchFocus = false"
            >
              <div class="item1">
                <img
                  src="@/assets/svgs/sticky-note.svg"
                  alt="Menu"
                  height="25px"
                  v-on:click="sidebar()"
                />
              </div>
              <div class="item2">{{note.title}}</div>
            </div>
          </div>
        </li>
        <li v-else class="logo">
          <div>
            <h1>GWW</h1>
          </div>
        </li>
        <li class="option">
          <img
            v-if="loged"
            src="@/assets/svgs/user-circle.svg"
            alt="Menu"
            height="25px"
            v-on:click="show('profile-modal')"
          />
          <img
            v-else
            src="@/assets/svgs/user-plus.svg"
            v-on:click="show('register-modal')"
            alt="Menu"
            height="25px"
          />
          <img
            src="@/assets/svgs/info-circle.svg"
            v-on:click="openPdf()"
            alt="Menu"
            height="25px"
          />
          <img
            v-if="loged"
            v-on:click="show('choice-modal')"
            src="@/assets/svgs/sign-out-alt.svg"
            alt="Menu"
            height="25px"
          />
        </li>
      </ul>
    </nav>
    <modal
      class="modal-window"
      name="register-modal"
      :height="'auto'"
      :adaptive="'adaptive'"
      :scrollable="true"
    >
      <com-register @exit="hide('register-modal')" />
    </modal>
    <modal
      class="modal-window"
      name="profile-modal"
      height="auto"
      :adaptive="'adaptive'"
      :scrollable="true"
    >
      <com-profile @exit="hide('profile-modal')" />
    </modal>
    <modal
      class="modal-window"
      name="choice-modal"
      height="auto"
      :adaptive="'adaptive'"
      :scrollable="true"
    >
      <com-choice @exit="hide('choice-modal')" message="Log out?" event="logout" />
    </modal>
  </header>
</template>

<script>
import bus from "@/bus";
import Register from "@/components/Register";
import Profile from "@/components/Profile";
import Choice from "@/components/Choice";
export default {
  name: "Navbar", //this is the name of the component
  components: {
    "com-register": Register,
    "com-profile": Profile,
    "com-choice": Choice
  },
  data: () => ({
    loged: false,
    groupName: null,
    arrayNotes: null,
    search: "",
    searchFocus: false
  }),
  mounted() {
    bus.$on("takeNotes", criteria => {
      this.arrayNotes = criteria;
    });

    bus.$on("placeSerchBar", criteria => {
      if (criteria != null) {
        this.groupName = criteria;
      }
    });

    bus.$on("login", criteria => {
      this.loged = criteria;
    });

    bus.$on("logout", criteria => {
      if (criteria) {
        this.logout();
      }
    });

    if (this.$session.get("token")) {
      this.loged = true;
    }
  },
  methods: {
    logout() {
      this.$session.remove("token");
      this.$router.push("/login");
      bus.$off("showNotes")
      bus.$off("admin-note")
      bus.$off("feedback")
      location.reload();
      bus.$emit("login", false);
    },

    show(modal_name) {
      this.$modal.show(modal_name);
    },

    hide(modal_name) {
      this.$modal.hide(modal_name);
    },

    sidebar() {
      if (this.loged) {
        bus.$emit("sidebar");
      }
    },

    transmitSize() {
      console.log("RESIZE:", window.outerWidth);
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async unfocus() {
      await this.sleep(100);
      this.search = "";
    },
    
    openPdf(){
      window.open("./Ayuda.pdf", "_blank")
    }
    
  },
  computed: {
    filteredList() {
      if (this.search != "") {
        return this.arrayNotes.filter(note => {
          return note.title.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return [];
      }
    }
  }
};
</script>


<style lang="scss" >
.logo h1 {
  font-size: 2em;
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.title {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0.5em;
  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  background-color: #cdd7d6;
}
nav {
  padding: 0px;
  margin: 0px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.search {
  width: 30%;
}

.options-search {
  position: absolute;
  background-color: #fff;
  width: 30%;
  padding: 0px 3.2px;
  border: 0.5px solid #cdd7d6;
  z-index: 10;
}

.result {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  padding: 0.3em 0;
  border-radius: 3px;
  &:hover {
    background-color: #cdd7d6;
    cursor: pointer;
  }
}

.item1 {
  width: 30%;
}

.item2 {
  width: 50%;
}

.option {
  width: 10%;
  display: flex;
  flex-direction: row;
}
.option img {
  padding: 0px 5px;
}

.search input {
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  padding: 0px 5px;
  height: 30px;
  width: 100%;
  text-align: center;
  &:focus {
    border-color: #757c7c;
    border-radius: 3px;
  }
}

@media all and (max-width: 600px) {
  .container {
    flex-wrap: wrap;
  }
  .container > li {
    flex-basis: 50%;
  }
  .options-search {
    width: 50%;
    padding: 0px 2px;
  }
  .search {
    order: 1;
    margin: 1em 0;
  }
  .option {
    justify-content: center;
  }
}

@media all and (max-width: 400px) {
  .container > li {
    flex-basis: 100%;
    justify-content: center;
  }
  .option {
    order: 1;
  }
  .options-search {
    width: 90%;
    padding: 0;
  }
  .search {
    margin: 1em 1em;
  }

  .modal-window {
    width: 100%;
  }
}
</style>
