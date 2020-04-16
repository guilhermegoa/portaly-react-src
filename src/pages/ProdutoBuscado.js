
import React, { Component, Fragment } from 'react';
import ApiWooCommerce from '../util/ApiWooCommerce';
import LineLoading from '../components/loading/LineLoading';
import MostrarProdutos from '../components/MostraProdutos';
import SemProdutos from '../components/semProdutos';

class ProdutosBuscado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: null,
    };
  }

  componentDidMount() {
    const { value } = this.props.match.params;

    ApiWooCommerce.getAllPublishedProducts().then((res) => {
      const produtos = res.data.filter((produto) => produto.name.toString().toUpperCase().includes(value.toUpperCase()));

      this.setState({
        produtos: [...produtos],
      });
    });
  }

  render() {
    return (
         <Fragment>
            {this.state.produtos !== null || undefined ? (
              this.state.produtos.length > 0 ? (
                <MostrarProdutos produtos={this.state.produtos}/>
              ) : (
                  <SemProdutos />
              )
            ) : (
               <LineLoading />
            )}
         </Fragment>
    );
  }
}

export default ProdutosBuscado;
