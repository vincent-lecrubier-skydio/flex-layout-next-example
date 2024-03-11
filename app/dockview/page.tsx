"use client";
import { useRef, useCallback, MouseEvent } from 'react';
import { DockviewApi, DockviewGroupPanelApi, IDockviewDefaultTabProps, DockviewDefaultTab, DockviewPanelApi, DockviewReact, DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps, Orientation, SerializedDockview } from 'dockview';
import { Camera } from 'lucide-react';

import 'dockview/dist/styles/dockview.css';
import './style.css';

const components = {
  component_1: (props: IDockviewPanelProps) => {
    const api: DockviewPanelApi = props.api;
    const containerApi: DockviewApi = props.containerApi;

    return <div>Hello</div>
  },
  component_2: (props: IDockviewPanelProps) => {
    return <div>Oi</div>
  },
  default: ({ params }: IDockviewPanelProps) => {
    return <div className='p-2'>Ok {JSON.stringify(params)}</div>
  },
}

export const CloseButton = () => (
  <svg
    height="11"
    width="11"
    viewBox="0 0 28 28"
    aria-hidden={'false'}
    focusable={false}
    className="dockview-svg"
  >
    <path d="M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"></path>
  </svg>
);

const tabComponents = {
  tab_1: (props: IDockviewPanelHeaderProps) => {
    const api: DockviewPanelApi = props.api;
    const containerApi: DockviewApi = props.containerApi;
    return <div>Camera</div>;
  },
  icon_tab: ({
    api,
    containerApi: _containerApi,
    params: params,
    hideClose,
    closeActionOverride,
    ...rest
  }: IDockviewDefaultTabProps) => {
    const onClose = useCallback(
      (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();

        if (closeActionOverride) {
          closeActionOverride();
        } else {
          api.close();
        }
      },
      [api, closeActionOverride]
    );

    const onMouseDown = useCallback((e: MouseEvent) => {
      e.preventDefault();
    }, []);

    const onClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (event.defaultPrevented) {
          return;
        }

        api.setActive();

        if (rest.onClick) {
          rest.onClick(event);
        }
      },
      [api, rest.onClick]
    );

    return (
      <div
        {...rest}
        onClick={onClick}
        className="flex items-center h-full px-2 py-0 mr-0 space-x-1 flex-grow"
      >
        <Camera size={16} />
        <span className="dockview-react-tab-title">{api.title}</span>
        {hideClose || params?.hideClose ? null : (
          <div
            className="dv-react-tab-close-btn"
            onMouseDown={onMouseDown}
            onClick={onClose}
          >
            <CloseButton />
          </div>
        )}
      </div>
    );
  },
  tab_2: (props: IDockviewPanelHeaderProps) => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      alert('context menu');
    };
    return <DockviewDefaultTab onContextMenu={onContextMenu}
      // hideClose={true}
      {...props} />;
  }
};

const layout: SerializedDockview = {
  "grid": {
    "root": {
      "type": "branch",
      "data": [
        {
          "type": "branch",
          "data": [
            {
              "type": "leaf",
              "data": {
                "views": [
                  "panel_1",
                  "panel_2",
                  "panel_3"
                ],
                "activeView": "panel_1",
                "id": "22"
              },
              "size": 300
            },
            {
              "type": "branch",
              "data": [
                {
                  "type": "leaf",
                  "data": {
                    "views": [
                      "panel_4",
                      "panel_5"
                    ],
                    "activeView": "panel_5",
                    "id": "23"
                  },
                  "size": 294
                },
                {
                  "type": "leaf",
                  "data": {
                    "views": [
                      "panel_7"
                    ],
                    "activeView": "panel_7",
                    "id": "25"
                  },
                  "size": 147
                },
                {
                  "type": "leaf",
                  "data": {
                    "views": [
                      "panel8"
                    ],
                    "activeView": "panel8",
                    "id": "26"
                  },
                  "size": 147.65625
                }
              ],
              "size": 736.8125
            }
          ],
          "size": 588.65625
        }
      ],
      "size": 1472.8125
    },
    "width": 1472.8125,
    "height": 588.65625,
    "orientation": "VERTICAL" as Orientation
  },
  "panels": {
    "panel_1": {
      "id": "panel_1",
      "contentComponent": "default",
      "tabComponent": "icon_tab",
      "title": "",
      "renderer": "always",
      params: {
        "hideClose": true,
        "coco": "cucu"
      }
    },
    "panel_2": {
      "id": "panel_2",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 2"
    },
    "panel_3": {
      "id": "panel_3",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 3"
    },
    "panel_4": {
      "id": "panel_4",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 4"
    },
    "panel_5": {
      "id": "panel_5",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 5"
    },
    "panel_6": {
      "id": "panel_6",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 6"
    },
    "panel_7": {
      "id": "panel_7",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 7"
    },
    "panel8": {
      "id": "panel8",
      "contentComponent": "default",
      "tabComponent": "tab_2",
      "title": "Panel 8"
    }
  },
  "activeGroup": "22",
  "floatingGroups": [
    {
      "data": {
        "views": [
          "panel_6"
        ],
        "activeView": "panel_6",
        "id": "24"
      },
      "position": {
        "top": 400,
        "left": 400,
        "width": 300,
        "height": 300
      }
    }
  ],
  "popoutGroups": [
    // {
    //   "data": {
    //     "views": [],
    //     "id": "6"
    //   },
    //   "gridReferenceGroup": "2",
    //   "position": null
    // },
    // {
    //   "data": {
    //     "views": [],
    //     "id": "27"
    //   },
    //   "gridReferenceGroup": "25",
    //   "position": null
    // }
  ]
};

export default function Caplin() {

  const apiRef = useRef<DockviewApi>();

  function onReady(event: DockviewReadyEvent) {
    const api: DockviewApi = event.api;
    apiRef.current = api;
    api.fromJSON(layout);
  }


  return (
    <DockviewReact
      onReady={onReady}
      components={components}
      tabComponents={tabComponents}
      // // See https://github.com/mathuo/dockview/issues/547
      // singleTabMode="fullwidth"
      // rightHeaderActionsComponent={() => <div className='pointer-events-none'>Right Header</div>}
      className='dockview-theme-skydio w-screen h-screen absolute bg-gray-200' />
  );
}
