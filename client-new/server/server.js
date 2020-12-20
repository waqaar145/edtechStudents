const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
  "/api": {
    target: "http://localhost:4001/",
    changeOrigin: true,
  },
};

app
  .prepare()
  .then(() => {
    const server = express();

    // setting up proxy
    if (dev && devProxy) {
      const { createProxyMiddleware } = require("http-proxy-middleware");
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // ******************** PAGES ROUTES START
    server.get("/", (req, res) => {
      return app.render(req, res, "/index", req.query);
    });

    server.get("/login", (req, res) => {
      return app.render(req, res, "/login", req.query);
    });

    server.get("/signup", (req, res) => {
      return app.render(req, res, "/signup", req.query);
    });

    server.get("/engineering", (req, res) => {
      return app.render(req, res, "/engineering", req.query);
    });

    server.get("/blogs", (req, res) => {
      return app.render(req, res, "/blogs", req.query);
    });

    server.get(
      "/subject/:subject_slug/chapter/:chapter_slug/:content_type?", (req, res) => {
        return app.render(req, res, "/subject", {
          subject_slug: req.params.subject_slug,
          chapter_slug: req.params.chapter_slug,
          content_type: req.params.content_type,
        });
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
