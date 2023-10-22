"use strict";

/**
 * payment-callback controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::payment-callback.payment-callback",
  ({ strapi }) => ({
    async create(ctx) {
      // @ts-ignore
      const requestData = ctx.request.body;
      // const order = await strapi
      //   .service("api::order.order")
      //   .findOne(parseInt(requestData.external_id));

      const inputData = {
        data: {
          history: requestData,
        },
      };

      await strapi
        .service("api::payment-callback.payment-callback")
        .create(inputData);

      let params = {};

      if (requestData.status === "PAID") {
        params = { data: { status: "packaging" } };
      } else {
        params = { data: { status: "cancel" } };
      }

      const updateOrderStatus = await strapi
        .service("api::order.order")
        .update(parseInt(requestData.external_id), params);
      return updateOrderStatus;
    },
  })
);
