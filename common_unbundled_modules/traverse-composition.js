const traverseComposition = (c, keys = [], a = []) => {
  const _a = [...a];

  if (!c.type) {
    return _a;
  }

  if (keys.length === 1) {
    const v = c.type[keys[0]];
    if (v) {
      _a.push(v);
    }
  } else if (keys.length > 1) {
    const object = {};
    for (const key of keys) {
      const v = c.type[key];
      if (v) {
        object[key] = c.type[key];
      }
    }

    if (Object.keys(object).length) {
      _a.push(object);
    }
  }

  if (c.props && c.props.children && c.props.children.length) {
    const r = c.props.children.reduce((__a, _c) => {
      return [...traverseComposition(_c, keys, __a)];
    }, []);

    _a.push(...r);
  } else if (c.props && c.props.children) {
    const t = traverseComposition(c.props.children, keys);

    _a.push(...t);
  }

  return _a;
};

module.exports = traverseComposition;
