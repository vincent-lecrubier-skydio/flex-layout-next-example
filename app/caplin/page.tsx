"use client";

import { IJsonModel, Layout, Model, TabNode } from 'flexlayout-react';

// import 'flexlayout-react/style/light.css';
// import 'flexlayout-react/style/underline.css';
import './style.css';


const json: IJsonModel = {
  global: {
    splitterSize: 2,
    splitterExtra: 12,
    tabDragSpeed: 0.1,
  },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "One",
            component: "button",
          },
          {
            type: "tab",
            name: "Three",
            component: "button",
          }
        ]
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Two",
            component: "button",
          }
        ]
      }
    ]
  }
};

const model = Model.fromJson(json);

const factory = (node: TabNode) => {
  var component = node.getComponent();

  if (component === "button") {
    return <button>{node.getName()}</button>;
  }
}

export default function Caplin() {
  return (
    <Layout
      font={{ size: "small" }}
      model={model}
      factory={factory} />

  );
}
