"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const result = await super.create(ctx);

    const { default: axios } = require("axios");
    const { xenditHeaders } = require("../helpers/header");

    const payload = {
      external_id: result.data.id.toString(),
      payer_email: result.data.payer_email || "erudev@test.com",
      description:
        result.data.description || "Payment catch by strapi controller",
      amount: result.data.attributes.totalPrice,
    };

    const response = await axios({
      method: "POST",
      url: "https://api.xendit.co/v2/invoices",
      headers: xenditHeaders,
      data: JSON.stringify(payload),
    });

    return JSON.stringify(response.data);
  },
}));
