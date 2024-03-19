// ----------------------------------------------------------------------

export function getPosition(arrow: string) {
  let props;

  switch (arrow) {
    case "top-left":
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        placement: "top-start",
      };
      break;
    case "top-center":
      props = {
        style: {},
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "center" },
        placement: "top",
      };
      break;
    case "top-right":
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        placement: "top-end",
      };
      break;
    case "bottom-left":
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        placement: "bottom-start",
      };
      break;
    case "bottom-center":
      props = {
        style: {},
        anchorOrigin: { vertical: "top", horizontal: "center" },
        transformOrigin: { vertical: "bottom", horizontal: "center" },
        placement: "bottom",
      };
      break;
    case "bottom-right":
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: "top", horizontal: "right" },
        transformOrigin: { vertical: "bottom", horizontal: "right" },
        placement: "bottom-end",
      };
      break;
    case "left-top":
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: "top", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "left" },
        placement: "left-start",
      };
      break;
    case "left-center":
      props = {
        anchorOrigin: { vertical: "center", horizontal: "right" },
        transformOrigin: { vertical: "center", horizontal: "left" },
        placement: "left",
      };
      break;
    case "left-bottom":
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "bottom", horizontal: "left" },
        placement: "left-end",
      };
      break;
    case "right-top":
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        placement: "right-start",
      };
      break;
    case "right-center":
      props = {
        anchorOrigin: { vertical: "center", horizontal: "left" },
        transformOrigin: { vertical: "center", horizontal: "right" },
        placement: "right",
      };
      break;
    case "right-bottom":
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        transformOrigin: { vertical: "bottom", horizontal: "right" },
        placement: "right-end",
      };
      break;

    // top-right
    default:
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        placement: "top-end",
      };
  }

  return props;
}
