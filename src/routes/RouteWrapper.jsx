import React, { useMemo } from "react";

import DocumentTitle from "react-document-title";
import queryString from "query-string";

const RouteWrapper = (props) => {

  let { Comp, route, ...restProps } = props;

  console.log('路由参数', props)

  /** useMemo 缓存query，避免每次生成生的query */
  const queryMemo = useMemo(() => {
    const queryReg = /\?\S*/g;
    const matchQuery = (reg) => {
      const queryParams = restProps.location.search.match(reg);
      return queryParams ? queryParams[0] : "{}";
    };
    return queryString.parse(matchQuery(queryReg));
  }, [restProps.location.search]);

  const mergeQueryToProps = () => {
    const queryReg = /\?\S*/g;
    const removeQueryInRouter = (restProps, reg) => {
      const { params } = restProps.match;
      Object.keys(params).forEach((key) => {
        params[key] = params[key] && params[key].replace(reg, "");
      });
      restProps.match.params = { ...params };
    };

    restProps = removeQueryInRouter(restProps, queryReg);
    const merge = {
      ...restProps,
      query: queryMemo,
    };
    return merge;
  };

  return (
    <DocumentTitle title={route.title}>
      <Comp {...mergeQueryToProps()} />
    </DocumentTitle>
  );
};

export default RouteWrapper;
