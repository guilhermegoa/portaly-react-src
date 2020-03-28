import React, { Component } from "react";
import ApiWooCommerce from "../services/api";
import Loading from "../components/Loading.js";
import MostrarProdutos from "../components/MostraProdutos";

import "../css/HomePage.css";

class HomePage extends Component {

   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
         teste:[],
      }
   }

   componentDidMount() {
      ApiWooCommerce.get("products", { per_page: 20 })
         .then(res => {
            this.setState({ produtos: [...this.state.produtos, ...res.data] });
         });

   }



   render() {
      return (
         <section id="homepage">
            {this.state.produtos.length > 0 ?  <MostrarProdutos pros={this.state}/> : <Loading />}
         </section>
      );
   }
}


export default HomePage;

/* <section id="destaques">
          {this.state.produtos.map(produto => {
            return produto.on_sale ? (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            ) : (
              <div></div>
            );
          })}
        </section> */