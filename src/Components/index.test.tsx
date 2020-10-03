import React from "react";
import { render } from "@testing-library/react";
import { Component } from "components";

describe("test", () => {
  test("test", () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
