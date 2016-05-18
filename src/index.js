import pluginHelper from './helper';

export default ({types: t}) => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const givenPath = path.node.source.value;
        const rootPathSuffix = state && state.opts && typeof state.opts.rootPathSuffix === 'string' ? state.opts.rootPathSuffix : '';
        const rootPathPrefix = state && state.opts && typeof state.opts.rootPathPrefix === 'string' ? state.opts.rootPathPrefix : '~';
        if (pluginHelper.startsWith(givenPath, rootPathPrefix + '/')) {
          path.node.source.value = pluginHelper.transformRelativeToRootPath(givenPath, state.file.opts.filename, rootPathSuffix);
        }
      }
    }
  };
};
