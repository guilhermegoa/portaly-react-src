import React, { Component, Fragment } from "react";
import mapBox from "../../services/mapBoxAndReact/MapBoxApi";
import { connect } from "react-redux";

import { salvaFrete } from "../../redux/actions/freteActions";

import TextField from "@material-ui/core/TextField";

import MostraProdutosCarrinho from "./MostraProdutosCarrinhoResumido";
import SemProduto from "../semProdutos";

// import ApiProdutos from "../../util/ApiProdutos.js";

// import Carrinho from "../../util/Carrinho.js";

// const varCadastro = "dadosCadastro";
// const varFrete = "dadosFrete";

class Pagamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tax: null,
      place: null,
      buyer: null,
      coupon: "",
    };
    // let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    // let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));
  }

  handleChange = async (e) => {
    const newVal = await e.target.value;
    this.setState({ coupon: newVal });
  };

  async componentDidMount() {
    const varFrete = "dadosFrete";
    const varCadastro = "dadosCadastro";
    const data = JSON.parse(sessionStorage.getItem(varFrete));
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let shipTo =
      data.address_2 +
      " " +
      data.postcode +
      " " +
      data.city +
      " " +
      data.state +
      " " +
      data.country;
    shipTo = shipTo.split(" ").join("%20");

    let value;
    let place;

    await mapBox.getTax(shipTo).then((tax) => {
      value = tax;
      this.props.salvaFrete(value);
    });

    await mapBox.getPlace(shipTo).then((place_name) => {
      place = place_name;
    });

    this.setState({ tax: value });
    this.setState({ place: place });
    this.setState({
      buyer: dadosCadastro.first_name + " " + dadosCadastro.last_name,
    });
  }

  render() {
    return (
      <div className="Entrega">
        Entrega para:{" "}
        <span>
          {" "}
          {this.state.buyer
            ? this.state.buyer
            : "Sem comprador identificado"}{" "}
        </span>{" "}
        <br></br>
        <Fragment>
          {this.props.carrinho ? (
            MostraProdutosCarrinho(this.props.carrinho)
          ) : (
            <SemProduto />
          )}
          <TextField
            id="coupon"
            onChange={this.handleChange}
            label="Cupom"
            variant="outlined"
          />
        </Fragment>
        <br></br>
        <span>
          {" "}
          {this.state.place ? this.state.place : "Sem local de entrega"}
        </span>{" "}
        <br></br>
        <span>
          {" "}
          Valor de Frete: R${this.state.tax ? this.state.tax : "Buscando Frete"}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  frete: state.frete,
  carrinho: state.carrinho,
});
const mapDispatchToProps = { salvaFrete };

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
