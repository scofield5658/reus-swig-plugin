module.exports = function(assetJagger) {
  const asset = {
    ...assetJagger,
    html: {
      rels: (filepath) => {
        return assetJagger.html.rels(filepath, [
          '{%\\s*extends\\s*[\'"](\\S+)[\'"]\\s*%}',
          '{%\\s*include\\s*[\'"](\\S+)[\'"]\\s*%}'
        ]);
      },
      link: (filepath) => {
        return assetJagger.html.link(filepath, [
          {
            match: '<(\\w+)[^>]+src[^>]+>',
            from: 'src=[\'"]?([^\'"]+)[\'"]?',
            to: 'src="$TO"'
          },
          {
            match: '<(link)[^>]+href[^>]+>',
            from: 'href=[\'"]?([^\'"]+)[\'"]?',
            to: 'href="$TO"'
          },
          {
            match: '<(\\w+)[^>]+url[^>]+>',
            from: 'url\\([\'"]?([^\'")]+)[\'"]?\\)',
            to: 'url($TO)'
          }
        ]);
      }
    }
  }

  return asset;
}
