<script>
export default {
  data: () => ({
    show: true,
    valid: true,

    showErrorAlert: false,
    showMessageDialog: false,
    errorMessage: "",

    title: "E.T.",
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 2) || "Title must be that more 1 characters",
    ],

    imageURL:
      "https://discover.ticketmaster.co.uk/wp-content/uploads/2022/05/Anything-Goes-2022.-Anything-Goes.-Photo-by-Marc-Brenner-738x415.jpg.webp",
    imageRules: [
      (v) => !!v || "Images is required",
      (v) =>
        (v && /https?:\/\//.test(v)) ||
        "Images must be start with http:// ot https://",
    ],

    organizer: "Organizer",
    organizerRules: [
      (v) => !!v || "Organizer is required",
      (v) => (v && v.length >= 2) || "Organizer must be that more 1 characters",
    ],

    description:
      "The third installment of  which follows the continuing adventures of Newt Scamander.",
    descriptionRules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length > 3) || "Description must be more than 4 characters",
    ],
    date: 1,
    dateRules: [
      (v) => !!v || "Date is required",
      (v) => (v && v.length >= 3) || "Date count must be number bigger than -1",
    ],

    rating: "1",
    ratingRules: [
      (v) => !!v || "People description is required",
      (v) => (v && v > 0) || "People is required",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        //fix input fields result
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1); //capitalize first letter
        this.genres =
          this.organizer.charAt(0).toUpperCase() + this.organizer.slice(1); //capitalize first letter
        try {
          this.tickets = this.date.replace(/^0+/, "");
        } catch (e) {
          ("");
        } //remove leading zero

        const uid = JSON.parse(localStorage.getItem("auth")).uid;
        const newMovieObj = {
          creatorUid: uid,
          title: this.title,
          imageUrl: this.imageURL,
          genres: this.organizer,
          description: this.description,
          tickets: Number(this.date),
          rating: this.rating,
        };

        //check is movie in collection
        const checkIsMovieExist = movies.some(
          (x) => x.title == this.title && x.imageUrl == this.imageURL
        );
        console.log(checkIsMovieExist);

        addData(newMovieObj)
          .then((e) => {
            console.log("Success add new event to collection", e);
            this.showMessageDialog = true;
            setTimeout(() => {
              this.showMessageDialog = false;
              this.$router.push("events"); //redirect ot movies Page   TODO
            }, 3500);
          })
          .catch((e) => {
            this.errorMessage = e;
            this.showErrorAlert = true;
            setTimeout(() => (this.showErrorAlert = false), 3000);
          });
      }
    },
    reset() {
      try {
        this.$refs.form.reset();
      } catch (error) {
        ("");
      }
    },

    exit() {
      this.show = false;
      // this.$router.push("home");
      setTimeout(() => {
        this.$router.push("events");
      }, 100);
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>