<template>
  <nav class="nav">
    <img src="../img/sweet_time.png" class="nav__logo" alt="">
    <input @click="onCheck" type="checkbox" class="nav__checkbox" id="nav-toggle">
    <label for="nav-toggle" class="nav__btn">
      <button :class="`${navIconClr}`"></button>
    </label>
    <div id="myNav" :class="`overlay ${myNav}`">
      <div class="overlay-content">
        <img src="../img/sweet_time.png" class="overlay_img">
        <a href="#">首頁</a>
        <a href="#">商品總覽</a>
        <a href="#">購買須知</a>
        <a href="#">聯絡我們</a>
      </div>
    </div>
    
    <ul>
        <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Login</a>
        </router-link>
        <li v-if="isLoggedIn" class="li-pointer nav-item">
          <a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
        </li>
        <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Register</a>
        </router-link>
        <div class="text-center mt-4">
          <button @click="loginWithGoogle" v-if="!isLoggedIn" class="nav-link">Login with Google</button>
        </div>
    </ul>
  </nav>
</template>

<script>
import firebase from 'firebase';
import router from "../router";
import {
  mapActions, mapGetters
} from 'vuex';
export default {
  name: "Nav",
  data() {
    return {
      checked: false,
      size: "lg",
      myNav: "hide-sm",
      navIconClr:"nav__icon",
      errors: [],
      loading: false,
      user: ""
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    },
    onResize() {
      if (window.innerWidth > 1000) {
        this.size = "sm";
        if (!this.checked) 
          this.myNav = "notransition hide-sm";
      } else {
        this.size = "sm";
        if (!this.checked)
           this.myNav = "notransition hide-sm";
      }
    },

    onCheck() {
      if (this.checked && this.size == "sm") {
        this.myNav = "hide-sm";
        this.navIconClr = "nav__icon";
      // else if (this.checked && this.size == "lg") 
      //   this.myNav = "hide-lg";
      }

      else {
        this.myNav = "show";
        this.navIconClr = "nav__icon__white";
      }

      this.checked = !this.checked;
    },

    onRoute() {
      this.checked = !this.checked;
    },

    async loginWithGoogle() {
      // loading set to true
      this.loading = true;
      // clear old errors
      this.errors = [];
      try {
        let response = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.user = response.user;
        router.push("/");
      } catch (error) {
        this.errors.push(error.message);
        // set loading to false
        this.loading = false;
      }
    }
  },

  created() {
    window.addEventListener("resize", this.onResize);
    // if (window.innerWidth > 1000) {
    //   this.size = "lg";
    //   this.myNav = "hide-lg";
    // } else {
      this.size = "sm";
      this.myNav = "hide-sm";
    // }
  }
  
};
</script>

<style lang="postcss" scoped>
@import "../styles/base/_variables.css";
@import "../styles/base/_global.css";
@import "../styles/modules/_nav.css";

.notransition {
  transition: 0s !important;
}

.show {
  transition: 0.5s;
  width: 100%;
  height: 100%;
}

.hide-lg {
  transition: 0.5s;
  width: 0%;
  height: 100%;
}

.hide-sm {
  transition: 0.5s;
  width: 100%;
  height: 0%;
}

.overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: $color-pink;
  overflow-x: hidden;
}

.overlay-content {
  font-family: '微軟正黑體';
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  color: $color-white;
  display: block;
  transition: 0.3s;
}

.overlay a:hover,
.overlay a:focus {
  color: #f1f1f1;
}

.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

.overlay_img{
    height: 5rem;
    margin-top: -10rem;
    margin-bottom: 2rem;
}

.overlay-width {
}
</style>
