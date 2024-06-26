const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
  "/api": {
    target: "http://192.168.43.181:4001/",
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
      "/subject/:subject_slug", (req, res) => {
        return app.render(req, res, "/subject_discussion", {
          subject_slug: req.params.subject_slug
        });
      }
    );

    server.get(
      "/:subject_slug/:chapter_slug/:content_type?", (req, res) => {
        return app.render(req, res, "/content", {
          subject_slug: req.params.subject_slug,
          chapter_slug: req.params.chapter_slug,
          content_type: req.params.content_type,
        });
      }
    );

    server.get(
      "/:subject_slug/:chapter_slug/discussion/:content_slug", (req, res) => {
        return app.render(req, res, "/discussion", {
          subject_slug: req.params.subject_slug,
          chapter_slug: req.params.chapter_slug,
          content_slug: req.params.content_slug,
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
