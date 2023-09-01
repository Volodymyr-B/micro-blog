import Link from "next/link";
import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Navbar = () => {
  return (
    <div className=" p-1 flex justify-between items-center">
      <div className="p-2 flex items-center gap-2">
        <TwitterIcon />
        <h1>Micro Blog</h1>
      </div>
      <div className="flex gap-2">
        <Link href={`/`}>
          <Button variant="contained" size="large">
            home
          </Button>
        </Link>
        <Link href={`/auth`}>
          <Button variant="contained" size="large">
            auth
          </Button>
        </Link>
      </div>
    </div>
  );
};
