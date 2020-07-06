import React from "react";
import CalciteThemeProvider from "calcite-react/CalciteThemeProvider";

const ThemeDecorator = (storyFn) => (
  <CalciteThemeProvider>{storyFn()}</CalciteThemeProvider>
);

export default ThemeDecorator;
