"use client";

import { m } from "framer-motion";

import { Avatar, MenuItem, IconButton, Stack, Typography } from "@mui/material";
import { useUser } from "@clerk/nextjs";

import uuidv4 from "@/utils/uuidv4";
import Iconify from "@/components/iconify";
import { varHover } from "@/components/animate";
import { useLocalStorage } from "@/hooks/use-local-storage";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { useResponsive } from "@/hooks/use-responsive";
import { useLocales } from "@/locales";
import { paths } from "@/router/path";
import { useRouter } from "@/router/hooks";

let id = uuidv4();
const defaultUser = {
  id: "customer_" + id,
  fullName: "customer_" + id,
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZE9zQ0h2N3FwWHlpNEZicFVRRFlsZG5ab3giLCJyaWQiOiJ1c2VyXzJkVkRwY080bk16ZzhhSnJDN3FwV29pRjNYdyIsImluaXRpYWxzIjoiRFYifQ",
  customer: true,
};

function NavbarUser() {
  const { user } = useUser();
  const { t } = useLocales();
  const router = useRouter();

  const { state, update, reset } = useLocalStorage("customerId", defaultUser);
  const popover = usePopover();
  const mdDown = useResponsive("down", "md");

  const userData = user ?? state;
  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };
  const OPTIONS = [
    {
      label: t("login"),
      path: paths.login,
      customer: true,
    },
  ];
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mx: 2 }}
    >
      {!mdDown && (
        <>
          <Avatar src={userData.imageUrl} alt={userData.fullName} />
          <Typography flexGrow={1} variant="subtitle2" noWrap>
            {userData.fullName}
          </Typography>
        </>
      )}

      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={popover.open ? "inherit" : "default"}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
          }),
        }}
      >
        {mdDown ? (
          <Avatar src={userData.imageUrl} alt={userData.fullName} />
        ) : (
          <Iconify icon="majesticons:more-menu-vertical" width={24} />
        )}
      </IconButton>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        container={popover.open}
        hiddenArrow
      >
        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.path)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </CustomPopover>
    </Stack>
  );
}

export default NavbarUser;
