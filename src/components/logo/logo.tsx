import { Link, Stack, StackProps } from "@mui/material";
import Image from "../image";
import { forwardRef } from "react";
import { RouterLink } from "@/router/components";

export interface LogoProps extends StackProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    let logo = (
      <Stack
        direction="row"
        alignItems="center"
        ref={ref}
        sx={{
          width: 40,
          height: 40,
          ...sx,
        }}
        {...other}
      >
        <Image src="./logo.png" alt="logo" />
      </Stack>
    );
    if (disabledLink) {
      return logo;
    }
    return (
      <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  },
);

export default Logo;
