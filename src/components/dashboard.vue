<template>
  <div>
    <div class="loader" v-if="isLoading">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="box">
        <button
          type="button"
          class="btn text-white addProduct"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          +
        </button>

        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Maxsulotni qo'shing
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addProduct" class="form">
                  <div class="row">
                    <label>Maxsulotni otini yozing</label>
                    <input
                      type="text"
                      v-model="product_name"
                      class="addInput"
                      placeholder="maxsulotni otini yozing"
                      required
                    />
                    <label>Qancha maxsulot keldi</label>
                    <div class="row">
                      <input
                        type="tel"
                        v-model="product_quantity"
                        class="addInput col-8"
                        placeholder="maxsulotni qancha"
                        required
                      />
                      <select
                        v-model="product_selected"
                        class="addInput col-4"
                        required
                      >
                        <option disabled value="">Maxsulot turi</option>
                        <option
                          v-for="option in optionValue"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="table_list">
          <table>
            <tr class="products_name">
              <th>Maxsulot</th>
              <th>Hajmi</th>
            </tr>
            <tr v-for="product in products" :key="product.id">
              <th>
                <p class="product_title">{{ product.product }}</p>
                <p class="pt-1 product_data">{{ product.data }}</p>
              </th>
              <th class="product_price">
                <span>{{ product.quantity }}</span>
                <span> &nbsp;{{ product.selected }}</span>
              </th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebaseinit.js";
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      optionValue: [
        { text: "T - Tona", value: "T" },
        { text: "Kg - Kilogram", value: "Kg" },
        { text: "L - Liter", value: "L" },
        { text: "Dona", value: "Dona" },
      ],
      product_name: "",
      product_quantity: "",
      product_time: new Date().toLocaleDateString(),
      product_selected: "",
    };
  },
  async created() {
    this.isLoading = true;
    db.collection("storage")
      .orderBy("data")
      .onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          const data = {
            product: doc.data().product,
            quantity: doc.data().quantity,
            data: doc.data().data,
            selected: doc.data().selected,
          };
          this.products.push(data);
        });
        this.isLoading = false;
      });
  },
  methods: {
    addProduct() {
      db.collection("storage")
        .add({
          product: this.product_name,
          quantity: this.product_quantity,
          data: this.product_time,
          selected: this.product_selected,
        })
        .catch((error) => console.log(error));
      this.product_name = "";
      this.product_quantity = "";
      this.product_selected = "";
    },
  },
};
</script>

<style scoped>
.loader {
  margin: 30px 0 0 0;
  width: 100%;
}
li {
  list-style: none;
}
.table_list {
  padding: 30px 0;
}
table {
  border-collapse: collapse;
  width: 100%;
}
table,
th,
td {
  border: 1px solid black;
  font-weight: 400;
}
th,
td {
  padding: 7px;
  cursor: pointer;
}
.products_name > th {
  background-color: #4eb7a1;
  color: #ffffff;
  padding: 15px 8px;
  font-size: 22px;
  cursor: default;
}
tr:nth-of-type(odd) {
  background-color: #f3f3f3;
}
tr:hover {
  background-color: rgb(231, 229, 229);
}
.product_title::first-letter {
  text-transform: uppercase;
}
.product_data {
  font-size: 14px;
}
.product_price {
  font-size: 16px;
}
.addProduct {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 0;
  outline: 0;
  font-size: 30px;
  background-color: #4eb7a1;
}
.form {
  padding: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.form label {
  font-size: 19px;
  padding: 10px 0 13px 0 !important;
}
.form .addInput {
  background: #f7f8fa;
  padding: 11px 7px !important;
  border: 1px solid #d1d6d9;
  outline: none;
  border-radius: 10px;
}
.modal-footer {
  margin: 10px 0 0 0;
}
</style>