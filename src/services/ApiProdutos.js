import api from "./api";

const ApiWooCommerceProdutos = {
  getAllPublishedProductsLentgh: async () =>
    (await ApiWooCommerceProdutos.getAllPublishedProducts()).data.length,

  getAllPublishedProducts: async () => {
    let per_page = 100;
    let prods = [];
    let qnt;
    let atual;
    let page = 1;

    do {
      atual = (
        await api.get("products", {
          status: "publish",
          per_page,
          page,
        })
      ).data;
      qnt = atual.length;
      prods = prods.concat(atual);
      page++;
    } while (qnt >= per_page);

    return { data: prods };
  },

  getAllPublishPoductsByCategoriesIdLentgh: async (id) =>
    (await ApiWooCommerceProdutos.getAllPublishPoductsByCategoriesId(id)).data
      .length,

  getAllPublishPoductsByCategoriesId: async (id) => {
    let per_page = 100;
    let prods = [];
    let qnt;
    let atual;
    let page = 1;

    do {
      atual = (
        await api.get("products", {
          category: id,
          status: "publish",
          per_page,
          page,
        })
      ).data;
      qnt = atual.length;
      prods = prods.concat(atual);
      page++;
    } while (qnt >= per_page);

    return { data: prods };
  },

  getOnSale: () => api.get("products", { on_sale: true }),

  getProductBySlug: (slug) => api.get("products", { slug, status: "publish" }),

  getProductByid: (id) => api.get(`products/${id}`),

  createKit: async (dados) => {
    let ids = [];
    let prices = [];
    let produtos = [];
    let total = 0;

    for (const key in dados) {
      if (dados.hasOwnProperty(key)) {
        const produtoAtual = (
          await ApiWooCommerceProdutos.getProductByid(dados[key].id)
        ).data;
        produtos.push(produtoAtual);
        ids.push(produtoAtual.id);
        prices.push(produtoAtual.price);
      }
    }

    for (const price of prices) {
      total += parseFloat(price);
    }

    const data = {
      name: "Porta montada",
      type: "grouped",
      status: "private",
      catalog_visibility: "visible",
      description: "Porta montada pelo site",
      short_description: "Porta montada pelo site",
      images: [
        {
          id: 284,
        },
      ],
      price: total.toString(),
      grouped_products: ids,
    };

    return { kit: (await api.post("products", data)).data, produtos: produtos };
  },

  getAllOnSaleProducts: async () => {
    let per_page = 100;
    let prods = [];
    let qnt;
    let atual;
    let page = 1;

    do {
      atual = (
        await api.get("products", {
          status: "publish",
          per_page,
          page,
          on_sale: true,
        })
      ).data;
      qnt = atual.length;
      prods = prods.concat(atual);
      page++;
    } while (qnt >= per_page);

    return { data: prods };
  },
};

export default ApiWooCommerceProdutos;
