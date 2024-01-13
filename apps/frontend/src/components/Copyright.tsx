import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: { [key: string]: object }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://alpha2phi.com/">
        alpha2phi
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
