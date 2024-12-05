import { Meta, StoryObj } from "@storybook/react";

import { Scene } from "./index.tsx";
import { Actor } from "../Actor";
import { ActorDirections } from "../Actor/types.ts";

const meta: Meta<typeof Scene> = {
  title: "Scene",
  component: Scene,
  parameters: {
    layout: "fullscreen",
  },
};

export const SceneLayout: StoryObj<typeof Scene> = {
  name: "Using full screen",
  render: () => {
    return (
      <Scene style={{ width: "100vw", height: "100vh", background: "#B2DFDB" }}>
        <Actor
          actorId="8e426565-a6a3-4672-9c2d-1de8544aa2a9"
          style={{ width: 120 }}
          initialPosition={{ x: 100, y: 100 }}
          initialSize={{ width: 120 }}
          directions={ActorDirections.HORIZONTAL}
        >
          <div>hello world!</div>
        </Actor>
        <Actor
          actorId="f1810cdf-cafd-452e-9d6e-379dc6c09019"
          style={{ width: 200 }}
          initialPosition={{ x: 150, y: 300 }}
          initialSize={{ width: 200 }}
          directions={ActorDirections.HORIZONTAL}
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
            aperiam ea eligendi eveniet in omnis quo sed soluta voluptas?
            Aliquam eos esse, exercitationem facilis fuga hic obcaecati officiis
            reiciendis.
          </div>
        </Actor>
        <Actor actorId="id3" initialPosition={{ x: 400, y: 200 }}>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG80ZW42em80MmI5M3czczV3Y2gzYXFkaXgyam42czJrdXp4ZWZoMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZGBQhaRTHyWtRVn1Xx/giphy.webp"
            alt=""
            style={{ width: 500, height: 415 }}
          />
        </Actor>
      </Scene>
    );
  },
};

export const CustomScene: StoryObj<typeof Scene> = {
  name: "With custom scene renderer",
  render: () => {
    return (
      <Scene style={{ width: "100vw", height: "100vh", background: "#C5E1A5" }}>
        hello world!
      </Scene>
    );
  },
};

export const BlockScene: StoryObj<typeof Scene> = {
  name: "Inside block",
  render: () => {
    return (
      <div style={{ width: 660, height: 450, margin: 100 }}>
        <Scene style={{ width: "100%", height: "100%", background: "#EF9A9A" }}>
          hello world!
        </Scene>
      </div>
    );
  },
};

export default meta;
