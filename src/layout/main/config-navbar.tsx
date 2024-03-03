import Image from "@/components/image";
import { paths } from "@/router/path";
import { useMemo } from "react";

const icon = (name: string) => (
  <Image
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

function useNavbar() {
  const data = useMemo(
    () => [
      { title: "home", icon: icon("ic_home"), path: paths.home.root },
      { title: "game", icon: icon("ic_chat"), path: paths.game.root },
      { title: "message", icon: icon("ic_chat"), path: paths.message.root },
      { title: "video", icon: icon("ic_chat"), path: paths.video.root },
      { title: "music", icon: icon("ic_chat"), path: paths.music.root },
      { title: "todo", icon: icon("ic_chat"), path: paths.todo.root },
      { title: "setting", icon: icon("ic_setting"), onClick: () => {} },
    ],
    [],
  );
  return data;
}

export default useNavbar;
