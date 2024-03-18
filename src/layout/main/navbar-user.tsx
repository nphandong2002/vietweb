import { Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";

function NavbarUser() {
  const { user } = useUser();
  const { state, update, reset } = useLocalStorage("customerId", null);
  useEffect(() => {}, [user, state]);
  return <Box></Box>;
}

export default NavbarUser;
