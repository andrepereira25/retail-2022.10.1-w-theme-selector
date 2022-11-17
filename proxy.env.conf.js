module.exports = [
  {
    context: '/api',
    target: 'https://app.prd.sdbx.live.backbaseservices.com/',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = '<change_this_placeholder_to_required_prdl_header>';
    },
  },
  {
    context: '/auth',
    target: 'https://app.prd.sdbx.live.backbaseservices.com/',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = '<change_this_placeholder_to_required_prdl_header>';
    },
  },
];
